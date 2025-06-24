// src/content.tsx
import cssText from "data-text:~style.css";
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo";
import { Fingerprint } from "lucide-react"; // Icon for SafeNet
import React from "react";

// Configuration for the content script
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"], // Injects into all HTTP/HTTPS pages
  // all_frames: true, // Uncomment if you need this button in iframes as well
};

// Function to get and process styles for the Shadow DOM
// This ensures that styles from the main page don't interfere with your UI
// and your UI's styles don't leak to the page.
export const getStyle: PlasmoGetStyle = () => {
  const baseFontSize = 16; // Standard base font size for rem to px conversion

  // Replace :root and html selectors with :host for proper Shadow DOM scoping
  // :host(plasmo-csui) targets the root of the shadow DOM where Plasmo mounts the UI
  let updatedCssText = cssText
    .replaceAll(":root", ":host(plasmo-csui)")
    .replaceAll("html {", ":host(plasmo-csui) {");

  // Convert rem units to px. In Shadow DOM, rem units can be unpredictable
  // as they might not inherit the root font-size from the main document as expected.
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
  const handleOpenPopup = () => {
    // Send a message to the background script.
    // Your background script must have a listener for this message.
    // e.g., chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //         if (request.action === "openSafeNetUI") { /* Open your popup/UI */ }
    //       });
    chrome.runtime.sendMessage({ action: "openSafeNetUI" });
  };

  return (
    // Container for the button, positioned fixed at bottom-right with a high z-index
    // The `plasmo-` prefixes are typically used by Plasmo for Tailwind CSS in Shadow DOM
    // to avoid class name conflicts. Ensure your Tailwind setup supports this.
    <div className="plasmo-z-[2147483647] plasmo-fixed plasmo-bottom-8 plasmo-right-8">
      <button
        onClick={handleOpenPopup}
        className="plasmo-bg-teal-600 plasmo-hover:bg-teal-700 plasmo-text-white plasmo-p-3 plasmo-rounded-full plasmo-shadow-xl plasmo-flex plasmo-items-center plasmo-justify-center plasmo-transition-all hover:plasmo-scale-105 focus:plasmo-outline-none focus:plasmo-ring-2 focus:plasmo-ring-teal-400 focus:plasmo-ring-opacity-75"
        title="Open SafeNet Analyzer" // Tooltip for the button
        aria-label="Open SafeNet Analyzer" // Accessibility label
      >
        <Fingerprint size={24} />
      </button>
    </div>
  );
};

export default PlasmoOverlay;
