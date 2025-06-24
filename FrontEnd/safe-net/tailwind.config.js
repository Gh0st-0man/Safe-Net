// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}", // Make sure this covers all your .tsx files
    "./src/tabs/advancedcookiemanager.tsx", // If components are outside src, add their paths here, e.g., "./components/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          // Your existing primary color scale - will use this
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // primary-500
          600: "#2563eb", // primary-600
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // You can add more semantic colors if needed
        // e.g., accent, success, warning, danger
        // For now, I'll use Tailwind's default red, green, yellow for these.
      },
      fontFamily: {
        sans: [
          "Inter", // Add Inter as the first choice
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Consider adding if you have many forms for default styling
  ],
};
