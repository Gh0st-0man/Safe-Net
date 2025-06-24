// src/components/Settings.tsx
import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Save,
  Loader2,
  CheckCircle2,
  XCircle,
  KeyRound,
  Globe,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Info as InfoIconLucide,
} from "lucide-react";
import "../style.css";

interface SettingsProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

export const Settings: React.FC<SettingsProps> = ({ toggleTheme, theme }) => {
  const [virusTotalApiKey, setVirusTotalApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [aiBackendUrl, setAiBackendUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    chrome.storage.local.get(["virusTotalApiKey", "aiBackendUrl"], (result) => {
      if (result.virusTotalApiKey) setVirusTotalApiKey(result.virusTotalApiKey);
      if (result.aiBackendUrl) setAiBackendUrl(result.aiBackendUrl);
    });
  }, []);

  const saveSettings = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      // Basic URL validation for AI Backend URL
      if (aiBackendUrl) {
        new URL(aiBackendUrl); // Will throw error if invalid
      }
      await chrome.storage.local.set({ virusTotalApiKey, aiBackendUrl });
      setMessage({ text: "Settings saved successfully!", type: "success" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      let errorMessage = "Failed to save settings.";
      if (error.message.includes("Invalid URL")) {
        errorMessage =
          "Invalid AI Backend URL format. Please include http:// or https://";
      } else {
        errorMessage = `Save failed: ${error.message}`;
      }
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const getMessageIcon = (
    type: "success" | "error" | "info"
  ): React.ReactNode => {
    const iconProps = { className: "alert-icon" }; // Uses class from style.css
    if (type === "success") return <CheckCircle2 {...iconProps} />;
    if (type === "error") return <XCircle {...iconProps} />;
    if (type === "info") return <InfoIconLucide {...iconProps} />;
    return null;
  };

  const commonInputClass = "input input-sm pl-9"; // Using classes from style.css

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">
          <SettingsIcon
            size={20}
            className="text-teal-600 dark:text-teal-400"
          />
          Application Settings
        </h3>
      </div>
      <div className="space-y-5">
        <div>
          <label className="search-input-label" htmlFor="virusTotalApiKey">
            {" "}
            {/* Reused class */}
            VirusTotal API Key
          </label>
          <div className="relative">
            <KeyRound
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
            <input
              type={showApiKey ? "text" : "password"}
              id="virusTotalApiKey"
              value={virusTotalApiKey}
              onChange={(e) => setVirusTotalApiKey(e.target.value)}
              className={`${commonInputClass} pr-9`} // Added pr-9 for eye icon
              placeholder="Enter VirusTotal API key"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              aria-label={showApiKey ? "Hide API key" : "Show API key"}
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="search-input-label" htmlFor="aiBackendUrl">
            AI Backend URL
          </label>
          <div className="relative">
            <Globe
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
            />
            <input
              type="url"
              id="aiBackendUrl"
              value={aiBackendUrl}
              onChange={(e) => setAiBackendUrl(e.target.value)}
              className={commonInputClass}
              placeholder="e.g., http://localhost:5000"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            URL for your AI features. Ensure it includes http:// or https://.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-700 mt-4">
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm w-full sm:w-auto"
          >
            {theme === "dark" ? (
              <Sun size={16} className="mr-1.5" />
            ) : (
              <Moon size={16} className="mr-1.5" />
            )}
            <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
          </button>

          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="btn btn-primary btn-sm w-full sm:w-auto"
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin mr-1.5" />
            ) : (
              <Save size={16} className="mr-1.5" />
            )}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
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
            <span className="break-words">{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};
