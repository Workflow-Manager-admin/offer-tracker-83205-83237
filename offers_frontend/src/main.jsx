import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

// PUBLIC_INTERFACE
function ThemeInit() {
  // Optional: could persist theme to localStorage
  React.useEffect(() => {
    const root = document.documentElement;
    if (!window.matchMedia) return;
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute("data-theme", dark ? "dark" : "light");
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <ThemeInit />
    <App />
  </React.StrictMode>
);
