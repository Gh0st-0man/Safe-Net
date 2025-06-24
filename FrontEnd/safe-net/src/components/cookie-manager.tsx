// src/components/cookie-manager.tsx (Quick Actions for Popup Tab)
import React, { useState, useEffect, useCallback } from "react";
import "../style.css";
import {
  ShieldAlert,
  Trash2,
  Loader2,
  Info as InfoIconLucide,
  CheckCircle,
  XCircle,
  Globe,
  Cookie as CookieIconLucide,
  Settings2, // For advanced manager link
} from "lucide-react";

export const CookieManager: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [cookiesCount, setCookiesCount] = useState<number | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [currentDomain, setCurrentDomain] = useState<string>("");
  const [currentTabId, setCurrentTabId] = useState<number | null>(null);
  const [isUnsupportedPage, setIsUnsupportedPage] = useState(false);

  const showTimedMessage = useCallback(
    (
      text: string,
      type: "success" | "error" | "info",
      duration: number = 4000
    ) => {
      setMessage({ text, type });
      setTimeout(() => setMessage(null), duration);
    },
    []
  );

  const countCookiesForDomain = useCallback(
    (domain: string) => {
      if (
        !domain ||
        domain === "N/A" ||
        domain === "Error" ||
        isUnsupportedPage
      ) {
        setCookiesCount(0);
        return;
      }
      chrome.cookies.getAll({ domain }, (cookies) => {
        if (chrome.runtime.lastError) {
          console.warn(
            `CookieManager: Error getting cookies for ${domain}:`,
            chrome.runtime.lastError.message
          );
          setCookiesCount(null);
          return;
        }
        setCookiesCount(cookies.length);
      });
    },
    [isUnsupportedPage]
  );

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url && tabs[0]?.id) {
        try {
          const url = new URL(tabs[0].url);
          if (url.protocol !== "http:" && url.protocol !== "https:") {
            showTimedMessage(
              "Cookie actions apply to http/https websites only.",
              "info"
            );
            setCurrentDomain("N/A (Unsupported)");
            setIsUnsupportedPage(true);
            setCookiesCount(0);
            return;
          }
          setIsUnsupportedPage(false);
          const domain = url.hostname;
          setCurrentDomain(domain);
          setCurrentTabId(tabs[0].id);
          countCookiesForDomain(domain);
        } catch (e) {
          console.error("CookieManager: Invalid URL in active tab:", e);
          showTimedMessage(
            "Could not determine current website from URL.",
            "error"
          );
          setCurrentDomain("Error");
          setIsUnsupportedPage(true);
          setCookiesCount(null);
        }
      } else {
        showTimedMessage("No active http/https website tab found.", "info");
        setCurrentDomain("N/A");
        setIsUnsupportedPage(true);
        setCookiesCount(0);
      }
    });
  }, [countCookiesForDomain, showTimedMessage]);

  const handleAction = async (
    actionType: "removeThirdParty" | "clearAllSite"
  ) => {
    setIsProcessing(true);
    setProcessingAction(actionType);
    setMessage(null);

    if (
      isUnsupportedPage ||
      !currentDomain ||
      currentDomain === "N/A" ||
      currentDomain === "Error"
    ) {
      showTimedMessage(
        "No active/applicable website for cookie actions.",
        "error"
      );
      setIsProcessing(false);
      setProcessingAction(null);
      return;
    }

    try {
      const response = await chrome.runtime.sendMessage({
        action: "cookieAction",
        data: {
          command: actionType,
          domain: currentDomain,
          tabId: currentTabId,
        },
      });

      if (response?.success) {
        showTimedMessage(
          response.message || `Cookie action successful.`,
          "success"
        );
      } else {
        showTimedMessage(response?.error || "Cookie action failed.", "error");
      }
    } catch (error: any) {
      showTimedMessage(
        `An error occurred: ${error.message || String(error)}`,
        "error"
      );
    } finally {
      setIsProcessing(false);
      setProcessingAction(null);
      if (currentDomain && !isUnsupportedPage) {
        setTimeout(() => countCookiesForDomain(currentDomain), 800);
      }
    }
  };

  const openAdvancedCookieManager = () => {
    // Corrected: Plasmo builds tab pages under the "tabs/" path.
    // The file src/tabs/advancedcookiemanager.tsx becomes tabs/advancedcookiemanager.html
    const pageUrl = chrome.runtime.getURL("tabs/advancedcookiemanager.html");
    chrome.tabs.create({
      url: `${pageUrl}${
        currentDomain &&
        !isUnsupportedPage &&
        currentDomain !== "Error" &&
        currentDomain !== "N/A (Unsupported)"
          ? `?domain=${encodeURIComponent(currentDomain)}`
          : ""
      }`,
    });
  };

  const getMessageIcon = (type: "success" | "error" | "info") => {
    const iconProps = { className: "alert-icon" };
    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} />;
      case "error":
        return <XCircle {...iconProps} />;
      case "info":
        return <InfoIconLucide {...iconProps} />;
      default:
        return null;
    }
  };

  const actionButtonDisabled =
    isProcessing ||
    isUnsupportedPage ||
    cookiesCount === 0 ||
    cookiesCount === null;

  return (
    <div className="panel">
      <div className="panel-header mb-3">
        <h3 className="panel-title">
          <CookieIconLucide
            size={20}
            className="text-teal-600 dark:text-teal-400"
          />
          Quick Cookie Actions
        </h3>
      </div>

      <div className="mb-3 p-2.5 bg-slate-100 dark:bg-slate-800 rounded-md text-xs">
        <div className="flex items-center text-slate-700 dark:text-slate-200 mb-0.5">
          <Globe
            size={14}
            className="mr-1.5 text-teal-500 dark:text-teal-400"
          />
          <span className="font-medium">Current Site:</span>
        </div>
        <p className="text-teal-600 dark:text-teal-400 break-all font-semibold ml-5">
          {currentDomain || "Detecting..."}
        </p>
      </div>

      {!isUnsupportedPage && cookiesCount !== null ? (
        <div className="mb-3 text-xs text-center text-slate-600 dark:text-slate-300 py-2 px-3 bg-slate-100 dark:bg-slate-800 rounded-md">
          This site has approx.{" "}
          <span className="font-bold text-teal-600 dark:text-teal-400">
            {cookiesCount}
          </span>{" "}
          cookie{cookiesCount !== 1 ? "s" : ""}.
        </div>
      ) : (
        !isUnsupportedPage &&
        cookiesCount === null && // Show "Counting..." only when count is null and page is supported
        !message && (
          <div className="mb-3 text-xs text-center text-slate-500 dark:text-slate-400 py-2 px-3 flex items-center justify-center">
            <Loader2 size={14} className="animate-spin inline mr-2" /> Counting
            cookies...
          </div>
        )
      )}
      {isUnsupportedPage &&
        !message && ( // Message for unsupported pages if no other message shown
          <div className="mb-3 text-xs text-center text-slate-500 dark:text-slate-400 py-2 px-3">
            Cookie actions are not available for this page type.
          </div>
        )}

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => handleAction("removeThirdParty")}
          disabled={isProcessing || isUnsupportedPage}
          title="Removes cookies not matching the current site's main domain."
          className="btn btn-danger w-full btn-sm"
        >
          {isProcessing && processingAction === "removeThirdParty" ? (
            <Loader2 size={16} className="animate-spin mr-1.5" />
          ) : (
            <ShieldAlert size={16} className="mr-1.5" />
          )}
          <span>
            {isProcessing && processingAction === "removeThirdParty"
              ? "Processing..."
              : "Clear 3rd Party Cookies"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleAction("clearAllSite")}
          disabled={actionButtonDisabled}
          title="Removes all cookies associated with the current site's domain."
          className="btn btn-secondary w-full btn-sm"
        >
          {isProcessing && processingAction === "clearAllSite" ? (
            <Loader2 size={16} className="animate-spin mr-1.5" />
          ) : (
            <Trash2 size={16} className="mr-1.5" />
          )}
          <span>
            {isProcessing && processingAction === "clearAllSite"
              ? "Processing..."
              : "Clear This Site's Cookies"}
          </span>
        </button>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={openAdvancedCookieManager}
          className="inline-flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 dark:focus:ring-offset-slate-800 rounded-sm p-1"
        >
          <Settings2 size={14} /> Advanced Cookie Manager
        </button>
      </div>

      {message && (
        <div
          className={`alert text-xs mt-3 ${
            message.type === "success"
              ? "alert-success"
              : message.type === "error"
              ? "alert-danger"
              : "alert-info"
          }`}
        >
          {getMessageIcon(message.type)}
          <span className="ml-1 break-words">{message.text}</span>
        </div>
      )}
    </div>
  );
};
