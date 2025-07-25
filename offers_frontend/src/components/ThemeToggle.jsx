import React from "react";

// PUBLIC_INTERFACE
export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle dark/light theme">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
