// src/components/VirusTotalScan.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ShieldCheck,
  Loader2,
  AlertTriangle,
  ExternalLink,
  Info as InfoIconLucide,
  ShieldAlert,
  CircleSlash,
  CheckCircle2,
  SearchCheck,
} from "lucide-react";
import "../style.css"; // Import global styles
import { Loading } from "./Loading"; // Import Loading component

interface VirusTotalScanProps {
  url: string;
}

interface ScanStats {
  harmless: number;
  malicious: number;
  suspicious: number;
  undetected: number;
  timeout?: number; // This seems specific to VT API response, not usually part of stats object
}

interface AnalysisAttributes {
  date: number; // Timestamp
  status: "queued" | "in-progress" | "completed" | string; // Allow other statuses
  stats: ScanStats;
  // results: object; // Can be large, consider if needed directly
}

interface VirusTotalAnalysisData {
  attributes: AnalysisAttributes;
  id: string; // Analysis ID
  type: string; // e.g., "analysis"
  meta?: {
    url_info?: {
      url: string;
      id: string; // Base64 URL identifier for GUI link
    };
  };
}

const POLLING_INTERVAL = 7000; // 7 seconds
const MAX_POLLING_ATTEMPTS = 15; // Approx 1.75 minutes total polling time

const StatItem: React.FC<{
  label: string;
  value: number;
  IconComp: React.ElementType;
  colorClass: string;
  iconColorClass: string;
  total: number;
}> = ({ label, value, IconComp, colorClass, iconColorClass, total }) => {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  const tooltipContent = `${label}: ${value} (${percentage}%)`;

  return (
    <div className="relative group">
      <div
        className={`p-2.5 rounded-lg shadow-sm ${colorClass} flex items-center justify-between transition-all hover:shadow-md`}
      >
        <div className="flex items-center gap-2">
          <IconComp size={18} className={iconColorClass} />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
            {label}
          </span>
        </div>
        <span className={`text-sm font-bold ${iconColorClass}`}>{value}</span>
      </div>
      {/* Tooltip: Consider a more accessible tooltip solution if this becomes complex */}
      <div className="absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-black dark:text-slate-200">
        {tooltipContent}
      </div>
    </div>
  );
};

export const VirusTotalScan: React.FC<VirusTotalScanProps> = ({ url }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanData, setScanData] = useState<VirusTotalAnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [scanStage, setScanStage] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize AbortController
    abortControllerRef.current = new AbortController();

    // Load API Key
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get("virusTotalApiKey", (result) => {
        if (result.virusTotalApiKey) {
          setApiKey(result.virusTotalApiKey);
          if (error?.includes("API Key")) setError(null); // Clear API key error if key is now found
        } else {
          setError(
            "VirusTotal API Key not set. Please configure it in Settings."
          );
        }
      });
    } else {
      console.warn("VirusTotalScan: chrome.storage.local not available.");
      setError("Extension storage is not accessible.");
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, [error]); // Re-run if error changes, e.g. to clear API key error

  const resetScanState = useCallback(() => {
    setIsScanning(false);
    setScanData(null);
    // Preserve API key error, clear other errors
    if (error && !error.includes("API Key not set")) {
      setError(null);
    }
    setScanStage("");
    setScanProgress(0);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort previous request
    }
    abortControllerRef.current = new AbortController(); // Create a new one for next scan
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
    }
  }, [error]);

  const handleApiError = (
    response: Response,
    prefix: string = "VirusTotal API Error"
  ): string => {
    if (response.status === 401 || response.status === 403)
      return "Invalid or unauthorized API Key. Check Settings.";
    if (response.status === 429)
      return "VirusTotal API rate limit exceeded. Try again later.";
    return `${prefix} (${response.status}): ${
      response.statusText || "Unknown error."
    }`;
  };

  const pollForResults = useCallback(
    async (analysisId: string, currentAttempt: number) => {
      if (
        !abortControllerRef.current ||
        abortControllerRef.current.signal.aborted
      )
        return;

      if (currentAttempt >= MAX_POLLING_ATTEMPTS) {
        setError("Scan timed out: VirusTotal took too long.");
        setIsScanning(false);
        setScanStage("Scan timed out");
        setScanProgress(100);
        return;
      }

      setScanStage(
        `Fetching results (attempt ${
          currentAttempt + 1
        }/${MAX_POLLING_ATTEMPTS})...`
      );
      setScanProgress(
        50 + Math.round((currentAttempt / MAX_POLLING_ATTEMPTS) * 45)
      );

      try {
        const analysisResponse = await fetch(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          {
            headers: { "x-apikey": apiKey, accept: "application/json" },
            signal: abortControllerRef.current.signal,
          }
        );

        if (!analysisResponse.ok)
          throw new Error(
            handleApiError(analysisResponse, "Failed to get analysis")
          );

        const analysisJson = await analysisResponse.json();
        const currentScanData = analysisJson.data as VirusTotalAnalysisData;

        if (currentScanData.attributes.status === "completed") {
          setScanData(currentScanData);
          setIsScanning(false);
          setScanStage("Analysis complete!");
          setScanProgress(100);
        } else if (
          ["queued", "in-progress"].includes(currentScanData.attributes.status)
        ) {
          setScanStage(
            `Analysis status: ${currentScanData.attributes.status}. Waiting...`
          );
          pollingTimeoutRef.current = setTimeout(
            () => pollForResults(analysisId, currentAttempt + 1),
            POLLING_INTERVAL
          );
        } else {
          setError(
            `Scan failed with status: ${currentScanData.attributes.status}`
          );
          setIsScanning(false);
          setScanStage(`Scan status: ${currentScanData.attributes.status}`);
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("VirusTotal polling aborted.");
          return;
        }
        setError(err.message || "Failed to retrieve scan results.");
        setIsScanning(false);
        setScanStage("Error retrieving results");
      }
    },
    [apiKey]
  ); // Removed resetScanState as it's called before starting scan

  const startScan = useCallback(async () => {
    if (!url) {
      setError("No URL detected for VirusTotal scan.");
      return;
    }
    if (!apiKey) {
      setError("VirusTotal API Key not set. Configure in Settings.");
      return;
    }

    resetScanState(); // Reset state before new scan
    setIsScanning(true);

    try {
      setScanStage("Submitting URL...");
      setScanProgress(10);

      const submitResponse = await fetch(
        "https://www.virustotal.com/api/v3/urls",
        {
          method: "POST",
          headers: {
            "x-apikey": apiKey,
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
          body: `url=${encodeURIComponent(url)}`,
          signal: abortControllerRef.current?.signal,
        }
      );
      setScanProgress(30);

      if (!submitResponse.ok) {
        let errorMsg = handleApiError(submitResponse, "Failed to submit URL");
        try {
          const errorJson = await submitResponse.json();
          if (errorJson.error?.message)
            errorMsg = `VT Submission Error: ${errorJson.error.message}`;
        } catch (e) {
          /* ignore */
        }
        throw new Error(errorMsg);
      }

      const submitData = await submitResponse.json();
      if (!submitData.data?.id)
        throw new Error("VirusTotal did not return a valid analysis ID.");

      setScanStage("URL submitted, awaiting analysis...");
      setScanProgress(50);
      pollingTimeoutRef.current = setTimeout(
        () => pollForResults(submitData.data.id, 0),
        POLLING_INTERVAL / 2
      ); // Start polling sooner
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("VirusTotal submission aborted.");
        return;
      }
      setError(err.message || "Failed to initiate VirusTotal scan.");
      setIsScanning(false);
      setScanStage("Error initiating scan");
    }
  }, [url, apiKey, resetScanState, pollForResults]);

  const renderStats = () => {
    if (!scanData?.attributes.stats) return null;
    const stats = scanData.attributes.stats;
    const totalEngines = Object.values(stats).reduce(
      (sum, val = 0) => sum + val,
      0
    );

    if (totalEngines === 0 && scanData.attributes.status === "completed") {
      return (
        <p className="text-sm text-center text-slate-500 dark:text-slate-400 py-3">
          No engine results available for this URL.
        </p>
      );
    }
    if (totalEngines === 0) return null; // Don't render if no engines and not completed (e.g. still queued)

    const statDefinitions = [
      {
        label: "Malicious",
        value: stats.malicious || 0,
        IconComp: ShieldAlert,
        color: "red",
        colorClass: "bg-red-50 dark:bg-red-900/50",
        iconColorClass: "text-red-600 dark:text-red-400",
      },
      {
        label: "Suspicious",
        value: stats.suspicious || 0,
        IconComp: AlertTriangle,
        color: "yellow",
        colorClass: "bg-yellow-50 dark:bg-yellow-900/50",
        iconColorClass: "text-yellow-600 dark:text-yellow-400",
      },
      {
        label: "Harmless",
        value: stats.harmless || 0,
        IconComp: CheckCircle2,
        color: "green",
        colorClass: "bg-green-50 dark:bg-green-900/50",
        iconColorClass: "text-green-600 dark:text-green-400",
      },
      {
        label: "Undetected",
        value: stats.undetected || 0,
        IconComp: CircleSlash,
        color: "slate",
        colorClass: "bg-slate-100 dark:bg-slate-700/50",
        iconColorClass: "text-slate-500 dark:text-slate-400",
      },
    ];

    const base64UrlId = scanData.meta?.url_info?.id;
    const vtGuiLink = base64UrlId
      ? `https://www.virustotal.com/gui/url/${base64UrlId}/detection`
      : `https://www.virustotal.com/gui/search/${encodeURIComponent(url)}`;

    return (
      <div className="space-y-3">
        <div className="flex h-2.5 w-full rounded-full overflow-hidden shadow-inner bg-slate-200 dark:bg-slate-600">
          {statDefinitions.map(
            (item) =>
              item.value > 0 && (
                <div
                  key={item.label}
                  className={`h-full bg-${item.color}-500 dark:bg-${item.color}-400`} // Direct color usage for progress bar segments
                  style={{ width: `${(item.value / totalEngines) * 100}%` }} // Dynamic style, keep
                  title={`${item.label}: ${item.value} (${(
                    (item.value / totalEngines) *
                    100
                  ).toFixed(1)}%)`}
                />
              )
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {statDefinitions
            .filter(
              (item) =>
                item.value > 0 ||
                ["Harmless", "Undetected"].includes(item.label)
            )
            .map((item) => (
              <StatItem key={item.label} {...item} total={totalEngines} />
            ))}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
          Total Engines:{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {totalEngines}
          </span>
        </div>
        <a
          href={vtGuiLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 underline focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-sm font-medium"
        >
          View Full Report on VirusTotal <ExternalLink size={13} />
        </a>
      </div>
    );
  };

  const getOverallRiskAssessment = () => {
    if (!scanData?.attributes.stats)
      return {
        label: "Unknown",
        IconComp: InfoIconLucide,
        cardClasses:
          "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/60",
        titleTextClass: "text-slate-700 dark:text-slate-200",
      };
    const { malicious = 0, suspicious = 0 } = scanData.attributes.stats;
    if (malicious > 0)
      return {
        label: "Malicious",
        IconComp: ShieldAlert,
        cardClasses:
          "border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/60",
        titleTextClass: "text-red-600 dark:text-red-400",
      };
    if (suspicious > 0)
      return {
        label: "Suspicious",
        IconComp: AlertTriangle,
        cardClasses:
          "border-yellow-400 dark:border-yellow-500 bg-yellow-50 dark:bg-yellow-900/60",
        titleTextClass: "text-yellow-600 dark:text-yellow-400",
      };
    return {
      label: "Likely Clean",
      IconComp: ShieldCheck,
      cardClasses:
        "border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/60",
      titleTextClass: "text-green-600 dark:text-green-400",
    };
  };

  const risk = getOverallRiskAssessment();
  const RiskIcon = risk.IconComp;

  return (
    <div className="panel">
      {" "}
      {/* Using .panel from style.css */}
      <div className="panel-header">
        <h3 className="panel-title">
          <SearchCheck size={20} className="text-teal-600 dark:text-teal-400" />{" "}
          VirusTotal Scan
        </h3>
      </div>
      <div className="space-y-3">
        <button
          onClick={startScan}
          disabled={isScanning || !apiKey || !url}
          className="btn btn-primary w-full btn-sm"
        >
          {isScanning ? (
            <Loader2 size={16} className="animate-spin mr-1.5" />
          ) : (
            <ShieldCheck size={16} className="mr-1.5" />
          )}
          <span>
            {isScanning
              ? "Scanning..."
              : apiKey && url
              ? "Analyze with VirusTotal"
              : !apiKey
              ? "Setup API Key"
              : "No URL"}
          </span>
        </button>

        {error && (
          <div className="alert alert-danger text-xs" role="alert">
            <AlertTriangle className="alert-icon" />
            <div className="alert-content">
              <p>
                {error}{" "}
                {error.includes("API Key") && (
                  <span className="block mt-1">
                    Please verify your Key in Settings.
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {isScanning && scanStage && (
          <Loading
            progress={scanProgress}
            stage={scanStage}
            isLoading={isScanning}
          />
        )}

        {!apiKey &&
          !error &&
          !isScanning && ( // Show only if no other major state is active
            <div className="alert alert-info text-xs" role="alert">
              <InfoIconLucide className="alert-icon" />
              <div className="alert-content">
                <p>
                  VirusTotal API Key is not set. Please add it in the Settings
                  tab to enable this feature.
                </p>
              </div>
            </div>
          )}
      </div>
      {scanData && !isScanning && !error && (
        <div
          className={`mt-4 p-3.5 rounded-xl shadow-lg border-2 ${risk.cardClasses} transition-all duration-300`}
          role="region"
          aria-labelledby="vt-scan-heading"
        >
          <div className="mb-2.5">
            <h4
              id="vt-scan-heading"
              className={`text-md font-semibold flex items-center gap-2 ${risk.titleTextClass}`}
            >
              <RiskIcon size={20} /> Scan Results: {risk.label}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Completed:{" "}
              {new Date(scanData.attributes.date * 1000).toLocaleString()}
            </p>
          </div>
          {renderStats()}
        </div>
      )}
      {!isScanning && !scanData && !error && apiKey && url && (
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 py-2 mt-2">
          Click "Analyze with VirusTotal" to scan the current URL.
        </p>
      )}
    </div>
  );
};
