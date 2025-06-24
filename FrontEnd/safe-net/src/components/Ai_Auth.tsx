// components/AIAuth.tsx
import { Loader2 } from "lucide-react"; // For loading spinner
import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
// import "../style.css"; // Assuming style.css is correctly linked in your project

interface AIAuthProps {
  onLoginSuccess: (token: string, backendUrlUsed: string) => void;
  onBackendConnected: (isConnected: boolean, backendUrlUsed: string) => void;
}

const DEFAULT_BACKEND_URLS = ["http://127.0.0.1:5000"];

export const AIAuth: React.FC<AIAuthProps> = ({
  onLoginSuccess,
  onBackendConnected,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [backendUrlInput, setBackendUrlInput] = useState<string>(DEFAULT_BACKEND_URLS[0]);
  const [currentBackendUrl, setCurrentBackendUrl] = useState<string>("");
  const [isCheckingConnection, setIsCheckingConnection] =useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showRegister, setShowRegister] = useState<boolean>(false);

  // Memoized version of checkConnection
  const checkConnection = useCallback(async (
    urlToCheck?: string,
    showMessages: boolean = true
  ) => {
    setIsCheckingConnection(true);
    if (showMessages) {
      setError(null);
      setStatusMessage("Checking connection...");
    }

    const effectiveUrlToCheck = (urlToCheck || backendUrlInput || DEFAULT_BACKEND_URLS[0]).trim();

    const urlsToAttempt = [
      effectiveUrlToCheck,
      ...DEFAULT_BACKEND_URLS.filter((u) => u !== effectiveUrlToCheck)
    ];

    let connectedUrlAttempt: string | null = null;

    for (const attemptUrl of new Set(urlsToAttempt)) { // Use Set to avoid duplicate attempts
      if (!attemptUrl) continue;
      if (showMessages) setStatusMessage(`Trying ${attemptUrl}...`);
      try {
        // MODIFIED: Endpoint to /api/status
        const response = await fetch(`${attemptUrl}/api/status`, {
          method: "GET",
          headers: { Accept: "application/json" },
          mode: "cors",
          cache: "no-cache",
        });
        if (response.ok) {
          const data = await response.json();
          // MODIFIED: Check FastAPI's status response
          if (data.status === "online" && data.model_path) {
            connectedUrlAttempt = attemptUrl;
            break; // Found a working URL
          }
        }
      } catch (err) {
        // Continue to next URL if this one fails
        if (showMessages) console.warn(`Connection attempt to ${attemptUrl} failed:`, err);
      }
    }

    if (connectedUrlAttempt) {
      setIsConnected(true);
      setCurrentBackendUrl(connectedUrlAttempt);
      setBackendUrlInput(connectedUrlAttempt); // Update input field to reflect working URL
      onBackendConnected(true, connectedUrlAttempt);
      if (showMessages)
        setStatusMessage(`Connected to backend at ${connectedUrlAttempt}! Model: ${ (await (await fetch(`${connectedUrlAttempt}/api/status`)).json()).model_path }`);
      chrome.storage.local.set({ aiBackendUrl: connectedUrlAttempt });
    } else {
      setIsConnected(false);
      // Don't clear currentBackendUrl if a connection was previously established and then lost
      // setCurrentBackendUrl("");
      onBackendConnected(false, effectiveUrlToCheck); // Report failure with the URL attempted
      if (showMessages) {
        setError(
          "Connection failed. Ensure backend is running, URL is correct (e.g. http://127.0.0.1:5000), and accessible."
        );
        setStatusMessage("");
      }
    }
    setIsCheckingConnection(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendUrlInput, onBackendConnected]); // Add backendUrlInput and onBackendConnected

  useEffect(() => {
    chrome.storage.local.get(["aiBackendUrl", "userEmail"], (result) => {
      const savedUrl = result.aiBackendUrl;
      setBackendUrlInput(savedUrl || DEFAULT_BACKEND_URLS[0]);
      // Use the 'checkConnection' directly as it's now stable due to useCallback
      checkConnection(savedUrl || DEFAULT_BACKEND_URLS[0], false);

      if (result.userEmail) {
        setEmail(result.userEmail);
      }
    });
  }, [checkConnection]); // Add checkConnection as a dependency

  const handleAuthAction = async (
    action: "login" | "register",
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoadingState(true);
    setError(null);
    setStatusMessage("");

    if (!currentBackendUrl) {
      setError("Not connected to backend. Please check connection first.");
      setLoadingState(false);
      return;
    }

    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // MODIFIED: Endpoint to /auth/login or /auth/register
      const response = await fetch(`${currentBackendUrl.trim()}/auth/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
        cache: "no-cache",
      });

      const responseBody = await response.json().catch(() => ({})); // Catch if response is not JSON

      if (!response.ok) {
        const defaultMessage = `${
          action.charAt(0).toUpperCase() + action.slice(1)
        } failed`;
        // MODIFIED: Prioritize FastAPI's 'detail' field for error messages
        let specificMessage = responseBody.detail || responseBody.error || responseBody.msg;

        // FastAPI specific status codes for these scenarios
        if (action === "register" && response.status === 409) // HTTP_409_CONFLICT
          specificMessage = responseBody.detail || "Email already registered";
        if (action === "login" && response.status === 401) // HTTP_401_UNAUTHORIZED
          specificMessage = responseBody.detail || "Invalid email or password";

        throw new Error(
          specificMessage ||
            `${defaultMessage}: ${response.statusText || response.status}`
        );
      }

      if (action === "login") {
        if (responseBody.access_token) {
          onLoginSuccess(responseBody.access_token, currentBackendUrl);
          chrome.storage.local.set({ userEmail: email });
          setStatusMessage("Login successful!");
          setPassword(""); // Clear password field on success
        } else {
          throw new Error("Invalid login response from server (missing token)");
        }
      } else if (action === "register") {
        // MODIFIED: FastAPI returns UserPublic model on successful registration ({id, email})
        setStatusMessage(`Registration for ${responseBody.email} successful! You can now login.`);
        setShowRegister(false); // Switch back to login form
        setPassword(""); // Clear password field
      }
    } catch (err: any) {
      setError(
        `${action.charAt(0).toUpperCase() + action.slice(1)} failed: ${
          err.message || "Unknown error"
        }`
      );
    } finally {
      setLoadingState(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuthAction("login", setIsLoggingIn);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuthAction("register", setIsRegistering);
  };

  const commonInputClass = "input input-sm"; // Using classes from style.css

  return (
    <div className="flex flex-col gap-3 p-1 text-sm">
      <div className="flex flex-col gap-1">
        <label className="search-input-label" htmlFor="backendUrlInput">
          Backend URL:
        </label>
        <div className="flex gap-1">
          <input
            type="text"
            id="backendUrlInput"
            value={backendUrlInput}
            onChange={(e) => setBackendUrlInput(e.target.value.trim())} // Trim input value
            className={`flex-grow ${commonInputClass}`}
            placeholder="e.g., http://127.0.0.1:5000"
          />
          <button
            // MODIFIED: Call the memoized checkConnection
            onClick={() => checkConnection(backendUrlInput, true)}
            disabled={isCheckingConnection}
            className="btn btn-secondary btn-sm whitespace-nowrap"
          >
            {isCheckingConnection && statusMessage.startsWith("Trying") ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              "Check"
            )}
          </button>
        </div>
        {statusMessage && (
          <div
            className={`text-xs mt-1 p-1.5 rounded ${
              isConnected && statusMessage.includes("Connected")
                ? "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30"
                : isCheckingConnection && statusMessage.startsWith("Trying")
                ? "text-slate-600 dark:text-slate-400" // Neutral color for "Trying..."
                : "text-slate-600 dark:text-slate-400" // Default neutral for other status messages
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>

      {/* Login Form */}
      {(isConnected || (!isConnected && !isCheckingConnection && currentBackendUrl)) &&
        !showRegister && (
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-700"
          >
            <h3 className="font-semibold text-center text-slate-700 dark:text-slate-200 text-sm">
              Login
            </h3>
            <div className="flex flex-col gap-0.5">
              <label className="search-input-label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={commonInputClass}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="search-input-label" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={commonInputClass}
                placeholder="Password"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn || !currentBackendUrl || !isConnected} // Disable if not connected
              className="btn btn-success btn-sm mt-1"
            >
              {isLoggingIn ? (
                <Loader2 size={14} className="animate-spin mr-1.5" />
              ) : null}
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
            <div className="text-center text-xs mt-1">
              <button
                type="button"
                onClick={() => {
                  setShowRegister(true);
                  setError(null);
                  setStatusMessage(""); // Clear status message when switching forms
                  setPassword("");    // Clear password for register form
                }}
                className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Need an account? Register
              </button>
            </div>
          </form>
        )}

      {/* Register Form */}
      {(isConnected || (!isConnected && !isCheckingConnection && currentBackendUrl)) &&
        showRegister && (
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-slate-700"
          >
            <h3 className="font-semibold text-center text-slate-700 dark:text-slate-200 text-sm">
              Register
            </h3>
            <div className="flex flex-col gap-0.5">
              <label className="search-input-label" htmlFor="regEmail">
                Email:
              </label>
              <input
                type="email"
                id="regEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={commonInputClass}
                placeholder="you@example.com"
                required
                autoComplete="email" // Use "email" here too for consistency, or "username" if you treat email as username
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="search-input-label" htmlFor="regPassword">
                Password:
              </label>
              <input
                type="password"
                id="regPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={commonInputClass}
                placeholder="Choose a password"
                required
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              disabled={isRegistering || !currentBackendUrl || !isConnected} // Disable if not connected
              className="btn btn-primary btn-sm mt-1"
            >
              {isRegistering ? (
                <Loader2 size={14} className="animate-spin mr-1.5" />
              ) : null}
              {isRegistering ? "Registering..." : "Register"}
            </button>
            <div className="text-center text-xs mt-1">
              <button
                type="button"
                onClick={() => {
                  setShowRegister(false);
                  setError(null);
                  setStatusMessage(""); // Clear status message when switching forms
                  setPassword("");    // Clear password for login form
                }}
                className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        )}

      {/* Error Display */}
      {error && (
        <div className="alert alert-danger mt-2 text-xs p-2">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};