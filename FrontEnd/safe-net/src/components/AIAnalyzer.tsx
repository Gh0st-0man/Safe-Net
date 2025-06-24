// components/AIAnalyzer.tsx
import React, { useState, useEffect } from "react";
import {
  Loader2,
  Info as InfoIconLucide,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import "../style.css";
import { Loading } from "./Loading"; // Import the Loading component

interface AIAnalyzerProps {
  url: string;
  getAuthToken: () => Promise<string | null>;
}

interface ApiResponse {
  url: string;
  result: Array<{
    label: string;
    score: number;
  }>;
  analyzed_by: string;
}

interface AnalysisResult {
  url: string;
  risk: string;
  category: string;
  description: string;
  offlineMode?: boolean;
  confidence: number;
  details?: {
    [key: string]: any;
  };
  error?: string;
}

export const AIAnalyzer: React.FC<AIAnalyzerProps> = ({
  url,
  getAuthToken,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [backendUrl, setBackendUrl] = useState<string>("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState("");

  useEffect(() => {
    chrome.storage.local.get("aiBackendUrl", (result) => {
      setBackendUrl(result.aiBackendUrl || "https://localhost:5001");
    });
  }, []);

  const parseApiResponse = (apiResponse: ApiResponse): AnalysisResult => {
    // Find LABEL_0 (benign) and LABEL_1 (phishing) results
    const benignResult = apiResponse.result.find(r => r.label === "LABEL_0");
    const phishingResult = apiResponse.result.find(r => r.label === "LABEL_1");
    
    let risk = "unknown";
    let category = "unknown";
    let description = "Analysis completed.";
    let confidence = 50;

    if (benignResult && phishingResult) {
      // Both labels present - use the higher scoring one
      if (benignResult.score > phishingResult.score) {
        risk = "low";
        category = "safe";
        description = "This website appears to be safe based on AI analysis.";
        confidence = Math.round(benignResult.score * 100);
      } else {
        risk = "high";
        category = "phishing";
        description = "This website may be a phishing site or potentially harmful.";
        confidence = Math.round(phishingResult.score * 100);
      }
    } else if (benignResult) {
      // Only benign result present
      const benignConfidence = Math.round(benignResult.score * 100);
      const phishingConfidence = 100 - benignConfidence;
      
      if (benignConfidence >= 70) {
        risk = "low";
        category = "safe";
        description = "This website appears to be safe based on AI analysis.";
        confidence = benignConfidence;
      } else if (phishingConfidence >= 70) {
        risk = "high";
        category = "phishing";
        description = "This website may be a phishing site or potentially harmful.";
        confidence = phishingConfidence;
      } else {
        risk = "medium";
        category = "uncertain";
        description = "The analysis is inconclusive. Exercise caution when visiting this site.";
        confidence = Math.max(benignConfidence, phishingConfidence);
      }
    } else if (phishingResult) {
      // Only phishing result present
      risk = "high";
      category = "phishing";
      description = "This website may be a phishing site or potentially harmful.";
      confidence = Math.round(phishingResult.score * 100);
    }

    return {
      url: apiResponse.url,
      risk,
      category,
      description,
      confidence,
      details: {
        "analyzed by": apiResponse.analyzed_by,
        "benign score": benignResult?.score ? Math.round(benignResult.score * 100) + "%" : "N/A",
        "phishing score": phishingResult?.score ? Math.round(phishingResult.score * 100) + "%" : (benignResult ? Math.round((1 - benignResult.score) * 100) + "% (calculated)" : "N/A"),
        "model labels": apiResponse.result.map(r => `${r.label}: ${Math.round(r.score * 100)}%`).join(", ")
      }
    };
  };

  const analyzeUrlWithBackend = async (
    currentUrlToAnalyze: string,
    currentBackendUrlConfig: string
  ) => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    setLoadingStage("Initializing analysis...");
    setLoadingProgress(10);

    const token = await getAuthToken();
    let finalFetchUrl: string;

    try {
      const tempUrl = new URL(currentBackendUrlConfig);
      finalFetchUrl = `${tempUrl.protocol}//${tempUrl.host}/api/analyze`;
    } catch (e) {
      setError(`Invalid backend URL format: ${currentBackendUrlConfig}`);
      setIsAnalyzing(false);
      setLoadingProgress(0);
      setLoadingStage("");
      return;
    }

    if (!token && finalFetchUrl.endsWith("/api/analyze")) {
      setError("Authentication required. Please log in.");
      setIsAnalyzing(false);
      setLoadingProgress(0);
      setLoadingStage("");
      return;
    }

    setLoadingStage("Connecting to AI backend...");
    setLoadingProgress(30);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      setLoadingStage("Sending request...");
      setLoadingProgress(50);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (token && finalFetchUrl.endsWith("/api/analyze")) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(finalFetchUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ url: currentUrlToAnalyze }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      setLoadingStage("Processing response...");
      setLoadingProgress(80);

      if (!response.ok) {
        const responseBody = await response.text();
        let errorMessage = `Backend Error: ${response.status}.`;
        try {
          const errorJson = JSON.parse(responseBody);
          if (errorJson.error) errorMessage += ` Message: ${errorJson.error}`;
          if (errorJson.msg) errorMessage += ` Message: ${errorJson.msg}`;
        } catch (e) {
          if (responseBody) {
            errorMessage += responseBody
              .trim()
              .toLowerCase()
              .startsWith("<!doctype html>")
              ? ` Details: HTML response received (e.g., a 404 page).`
              : ` Details: ${responseBody.substring(0, 200)}`;
          }
        }
        if (response.status === 0) {
          errorMessage =
            "Network Error or SSL/CORS issue. " +
            `If using localhost, try opening ${
              new URL(finalFetchUrl).origin
            } in a new tab, ` +
            "accept any security warnings, then try again. Check browser console for details.";
        }
        if (response.status === 401)
          errorMessage = "Authentication failed. Please log in again.";
        throw new Error(errorMessage);
      }

      const apiResponse: ApiResponse = await response.json();
      setLoadingProgress(100);
      setLoadingStage("Analysis complete");

      const parsedResult = parseApiResponse(apiResponse);
      setAnalysisResult(parsedResult);
      
      chrome.storage.local.set({ aiBackendUrl: currentBackendUrlConfig });
    } catch (fetchError: any) {
      if (fetchError.name === "AbortError") {
        setError(
          "Connection to AI backend timed out. Is the server running and accessible?"
        );
      } else {
        setError(
          fetchError.message || "An unknown error occurred during analysis."
        );
      }
      throw fetchError;
    }
  };

  const analyzeOffline = (currentUrlToAnalyze: string): AnalysisResult => {
    const urlObj = new URL(currentUrlToAnalyze);
    const domain = urlObj.hostname.toLowerCase();
    let risk = "low";
    let category = "unknown";
    let description =
      "This is a basic offline analysis performed by the extension.";
    let confidence = 60;

    if (
      ["google.com", "github.com", "microsoft.com", "apple.com"].some(
        (trusted) => domain.includes(trusted)
      )
    ) {
      risk = "low";
      category = "trusted";
      description =
        "This appears to be a well-known trusted domain (offline check).";
      confidence = 90;
    }
    if (urlObj.protocol !== "https:") {
      risk = "medium";
      description +=
        " Warning: This site is not using secure HTTPS encryption.";
      confidence = Math.max(40, confidence - 20);
    }
    return {
      url: currentUrlToAnalyze,
      risk,
      category,
      description,
      offlineMode: true,
      confidence,
      details: { domain, protocol: urlObj.protocol },
    };
  };

  const handleAnalysisRequest = async () => {
    if (!url) {
      setError("No URL detected.");
      return;
    }
    if (!backendUrl) {
      setError("Backend URL not configured.");
      return;
    }

    let currentAttemptBackendUrl = backendUrl;
    const isLocal =
      backendUrl.includes("localhost") || backendUrl.includes("127.0.0.1");

    try {
      await analyzeUrlWithBackend(url, currentAttemptBackendUrl);
      setError(null);
    } catch (e: any) {
      const onlineErrorMsg = e.message || "Online analysis failed.";
      setError(onlineErrorMsg);
      console.error("Online analysis error:", e);

      if (isLocal && currentAttemptBackendUrl.startsWith("https://")) {
        setLoadingStage("HTTPS failed, trying HTTP...");
        const httpAttemptUrl = currentAttemptBackendUrl.replace(
          "https://",
          "http://"
        );
        try {
          await analyzeUrlWithBackend(url, httpAttemptUrl);
          setError(null);
          setBackendUrl(httpAttemptUrl);
          chrome.storage.local.set({ aiBackendUrl: httpAttemptUrl });
          return;
        } catch (httpError: any) {
          setError(
            `HTTPS failed: ${onlineErrorMsg}. HTTP attempt failed: ${httpError.message}. Falling back to offline.`
          );
          console.error("HTTP analysis error (after HTTPS fail):", httpError);
        }
      }

      setLoadingStage("Falling back to offline analysis...");
      setLoadingProgress(60);
      await new Promise((resolve) => setTimeout(resolve, 200));
      const offlineResult = analyzeOffline(url);
      setLoadingProgress(100);
      setLoadingStage("Offline analysis complete");
      setAnalysisResult(offlineResult);
      setAnalysisResult((prev) => ({
        ...prev!,
        description: `${
          prev!.description
        } (Online analysis failed: ${onlineErrorMsg.substring(0, 100)}${
          onlineErrorMsg.length > 100 ? "..." : ""
        })`,
      }));
    } finally {
      setIsAnalyzing(false);
      if (error || !analysisResult) {
        setLoadingStage("");
        setLoadingProgress(0);
      }
    }
  };

  const getRiskStyling = (riskLevel?: string) => {
    switch (riskLevel?.toLowerCase()) {
      case "high":
        return {
          badge: "bg-red-500",
          text: "text-red-600 dark:text-red-400",
          bg: "bg-red-50 dark:bg-red-900/40",
          Icon: ShieldAlert,
        };
      case "medium":
        return {
          badge: "bg-yellow-500",
          text: "text-yellow-600 dark:text-yellow-400",
          bg: "bg-yellow-50 dark:bg-yellow-900/40",
          Icon: AlertTriangle,
        };
      case "low":
        return {
          badge: "bg-green-500",
          text: "text-green-600 dark:text-green-400",
          bg: "bg-green-50 dark:bg-green-900/40",
          Icon: ShieldCheck,
        };
      default:
        return {
          badge: "bg-slate-500",
          text: "text-slate-600 dark:text-slate-400",
          bg: "bg-slate-100 dark:bg-slate-700/40",
          Icon: InfoIconLucide,
        };
    }
  };

  const renderResult = () => {
    if (!analysisResult) return null;
    const styling = getRiskStyling(analysisResult.risk);
    const ResultIcon = styling.Icon;

    return (
      <div
        className={`text-sm p-3 rounded-md shadow ${styling.bg}`}
        role="region"
        aria-label="AI Analysis Results"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <ResultIcon size={18} className={`mr-1.5 ${styling.text}`} />
            AI Analysis:
          </p>
          <div className="flex items-center gap-1.5">
            {analysisResult.offlineMode && (
              <span className="badge badge-warning">OFFLINE</span>
            )}
            <span
              className={`px-2 py-0.5 text-xs text-white rounded-sm font-semibold ${styling.badge}`}
            >
              {analysisResult.risk?.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <span>Risk Level:</span>
            <span className={`font-medium text-right ${styling.text}`}>
              {analysisResult.risk?.toUpperCase()}
            </span>
            <span>Category:</span>
            <span className="font-medium text-right">
              {analysisResult.category}
            </span>
            <span>Confidence:</span>
            <div className="flex items-center gap-1 justify-end">
              <div className="w-16 bg-slate-200 dark:bg-slate-600 rounded-full h-1.5">
                <div
                  className={`${styling.badge} h-1.5 rounded-full`}
                  style={{ width: `${analysisResult.confidence}%` }}
                ></div>
              </div>
              <span className="w-8 text-right">
                {analysisResult.confidence}%
              </span>
            </div>
          </div>

          {analysisResult.description && (
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {analysisResult.description}
              </p>
            </div>
          )}

          {analysisResult.details &&
            Object.keys(analysisResult.details).length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
                <details className="text-xs group">
                  <summary className="summary-reset cursor-pointer font-medium list-none group-open:mb-1">
                    Additional Details
                    <span className="float-right transform group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-2 bg-slate-100 dark:bg-black/20 rounded text-slate-600 dark:text-slate-400">
                    <ul className="space-y-0.5">
                      {Object.entries(analysisResult.details).map(
                        ([key, value]) => (
                          <li key={key} className="flex justify-between">
                            <span className="font-medium capitalize">
                              {key}:
                            </span>
                            <span className="text-right max-w-32 break-words">{String(value)}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </details>
              </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="panel">
      <div className="panel-header mb-3">
        <h3 className="panel-title">AI Security Analysis</h3>
      </div>
      <button
        type="button"
        onClick={handleAnalysisRequest}
        disabled={isAnalyzing || !url || !backendUrl}
        className="btn btn-primary w-full btn-sm mb-3"
      >
        {isAnalyzing ? (
          <Loader2 size={16} className="animate-spin mr-1.5" />
        ) : null}
        {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
      </button>
      {error && (
        <div className="alert alert-danger text-xs mb-3">
          <InfoIconLucide className="alert-icon" />
          <div className="alert-content">
            <p>{error}</p>
          </div>
        </div>
      )}
      {isAnalyzing && loadingStage && (
        <Loading
          progress={loadingProgress}
          stage={loadingStage}
          isLoading={isAnalyzing}
        />
      )}
      {!isAnalyzing && analysisResult && renderResult()}
      {!isAnalyzing && !analysisResult && !error && (
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 py-2">
          Click "Analyze with AI" to check the current URL.
        </p>
      )}
    </div>
  );
};