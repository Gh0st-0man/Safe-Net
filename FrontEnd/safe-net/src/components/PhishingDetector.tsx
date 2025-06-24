// src/components/PhishingDetector.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle as AlertIconLucide, // Keep alias for clarity
  XCircle,
  CheckCircle2,
  Frown, // For no URL state
} from "lucide-react";
import "../style.css";

interface PhishingDetectorProps {
  url: string;
}

interface PhishingResultUI {
  level: string;
  colorClasses: string; // Tailwind classes for text color
  Icon: React.ElementType;
  bgColorClasses: string; // Tailwind classes for background
  borderColorClasses: string; // Tailwind classes for border
}

export const PhishingDetector: React.FC<PhishingDetectorProps> = ({ url }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [phishingScore, setPhishingScore] = useState<number | null>(null);
  const [phishingSignals, setPhishingSignals] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkForPhishing = useCallback(() => {
    if (!url) {
      setError("No URL to analyze for phishing signals.");
      setPhishingScore(null);
      setPhishingSignals([]);
      return;
    }

    setIsChecking(true);
    setError(null);
    setPhishingSignals([]);
    setPhishingScore(null);

    // Simulate async operation for UX
    setTimeout(() => {
      try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.toLowerCase();
        const path = urlObj.pathname.toLowerCase();
        const signals: string[] = [];
        let score = 0;

        // Heuristics (simplified for brevity, can be expanded)
        const suspiciousKeywords = [
          "login",
          "signin",
          "verify",
          "account",
          "update",
          "secure",
          "support",
        ];
        if (
          suspiciousKeywords.some(
            (kw) => domain.includes(kw) || path.includes(kw)
          )
        ) {
          signals.push("URL contains keywords often used in phishing.");
          score += 15;
        }
        if ((domain.match(/\./g) || []).length > 3) {
          signals.push("Excessive subdomains detected.");
          score += 10;
        }
        if (domain.length > 25) {
          signals.push("Domain name is unusually long.");
          score += 10;
        }
        const popularBrands = [
          "paypal",
          "apple",
          "microsoft",
          "amazon",
          "google",
          "facebook",
        ];
        popularBrands.forEach((brand) => {
          if (
            domain.includes(brand) &&
            !domain.endsWith(`.${brand}.com`) &&
            !domain.endsWith(`.${brand}.net`)
          ) {
            signals.push(`Potential impersonation of "${brand}".`);
            score += 25;
          }
        });
        if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(domain)) {
          signals.push("URL uses an IP address instead of a domain name.");
          score += 30;
        }
        if (urlObj.protocol !== "https:") {
          signals.push("Site does not use a secure HTTPS connection.");
          score += 20;
        }
        if ((domain.match(/-/g) || []).length > 1) {
          signals.push("Domain contains multiple hyphens.");
          score += 5;
        }

        setPhishingScore(Math.min(score, 100)); // Cap score at 100
        setPhishingSignals(signals);
      } catch (err) {
        setError(
          `Error analyzing URL: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setPhishingScore(null);
        setPhishingSignals([]);
      } finally {
        setIsChecking(false);
      }
    }, 500); // Simulate delay
  }, [url]);

  // Trigger check when URL changes and is valid
  useEffect(() => {
    if (url) {
      try {
        new URL(url); // Validate URL before auto-checking
        checkForPhishing();
      } catch (e) {
        setError("Invalid URL provided for analysis.");
        setPhishingScore(null);
        setPhishingSignals([]);
      }
    } else {
      setError("No URL provided for analysis.");
      setPhishingScore(null);
      setPhishingSignals([]);
    }
  }, [url, checkForPhishing]);

  const getRiskDetails = (score: number | null): PhishingResultUI => {
    if (score === null)
      return {
        level: "Unknown",
        colorClasses: "text-slate-500 dark:text-slate-400",
        Icon: AlertIconLucide,
        bgColorClasses: "bg-slate-100 dark:bg-slate-700/60",
        borderColorClasses: "border-slate-300 dark:border-slate-600",
      };
    if (score >= 60)
      return {
        level: "High Risk",
        colorClasses: "text-red-600 dark:text-red-400",
        Icon: ShieldAlert,
        bgColorClasses: "bg-red-50 dark:bg-red-900/60",
        borderColorClasses: "border-red-400 dark:border-red-600",
      };
    if (score >= 30)
      return {
        level: "Medium Risk",
        colorClasses: "text-yellow-600 dark:text-yellow-400",
        Icon: AlertIconLucide,
        bgColorClasses: "bg-yellow-50 dark:bg-yellow-900/60",
        borderColorClasses: "border-yellow-400 dark:border-yellow-600",
      };
    if (score >= 1)
      return {
        level: "Low Risk",
        colorClasses: "text-blue-600 dark:text-blue-400",
        Icon: ShieldCheck,
        bgColorClasses: "bg-blue-50 dark:bg-blue-900/60",
        borderColorClasses: "border-blue-400 dark:border-blue-600",
      }; // Using blue for low risk
    return {
      level: "No Specific Threats",
      colorClasses: "text-green-600 dark:text-green-400",
      Icon: ShieldCheck,
      bgColorClasses: "bg-green-50 dark:bg-green-900/60",
      borderColorClasses: "border-green-400 dark:border-green-600",
    };
  };

  const risk = getRiskDetails(phishingScore);
  const RiskPresentationIcon = risk.Icon;

  return (
    <div className="panel">
      <div className="panel-header">
        <h3 className="panel-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal-500 dark:text-teal-400"
          >
            <path d="M21.73 18.24c-1.34-1.08-3.37-2.97-3.37-2.97-.47-.48-1.1-.76-1.73-.76H8c-.55 0-1.07.21-1.46.59L2 20M22 16l-4-4M11 9l-1 1M16 4l-1 1M9 17v-4M15 17v-4M4.53 12.97l-1.06-1.06M19.47 12.97l1.06-1.06" />
          </svg>
          Local Phishing Check
        </h3>
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={checkForPhishing}
          disabled={isChecking || !url}
          className="btn btn-secondary w-full btn-sm" // Using .btn classes
        >
          {isChecking ? (
            <Loader2 size={16} className="animate-spin mr-1.5" />
          ) : (
            <Search size={16} className="mr-1.5" />
          )}
          <span>{isChecking ? "Analyzing Locally..." : "Re-Scan Local"}</span>
        </button>

        {error && (
          <div className="alert alert-danger text-xs" role="alert">
            <XCircle className="alert-icon" />
            <div className="alert-content">
              <p>{error}</p>
            </div>
          </div>
        )}

        {phishingScore !== null && !error && (
          <div
            className={`p-3.5 rounded-lg shadow border ${risk.bgColorClasses} ${risk.borderColorClasses}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <RiskPresentationIcon size={22} className={risk.colorClasses} />
                <span
                  className={`text-base font-semibold ${risk.colorClasses}`}
                >
                  {risk.level}
                </span>
              </div>
              <span className={`text-xl font-bold ${risk.colorClasses}`}>
                {phishingScore}/100
              </span>
            </div>

            {phishingSignals.length > 0 ? (
              <div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Potential Signals:
                </p>
                <ul
                  className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400"
                  role="list"
                >
                  {phishingSignals.map((signal, index) => (
                    <li
                      key={index}
                      role="listitem"
                      className="flex items-start gap-1.5"
                    >
                      <AlertIconLucide className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 size={18} />
                <p className="text-xs font-medium">
                  No specific local phishing signals detected.
                </p>
              </div>
            )}
          </div>
        )}
        {phishingScore === null && !error && !isChecking && (
          <div className="text-center text-xs text-slate-500 dark:text-slate-400 py-3 flex flex-col items-center gap-2">
            <Frown size={24} />
            <span>
              {url
                ? "Scan to see local heuristic results."
                : "No URL to analyze."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
