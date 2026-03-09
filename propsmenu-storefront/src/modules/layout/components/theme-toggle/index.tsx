"use client"

import { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check initial theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark || true
    setIsDark(initialDark)
    updateTheme(initialDark)
  }, [])

  const updateTheme = (dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add("dark")
      html.setAttribute("data-mode", "dark")
    } else {
      html.classList.remove("dark")
      html.setAttribute("data-mode", "light")
    }
    localStorage.setItem("theme", dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    updateTheme(newDark)
  }

  // Prevent hydration mismatch by rendering consistent placeholder until mounted
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg hover:bg-brand-dark-elevated transition-colors"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-brand-dark-elevated transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        // Sun icon for light mode (solid)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-brand-orange-400"
        >
          <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm8-8a1 1 0 011 1 1 1 0 01-1 1h-1a1 1 0 110-2h1zM4 11a1 1 0 110 2H3a1 1 0 110-2h1zm15.07-6.07a1 1 0 010 1.41l-.71.71a1 1 0 11-1.41-1.41l.71-.71a1 1 0 011.41 0zM7.05 17.66a1 1 0 010 1.41l-.71.71a1 1 0 11-1.41-1.41l.71-.71a1 1 0 011.41 0zm12.02.71a1 1 0 01-1.41 0l-.71-.71a1 1 0 111.41-1.41l.71.71a1 1 0 010 1.41zM6.34 7.05a1 1 0 01-1.41 0l-.71-.71a1 1 0 011.41-1.41l.71.71a1 1 0 010 1.41zM12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      ) : (
        // Moon icon for dark mode (solid)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-brand-purple-400"
        >
          <path d="M21.752 15.002A9.718 9.718 0 0112.478 3.007a9 9 0 109.274 11.995z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
