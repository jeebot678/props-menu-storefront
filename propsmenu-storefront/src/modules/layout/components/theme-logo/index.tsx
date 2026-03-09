"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type ThemeLogoProps = {
  variant: "full" | "stacked" | "icon"
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

const logoSizes = {
  full: { width: 300, height: 70 },
  stacked: { width: 200, height: 150 },
  icon: { width: 100, height: 100 },
}

const ThemeLogo = ({ 
  variant, 
  className = "", 
  width, 
  height, 
  priority = false 
}: ThemeLogoProps) => {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check initial theme
    const checkTheme = () => {
      const html = document.documentElement
      const mode = html.getAttribute("data-mode")
      setIsDark(mode !== "light")
    }
    
    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-mode") {
          checkTheme()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    // Also listen for storage changes (in case theme is changed in another tab)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        checkTheme()
      }
    }
    window.addEventListener("storage", handleStorage)

    return () => {
      observer.disconnect()
      window.removeEventListener("storage", handleStorage)
    }
  }, [])

  const defaults = logoSizes[variant]
  const w = width || defaults.width
  const h = height || defaults.height

  // Light mode = dark logo, Dark mode = light logo
  const lightLogo = `/logos/logo-${variant}.png` // Light text for dark backgrounds
  const darkLogo = `/logos/logo-${variant}-dark.png` // Dark text for light backgrounds

  // Prevent hydration mismatch by showing light logo initially (dark mode default)
  if (!mounted) {
    return (
      <Image
        src={lightLogo}
        alt="Props Menu"
        width={w}
        height={h}
        className={className}
        priority={priority}
        quality={75}
        sizes="(max-width: 768px) 150px, 300px"
      />
    )
  }

  return (
    <div className={`relative inline-flex items-start justify-start ${className}`} style={{ width: w, height: 'auto' }}>
      {/* Light logo (for dark mode) */}
      <Image
        src={lightLogo}
        alt="Props Menu"
        width={w}
        height={h}
        className={`
          transition-opacity duration-300 ease-in-out w-full h-auto
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
        style={{ position: isDark ? 'relative' : 'absolute', top: 0, left: 0, right: 'auto' }}
        priority={priority}
        quality={75}
        sizes="(max-width: 768px) 150px, 300px"
      />
      {/* Dark logo (for light mode) */}
      <Image
        src={darkLogo}
        alt="Props Menu"
        width={w}
        height={h}
        className={`
          transition-opacity duration-300 ease-in-out w-full h-auto
          ${!isDark ? "opacity-100" : "opacity-0"}
        `}
        style={{ position: !isDark ? 'relative' : 'absolute', top: 0, left: 0, right: 'auto' }}
        priority={priority}
        quality={75}
        sizes="(max-width: 768px) 150px, 300px"
      />
    </div>
  )
}

export default ThemeLogo
