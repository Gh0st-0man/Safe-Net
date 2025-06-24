// src/components/Loading.tsx
import React from "react";
import "../style.css"; // Ensure global styles are imported

interface LoadingProps {
  progress: number;
  stage: string;
  isLoading: boolean; // To conditionally render the component
}

export const Loading: React.FC<LoadingProps> = ({
  progress,
  stage,
  isLoading,
}) => {
  if (!isLoading) return null;

  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg shadow" // Removed -md for consistency if not widely used
      role="status"
      aria-live="polite"
      aria-label={`Loading: ${stage}, ${safeProgress}% complete`}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <span className="font-medium flex items-center">{stage}</span>
          <span className="font-semibold text-teal-600 dark:text-teal-400">
            {safeProgress}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
          <div
            className="bg-teal-500 dark:bg-teal-500 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${safeProgress}%` }} // Dynamic style, keep
            aria-valuenow={safeProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </div>
    </div>
  );
};
