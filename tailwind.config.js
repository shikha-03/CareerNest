/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        navy: "#0F172A",
        cyan: "#06B6D4",
        background: "#F8FAFC",
        surface: "#f8f9ff",
        "surface-container": "#e5eeff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#d3e4fe",
        secondary: "#565e74",
        tertiary: "#005e6e",
        "tertiary-container": "#00788c",
        outline: "#737686",
        "outline-variant": "#c3c6d7",
        "on-primary": "#ffffff",
        "on-background": "#0b1c30",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#434655",
        error: "#ba1a1a"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"]
      },
      spacing: {
        xs: "4px",
        sm: "12px",
        md: "24px",
        lg: "48px",
        xl: "80px",
        "margin-mobile": "16px",
        "margin-desktop": "64px",
        gutter: "24px"
      },
      borderRadius: {
        xl: "0.75rem"
      },
      boxShadow: {
        glass: "0 20px 40px -12px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
