import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // storage unavailable, theme still works for this visit
    }
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle light or dark theme"
    >
      {theme === "dark" ? "☀ Light mode" : "🌙 Dark mode"}
    </button>
  );
}