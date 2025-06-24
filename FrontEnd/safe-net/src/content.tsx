// src/content.tsx
import cssText from "data-text:~style.css";
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";
import { Fingerprint, Cookie } from "lucide-react";
import React, { useState, useEffect } from "react";

// Configuration for the content script
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"], // Injects into all HTTP/HTTPS pages
  // all_frames: true, // Uncomment if you need this button in iframes as well
};

// Function to get and process styles for the Shadow DOM
export const getStyle: PlasmoGetStyle = () => {
  const baseFontSize = 16; // Standard base font size for rem to px conversion

  // Replace :root and html selectors with :host for proper Shadow DOM scoping
  let updatedCssText = cssText
    .replaceAll(":root", ":host(plasmo-csui)")
    .replaceAll("html {", ":host(plasmo-csui) {");

  // Convert rem units to px for Shadow DOM compatibility
  const remRegex = /([\d.]+)rem/g;
  updatedCssText = updatedCssText.replace(remRegex, (_match, remValue) => {
    const pixelsValue = parseFloat(remValue) * baseFontSize;
    return `${pixelsValue}px`;
  });

  const styleElement = document.createElement("style");
  styleElement.textContent = updatedCssText;
  return styleElement;
};

// The actual UI component to be injected into the page
const PlasmoOverlay = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cookieCount, setCookieCount] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Initialize theme and cookie count
  useEffect(() => {
    const initializeOverlay = async () => {
      try {
        // Get theme from storage
        const result = await chrome.storage.local.get(["theme"]);
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const storedTheme = result.theme || (systemPrefersDark ? "dark" : "light");
        setTheme(storedTheme);

        // Get initial cookie count
        updateCookieCount();
      } catch (error) {
        console.error("SafeNet: Error initializing overlay:", error);
      }
    };

    initializeOverlay();

    // Listen for theme changes
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.theme) {
        setTheme(changes.theme.newValue || "light");
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Update cookie count periodically
    const cookieUpdateInterval = setInterval(updateCookieCount, 5000); // Update every 5 seconds

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
      clearInterval(cookieUpdateInterval);
    };
  }, []);

  const updateCookieCount = () => {
    try {
      const url = window.location.href;
      const urlObj = new URL(url);
      
      // Check if it's a supported page type (http/https)
      if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
        setCookieCount(0);
        return;
      }
      
      // Use chrome.cookies.getAll directly like in CookieManager
      chrome.cookies.getAll({ domain: urlObj.hostname }, (cookies) => {
        if (chrome.runtime.lastError) {
          console.warn("SafeNet: Error getting cookies:", chrome.runtime.lastError.message);
          setCookieCount(0);
          return;
        }
        setCookieCount(cookies.length);
      });
    } catch (error) {
      console.error("SafeNet: Error getting cookie count:", error);
      setCookieCount(0);
    }
  };

  const handleOpenPopup = () => {
    chrome.runtime.sendMessage({ action: "openSafeNetUI" });
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      updateCookieCount(); // Refresh count when expanding
    }
  };

  // Theme-based classes
  const isDark = theme === "dark";
  const bgClass = isDark ? "plasmo-bg-gray-800" : "plasmo-bg-white";
  const textClass = isDark ? "plasmo-text-white" : "plasmo-text-gray-900";
  const borderClass = isDark ? "plasmo-border-gray-600" : "plasmo-border-gray-200";
  const buttonBgClass = isDark ? "plasmo-bg-teal-600" : "plasmo-bg-teal-500";
  const buttonHoverClass = isDark ? "hover:plasmo-bg-teal-700" : "hover:plasmo-bg-teal-600";

  return (
    <div className="plasmo-z-[2147483647] plasmo-fixed plasmo-bottom-8 plasmo-right-8 plasmo-font-sans">
      {/* Expanded info panel */}
      {isExpanded && (
        <div className={`
          plasmo-mb-3 plasmo-p-3 plasmo-rounded-lg plasmo-shadow-lg plasmo-border
          ${bgClass} ${textClass} ${borderClass}
          plasmo-transition-all plasmo-duration-300 plasmo-ease-in-out
          plasmo-min-w-[200px]
        `}>
          <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-mb-2">
            <h3 className="plasmo-text-sm plasmo-font-semibold plasmo-flex plasmo-items-center plasmo-gap-1">
              <Fingerprint size={16} />
              SafeNet
            </h3>
            <button
              onClick={handleToggleExpand}
              className={`
                plasmo-text-xs plasmo-px-2 plasmo-py-1 plasmo-rounded
                ${isDark ? "plasmo-bg-gray-700 hover:plasmo-bg-gray-600" : "plasmo-bg-gray-100 hover:plasmo-bg-gray-200"}
                plasmo-transition-colors
              `}
              aria-label="Collapse panel"
            >
              ×
            </button>
          </div>
          
          <div className="plasmo-space-y-2">
            <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-text-xs">
              <span className="plasmo-flex plasmo-items-center plasmo-gap-1">
                <Cookie size={14} />
                Cookies:
              </span>
              <span className={`
                plasmo-px-2 plasmo-py-1 plasmo-rounded-full plasmo-font-medium
                ${cookieCount > 10 
                  ? (isDark ? "plasmo-bg-red-900 plasmo-text-red-100" : "plasmo-bg-red-100 plasmo-text-red-800")
                  : cookieCount > 5
                  ? (isDark ? "plasmo-bg-yellow-900 plasmo-text-yellow-100" : "plasmo-bg-yellow-100 plasmo-text-yellow-800")
                  : (isDark ? "plasmo-bg-green-900 plasmo-text-green-100" : "plasmo-bg-green-100 plasmo-text-green-800")
                }
              `}>
                {cookieCount}
              </span>
            </div>
            
            <div className="plasmo-text-xs plasmo-opacity-75">
              Domain: {window.location.hostname}
            </div>
            
            <button
              onClick={handleOpenPopup}
              className={`
                plasmo-w-full plasmo-text-xs plasmo-py-2 plasmo-px-3 plasmo-rounded
                plasmo-font-medium plasmo-transition-colors
                ${buttonBgClass} ${buttonHoverClass} plasmo-text-white
                focus:plasmo-outline-none focus:plasmo-ring-2 focus:plasmo-ring-teal-400 focus:plasmo-ring-opacity-75
              `}
            >
              Open Full Analyzer
            </button>
          </div>
        </div>
      )}

      {/* Main floating button */}
      <div className="plasmo-relative">
        <button
          onClick={isExpanded ? handleOpenPopup : handleToggleExpand}
          className={`
            ${buttonBgClass} ${buttonHoverClass} plasmo-text-white
            plasmo-p-3 plasmo-rounded-full plasmo-shadow-xl
            plasmo-flex plasmo-items-center plasmo-justify-center
            plasmo-transition-all plasmo-duration-300
            hover:plasmo-scale-105
            focus:plasmo-outline-none focus:plasmo-ring-2 focus:plasmo-ring-teal-400 focus:plasmo-ring-opacity-75
            plasmo-relative
          `}
          title={isExpanded ? "Open SafeNet Analyzer" : "Show SafeNet Info"}
          aria-label={isExpanded ? "Open SafeNet Analyzer" : "Show SafeNet Info"}
        >
          <Fingerprint size={24} />
          
          {/* Cookie count badge */}
          {cookieCount > 0 && (
            <div className={`
              plasmo-absolute plasmo--top-2 plasmo--right-2
              plasmo-bg-red-500 plasmo-text-white plasmo-text-xs
              plasmo-rounded-full plasmo-min-w-[20px] plasmo-h-5
              plasmo-flex plasmo-items-center plasmo-justify-center
              plasmo-font-bold plasmo-shadow-md
              ${cookieCount > 99 ? "plasmo-px-1" : ""}
            `}>
              {cookieCount > 99 ? "99+" : cookieCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default PlasmoOverlay;