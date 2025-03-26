"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // On first load, check if user has preference saved
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      const defaultTheme = prefersDark ? "dark" : "light"
      setTheme(defaultTheme)
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center border border-black rounded-lg px-3 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 mr-2" />
      ) : (
        <Moon className="h-4 w-4 mr-2" />
      )}
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  )
}
