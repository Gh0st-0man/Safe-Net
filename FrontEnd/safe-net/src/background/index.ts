//  SafeNet Background Script
class BackendConnector {
  
  private backendUrl = "http://127.0.0.1:5000";
  private token: string | null = null;
  private static instance: BackendConnector;

  private constructor() {
    
    //this.backendUrl = "http://127.0.0.1:5000"; // Explicitly set default
    this.loadState();
    this.listenForStorageChanges();
  }

  static getInstance() {
    return (this.instance ||= new BackendConnector());
  }

  private async loadState() {
    try {
      const { authToken, aiBackendUrl } = await chrome.storage.local.get([
        "authToken",
        "aiBackendUrl",
      ]);
      this.token = authToken || null;
     
      this.backendUrl = aiBackendUrl || this.backendUrl; // this.backendUrl is now "http://127.0.0.1:5000"

      if (!aiBackendUrl) {
        // MODIFIED: Save the correct default if it wasn't there
        await chrome.storage.local.set({ aiBackendUrl: this.backendUrl });
      }
    } catch (error: any) {
      console.error("Error loading state:", error.message);
    }
  }

  private listenForStorageChanges() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "local") {
        if (changes.authToken) this.token = changes.authToken.newValue || null;
        if (changes.aiBackendUrl)
        
          this.backendUrl = changes.aiBackendUrl.newValue || "http://127.0.0.1:5000";
      }
    });
  }

  getBackendUrl() {
    return this.backendUrl.trim();
  }
  isLoggedIn() {
    return this.token !== null;
  }

  _setBackendUrlInternal(url: string) {
    this.backendUrl = url.trim(); 
  }

  async checkConnection(urlToTest?: string) {
    const url = (urlToTest || this.getBackendUrl()).trim(); 
    if (!url?.match(/^https?:/)) {
      return { success: false, error: "Invalid URL", verifiedUrl: url };
    }

    try {
      // MODIFIED: Endpoint to /api/status
      const response = await fetch(`${url}/api/status`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
        cache: "no-cache",
      });

      if (response.ok) {
        const data = await response.json(); // FastAPI returns { status: "online", model_path: "..." }
        return {
          success: true,
          verifiedUrl: url,
          // MODIFIED: Use data.model_path. UI should ideally expect model_path.
          // For compatibility, if something downstream strictly expected model_status:
          // model_status: data.model_path,
          // But it's better to be accurate:
          model_path: data.model_path,
          api_status: data.status, // Keep original status if needed
        };
      }

      const errorMsg = await response
        .json()
        // MODIFIED: Check for FastAPI's 'detail' field
        .then((d) => d.detail || d.error || d.message)
        .catch(() => `Server error ${response.status}`);
      return { success: false, error: errorMsg, verifiedUrl: url };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Network error",
        verifiedUrl: url,
      };
    }
  }

  async login(email: string, password: string) {
    try {
      // MODIFIED: Endpoint to /auth/login
      const response = await fetch(`${this.getBackendUrl()}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // FastAPI UserLogin schema expects {email, password} in JSON body
        body: JSON.stringify({ email, password }),
        mode: "cors",
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(
          // MODIFIED: Check for FastAPI's 'detail' field
          data.detail || data.error || data.msg || `Login failed: ${response.status}`
        );
      if (!data.access_token) throw new Error("No access token received");

      this.token = data.access_token;
      await chrome.storage.local.set({ authToken: this.token });
      return { token: this.token };
    } catch (error: any) {
      this.token = null;
      await chrome.storage.local.remove("authToken");
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      // MODIFIED: Endpoint to /auth/register
      const response = await fetch(`${this.getBackendUrl()}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
      });

      const data = await response.json(); // FastAPI returns UserPublic on success
      if (!response.ok)
        throw new Error(
          // MODIFIED: Check for FastAPI's 'detail' field
          data.detail || data.error || data.msg || `Registration failed: ${response.status}`
        );

      // MODIFIED: FastAPI register returns the user object.
      // Adapt to return a success structure compatible with previous expectations if necessary.
      return {
        success: true,
        message: data.email ? `User ${data.email} registered successfully.` : "Registration successful",
        user: data, // Optionally include the returned user data
      };
    } catch (error: any) {
      throw error;
    }
  }

  async logout() {
    this.token = null;
    await chrome.storage.local.remove("authToken");
  }

  async analyzeUrlApi(url: string) {
    // MODIFIED: Pass /api/api/analyze to makeAuthRequest
    return this.makeAuthRequest("/api/api/analyze", "POST", { url });
  }

  async makeAuthRequest(endpoint: string, method = "GET", body: any = null) {
    if (!this.token) throw new Error("Not authenticated");

    // MODIFIED: Endpoint should already include the prefix (e.g., /api/api/analyze)
    const requestUrl = `${this.getBackendUrl()}${endpoint}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
      Accept: "application/json",
    };
    if (body) headers["Content-Type"] = "application/json";

    try {
      const response = await fetch(requestUrl, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        mode: "cors",
      });

      let data: any;
      const contentType = response.headers.get("content-type");

      if (response.status === 204) { // No Content
        data = null;
      } else if (contentType?.includes("application/json")) {
        data = await response
          .json()
          .catch(() => ({ error: "Invalid JSON response" }));
      } else {
        data = await response.text().catch(() => ""); // Handle non-JSON response as text
      }

      if (!response.ok) {
        const errorMsg =
          // MODIFIED: Check for FastAPI's 'detail' field first
          data?.detail ||
          data?.error ||
          data?.msg ||
          (typeof data === "string" && data.length > 0 && data.length < 500 // Heuristic for simple text error
            ? data
            : `Request failed: ${response.status}`);
        if (response.status === 401) {
          await this.logout();
          // MODIFIED: Use FastAPI's detail message if available, otherwise a generic one
          throw new Error(data?.detail || "Authentication expired. Please log in again.");
        }
        throw new Error(errorMsg);
      }

      return data;
    } catch (error: any) {
      // Catch network errors or other issues before fetch even completes
      if (error instanceof TypeError && error.message === "Failed to fetch") {
          throw new Error(`Network error: Failed to connect to ${this.getBackendUrl()}. Please check if the server is running and accessible.`);
      }
      throw error; // Re-throw other errors
    }
  }
}

// Cookie removal helper (no changes needed for API alignment)
async function performCookieRemoval(
  command: "removeThirdParty" | "clearAllSite",
  domain: string
) {
  if (!domain)
    return {
      success: false,
      message: "Domain required",
      removedCount: 0,
      failedCount: 0,
    };

  const allCookies = await chrome.cookies.getAll({});
  let cookiesToRemove: chrome.cookies.Cookie[] = [];

  if (command === "removeThirdParty") {
    const siteRoot = domain.split(".").slice(-2).join(".");
    cookiesToRemove = allCookies.filter((cookie) => {
      const cookieDomain = cookie.domain.startsWith(".")
        ? cookie.domain.substring(1)
        : cookie.domain;
      const cookieRoot = cookieDomain.split(".").slice(-2).join(".");
      const isFirstParty =
        cookieDomain === domain ||
        cookieDomain.endsWith(`.${domain}`) ||
        domain.endsWith(`.${cookieDomain}`);
      return !isFirstParty && cookieRoot !== siteRoot;
    });
  } else { // command === "clearAllSite"
    cookiesToRemove = allCookies.filter((cookie) => {
      const cookieDomain = cookie.domain.startsWith(".")
        ? cookie.domain.substring(1)
        : cookie.domain;
      return cookieDomain === domain || cookie.domain === `.${domain}`;
    });
  }

  if (!cookiesToRemove.length) {
    return {
      success: true,
      message: "No cookies to remove",
      removedCount: 0,
      failedCount: 0,
    };
  }

  let successCount = 0,
    failCount = 0;

  for (const cookie of cookiesToRemove) {
    const url = `http${cookie.secure ? "s" : ""}://${
      cookie.domain.startsWith(".") ? cookie.domain.substring(1) : cookie.domain
    }${cookie.path || "/"}`;
    try {
      const result = await chrome.cookies.remove({
        url,
        name: cookie.name,
        storeId: cookie.storeId,
      });
      result ? successCount++ : failCount++;
    } catch {
      failCount++;
    }
  }

  return {
    success: successCount > 0,
    message: `Removed ${successCount}/${cookiesToRemove.length} cookies${
      failCount > 0 ? `. ${failCount} failed` : ""
    }`,
    removedCount: successCount,
    failedCount: failCount,
  };
}

// Initialize
const backendConnector = BackendConnector.getInstance();
console.log("SafeNet Background Service Worker Initialized.");

// Extension setup
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log("SafeNet Extension installed/updated:", details.reason);

  const { aiBackendUrl, theme } = await chrome.storage.local.get([
    "aiBackendUrl",
    "theme",
  ]);
  const defaults: Record<string, any> = {};

  // MODIFIED: Ensure default backend URL is from the connector instance,
  // which now correctly defaults to "http://127.0.0.1:5000"
  if (!aiBackendUrl) defaults.aiBackendUrl = backendConnector.getBackendUrl();
  if (!theme) defaults.theme = "light";

  if (Object.keys(defaults).length) {
    await chrome.storage.local.set(defaults);
    console.log("Default settings initialized:", defaults);
  }
});

// Message handler (no changes needed for API alignment, relies on BackendConnector methods)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message?.action) {
    sendResponse({ success: false, error: "Action missing" });
    return false; // Important for async sendResponse
  }

  const { action, data } = message;
  const asyncHandler = (promise: Promise<any>) => {
    promise
      .then(sendResponse)
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true; // Indicate async response
  };

  switch (action) {
    case "checkConnection":
      return asyncHandler(backendConnector.checkConnection(data?.urlToTest));

    case "login":
      if (!data?.email || !data?.password) {
        sendResponse({ success: false, error: "Email and password required" });
        return false;
      }
      return asyncHandler(
        backendConnector
          .login(data.email, data.password)
          .then((res) => ({ success: true, token: res.token }))
      );

    case "register":
      if (!data?.email || !data?.password) {
        sendResponse({ success: false, error: "Email and password required" });
        return false;
      }
      // MODIFIED: register now returns { success, message, user }
      return asyncHandler(backendConnector.register(data.email, data.password));

    case "logout":
      return asyncHandler(
        backendConnector
          .logout()
          .then(() => ({ success: true, message: "Logged out" }))
      );

    case "isLoggedIn":
      sendResponse({
        success: true,
        isLoggedIn: backendConnector.isLoggedIn(),
      });
      return false; // Synchronous response

    case "analyzeUrl":
      if (!data?.url) {
        sendResponse({ success: false, error: "URL required" });
        return false;
      }
      return asyncHandler(
        backendConnector
          .analyzeUrlApi(data.url)
          // The result from analyzeUrlApi is directly what FastAPI returns.
          // The UI (AIAnalyzer.tsx) should be responsible for transforming this.
          .then((res) => ({ success: true, data: res }))
      );

    case "getBackendUrl":
      sendResponse({
        success: true,
        backendUrl: backendConnector.getBackendUrl(),
      });
      return false; // Synchronous response

    case "setBackendUrlInternal": // This is likely for debugging or advanced settings
      if (!data?.url) {
        sendResponse({ success: false, error: "URL required" });
        return false;
      }
      backendConnector._setBackendUrlInternal(data.url);
      sendResponse({ success: true, newUrl: data.url });
      return false; // Synchronous response

    case "cookieAction":
      if (!data?.command || !data?.domain) {
        sendResponse({ success: false, error: "Command and domain required" });
        return false;
      }
      return asyncHandler(performCookieRemoval(data.command, data.domain));

    case "openSafeNetUI": // Assuming these actions open the popup
    case "openPopup":
      chrome.action.openPopup(() => {
        const success = !chrome.runtime.lastError;
        sendResponse({
          success,
          ...(success
            ? { message: "Popup opened" }
            : { error: chrome.runtime.lastError?.message }),
        });
      });
      return true; // Indicate async response (though openPopup is usually fast)

    default:
      sendResponse({ success: false, error: `Unknown action: ${action}` });
      return false; // Synchronous response
  }
});