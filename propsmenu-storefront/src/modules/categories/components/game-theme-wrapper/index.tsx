"use client"

import { GameTheme } from "@lib/util/game-themes"

type GameThemeWrapperProps = {
  theme: GameTheme
  children: React.ReactNode
}

/**
 * Wraps category page content with game-specific theming.
 * Renders separate dark/light background layers toggled by [data-mode].
 */
const GameThemeWrapper = ({ theme, children }: GameThemeWrapperProps) => {
  const darkFilter = theme.background?.filter ?? "blur(12px) brightness(0.3)"
  const lightFilter = theme.background?.filterLight ?? darkFilter
  const bgSize = theme.background?.size ?? "cover"
  const bgTransform = theme.background?.transform ?? "scale(1.1)"
  const darkImage = theme.backgroundImage
  const lightImage = theme.background?.imageLight ?? darkImage

  const cssVars = {
    "--game-accent": theme.accentColor,
    "--game-accent-hover": theme.accentHover,
    "--game-content-bg": theme.contentBg,
    "--game-surface-bg": theme.surfaceBg,
    "--game-border": theme.borderColor,
    "--game-text": theme.textPrimary,
    "--game-text-secondary": theme.textSecondary,
    "--game-price": theme.priceColor,
    "--game-card-bg": theme.itemCard.bg,
    "--game-card-border": theme.itemCard.border,
    "--game-card-hover-border": theme.itemCard.hoverBorder,
    ...(theme.titleFont ? { "--game-title-font": theme.titleFont } : {}),
    ...(theme.uiFont ? { "--game-ui-font": theme.uiFont } : {}),
    ...(theme.bodyFont ? { "--game-body-font": theme.bodyFont } : {}),
  } as React.CSSProperties

  const baseStyle = {
    backgroundSize: bgSize,
    transform: bgTransform,
  }

  return (
    <div className={`game-theme game-theme--${theme.slug}`} style={cssVars}>
      {/* Dark mode background */}
      <div
        className="game-bg game-bg--dark fixed inset-0 z-0 bg-center bg-no-repeat"
        style={{
          ...baseStyle,
          backgroundImage: `url(${darkImage})`,
          filter: darkFilter,
        }}
      />
      {/* Light mode background */}
      <div
        className="game-bg game-bg--light fixed inset-0 z-0 bg-center bg-no-repeat"
        style={{
          ...baseStyle,
          backgroundImage: `url(${lightImage})`,
          filter: lightFilter,
        }}
      />

      {/* Content layer above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default GameThemeWrapper
