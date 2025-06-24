// src/popup.tsx
// src/popup.tsx
import React, { useState, useEffect, useCallback } from "react";
import "./style.css"; // Global styles
import { VirusTotalScan } from "./components/VirusTotalScan";
import { AIAnalyzer } from "./components/AIAnalyzer";
import { AIAuth } from "./components/Ai_Auth";
import { CookieManager as PopupCookieManager } from "./components/cookie-manager";
//import { PhishingDetector } from "./components/PhishingDetector"; // Available if needed
import { Settings } from "./components/Settings";
import {
  Sun,
  Moon,
  LogOut,
  Shield,
  Info as InfoIconLucide,
  Settings as SettingsIconTab,
  Cookie as CookieIconLucide,
  Fingerprint,
  Loader2,
} from "lucide-react";


type ActiveTab = "analyze" | "cookies" | "settings";

const Popup = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [currentHostname, setCurrentHostname] = useState<string>("Loading...");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("analyze");
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    const initializePopup = async () => {
      // Get active tab URL
      try {
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tabs[0]?.url) {
          try {
            const urlObj = new URL(tabs[0].url);
            setCurrentUrl(tabs[0].url);
            setCurrentHostname(urlObj.hostname);
            if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
              setCurrentHostname("N/A (Unsupported Page)");
            }
          } catch (e) {
            console.warn("Popup: Invalid URL in active tab", tabs[0].url);
            setCurrentUrl("");
            setCurrentHostname("Invalid URL");
          }
        } else {
          setCurrentUrl("");
          setCurrentHostname("No active tab");
        }
      } catch (e) {
        console.error("Error querying tabs:", e);
        setCurrentUrl("");
        setCurrentHostname("Error loading URL");
      }

      // Get stored theme and auth token
      try {
        const result = await chrome.storage.local.get(["theme", "authToken"]);
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const storedTheme =
          result.theme || (systemPrefersDark ? "dark" : "light");
        setTheme(storedTheme);
        document.documentElement.classList.toggle(
          "dark",
          storedTheme === "dark"
        );

        if (result.authToken) {
          setAuthToken(result.authToken);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Error getting data from storage:", e);
      }
      setIsLoadingInitial(false);
    };

    initializePopup();
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    chrome.storage.local.set({ theme: newTheme }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving theme:", chrome.runtime.lastError);
      }
    });
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [theme]);

  const handleLoginSuccess = useCallback(
    (token: string, backendUrlUsed?: string) => {
      setAuthToken(token);
      setIsLoggedIn(true);
      chrome.storage.local.set({ authToken: token });
      setActiveTab("analyze"); // Switch to analyze tab on login
      console.log("Login successful, backend:", backendUrlUsed);
    },
    []
  );

  const handleLogout = useCallback(() => {
    setAuthToken(null);
    setIsLoggedIn(false);
    chrome.storage.local.remove("authToken");
    // Optionally, notify background or other parts if needed
    // chrome.runtime.sendMessage({ action: "logout" });
  }, []);

  const handleBackendConnectionChange = useCallback(
    (isConnected: boolean, backendUrlUsed: string) => {
      console.log(
        "Popup: Backend connection status:",
        isConnected,
        "at",
        backendUrlUsed
      );
    },
    []
  );

  const TabButton: React.FC<{
    tabName: ActiveTab;
    onClick: () => void;
    children: React.ReactNode;
    IconComp: React.ElementType;
  }> = ({ tabName, onClick, children, IconComp }) => (
    <button
      className={`tab-button ${
        activeTab === tabName ? "tab-button-active" : "tab-button-inactive"
      }`}
      onClick={onClick}
      role="tab"
      aria-selected={activeTab === tabName}
      aria-controls={`tab-panel-${tabName}`}
      id={`tab-${tabName}`}
    >
      <IconComp className="tab-button-icon" />
      {children}
    </button>
  );

  if (isLoadingInitial) {
    return (
      <div className="popup-container flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="popup-container">
      <header className="popup-header">
        <div className="flex items-center justify-between">
          <h1
            className="popup-title-brand flex items-center gap-1.5"
            tabIndex={0}
          >
            <Fingerprint size={20} /> SafeNet
          </h1>
          <div className="header-actions-container">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="icon-button-neutral"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="icon-button-neutral"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
        {currentUrl && (
          <div
            className="current-url-banner"
            role="region"
            aria-label="Current URL information"
          >
            <p className="current-url-text">
              Current:{" "}
              <span className="current-url-hostname">{currentHostname}</span>
            </p>
          </div>
        )}
      </header>

      <main className="popup-main-content">
        {!isLoggedIn ? (
          <div className="auth-prompt-container">
            <div className="alert alert-info mb-4" role="alert">
              <InfoIconLucide className="alert-icon" />
              <div className="alert-content">
                <h5>Access AI Features</h5>
                <p>
                  Login or register to enable AI-powered security analysis for
                  URLs.
                </p>
              </div>
            </div>
            <AIAuth
              onLoginSuccess={handleLoginSuccess}
              onBackendConnected={handleBackendConnectionChange}
            />
          </div>
        ) : (
          <>
            <nav
              className="popup-tab-navigation"
              role="tablist"
              aria-label="Main navigation"
            >
              <TabButton
                tabName="analyze"
                onClick={() => setActiveTab("analyze")}
                IconComp={Shield}
              >
                Analyze
              </TabButton>
              <TabButton
                tabName="cookies"
                onClick={() => setActiveTab("cookies")}
                IconComp={CookieIconLucide}
              >
                Cookies
              </TabButton>
              <TabButton
                tabName="settings"
                onClick={() => setActiveTab("settings")}
                IconComp={SettingsIconTab}
              >
                Settings
              </TabButton>
            </nav>

            <div className="tab-content-area">
              {activeTab === "analyze" && (
                <div
                  id="tab-panel-analyze"
                  role="tabpanel"
                  aria-labelledby="tab-analyze"
                  className="space-y-3"
                >
                  <AIAnalyzer
                    url={currentUrl}
                    getAuthToken={async () => authToken}
                  />
                  <VirusTotalScan url={currentUrl} />
                  {/* <PhishingDetector url={currentUrl} /> */}
                </div>
              )}
              {activeTab === "cookies" && (
                <div
                  id="tab-panel-cookies"
                  role="tabpanel"
                  aria-labelledby="tab-cookies"
                >
                  <PopupCookieManager />
                </div>
              )}
              {activeTab === "settings" && (
                <div
                  id="tab-panel-settings"
                  role="tabpanel"
                  aria-labelledby="tab-settings"
                >
                  <Settings toggleTheme={toggleTheme} theme={theme} />
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className="popup-footer">
        <p className="popup-footer-text">SafeNet v1.0.0</p>
      </footer>
    </div>
  );
};

export default Popup;
