"use client"

import { GameTheme } from "@lib/util/game-themes"

type GameSidebarProps = {
  theme: GameTheme
  children: React.ReactNode
}

/**
 * Themed sidebar container for game category pages.
 * Always readable — uses a semi-opaque surface with the game's accent/border colors.
 */
const GameSidebar = ({ theme, children }: GameSidebarProps) => {
  return (
    <div
      className="game-sidebar"
      data-testid="game-sidebar"
      data-theme={theme.slug}
    >
      {children}
    </div>
  )
}

export default GameSidebar
