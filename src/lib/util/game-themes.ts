/**
 * Game-specific theme configurations.
 * Each game has its own visual identity applied to category pages.
 */

export type GameTheme = {
  /** CSS class prefix for scoped styling */
  slug: string
  /** Override display name for the category title */
  displayName?: string
  /** Background image path (blurred behind content) */
  backgroundImage: string
  /** Primary accent color */
  accentColor: string
  /** Secondary color for hover states etc. */
  accentHover: string
  /** Background color for the content body */
  contentBg: string
  /** Elevated surface color (cards, panels) */
  surfaceBg: string
  /** Border color */
  borderColor: string
  /** Primary text color */
  textPrimary: string
  /** Secondary/muted text color */
  textSecondary: string
  /** Price text color */
  priceColor: string
  /** Font family override for titles */
  titleFont?: string
  /** Font family for UI headings (section titles, buttons) */
  uiFont?: string
  /** Font family for body/smaller text */
  bodyFont?: string
  /** Override color for game title (used on store hero banners) */
  titleColor?: string
  /** Background image display options */
  background?: {
    /** CSS filter for dark mode (default: "blur(12px) brightness(0.3)") */
    filter?: string
    /** CSS filter for light mode (default: same as filter) */
    filterLight?: string
    /** CSS background-size (default: "cover") */
    size?: string
    /** CSS transform (default: "scale(1.1)") */
    transform?: string
    /** Optional separate background image for light mode */
    imageLight?: string
  }
  /** Item card specific styles */
  itemCard: {
    bg: string
    border: string
    hoverBorder: string
    shadow?: string
  }
}

const GAME_THEMES: Record<string, GameTheme> = {
  "team-fortress-2": {
    slug: "tf2",
    backgroundImage: "/themes/tf2-bg-new.jpg",
    accentColor: "#CF6A42",      // TF2 burnt orange
    accentHover: "#E8834A",
    contentBg: "#24201B",        // Dark charcoal-brown
    surfaceBg: "#2A2925",        // Darker charcoal (hover/selected)
    borderColor: "#8A8070",      // Light beige border
    textPrimary: "#F0E8DA",      // Light beige text
    textSecondary: "#908C82",    // Muted olive text
    priceColor: "#FFD700",       // TF2 unique item gold
    titleFont: "'Compacta', 'TF2', sans-serif",
    uiFont: "'TF2 Build', sans-serif",
    bodyFont: "'TF2', sans-serif",
    titleColor: "#F3E8D6",          // Warm cream (matches section titles)
    background: {
      filter: "brightness(0.55)",
      filterLight: "none",
      size: "100% auto",
      transform: "none",
    },
    itemCard: {
      bg: "#3C3B37",             // Same as content bg
      border: "#8A8070",         // Light beige border
      hoverBorder: "#CF6A42",
      shadow: "none",
    },
  },
  "garrys-mod": {
    slug: "gmod",
    displayName: "Spawnlist",
    backgroundImage: "/themes/gmod-bg.jpg",
    accentColor: "#48A4FF",      // Gmod blue
    accentHover: "#2BA5FF",
    contentBg: "rgba(150, 153, 157, 0.15)",  // #96999d at 15%
    surfaceBg: "rgba(130, 133, 137, 0.6)",
    borderColor: "#6B6E72",
    textPrimary: "#FFFFFF",
    textSecondary: "#C8CACD",
    priceColor: "#FFFFFF",
    titleFont: "'Coolvetica', sans-serif",
    uiFont: "'Coolvetica', sans-serif",
    bodyFont: "'Coolvetica', sans-serif",
    titleColor: "#48A4FF",          // GMod blue
    background: {
      filter: "blur(12px) brightness(0.6)",
      filterLight: "blur(12px) brightness(1.0)",
    },
    itemCard: {
      bg: "rgba(150, 153, 157, 0.5)",
      border: "rgba(117, 124, 125, 0.45)",
      hoverBorder: "#48A4FF",
      shadow: "none",
    },
  },
  "portal": {
    slug: "portal",
    backgroundImage: "/themes/portal-bg.jpg",
    accentColor: "#00A2FF",      // Portal blue
    accentHover: "#FF8C00",      // Portal orange
    contentBg: "#FFFFFF",        // Pure white
    surfaceBg: "#F8F8F8",        // Very light gray
    borderColor: "#E0E0E0",      // Light gray borders
    textPrimary: "#3E3E3E",      // Dark gray text
    textSecondary: "#756B5E",    // Muted gray text
    priceColor: "#5A5A5A",       // Medium gray for prices
    background: {
      filter: "brightness(0.55)",
      filterLight: "brightness(0.85)",
      size: "cover",
      transform: "none",
    },
    itemCard: {
      bg: "#FFFFFF",             // White cards
      border: "#D0D0D0",         // Thin gray border
      hoverBorder: "#00A2FF",    // Blue/orange alternating in CSS
      shadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    },
  },
  "half-life": {
    slug: "halflife",
    backgroundImage: "/themes/halflife-bg.jpg",
    accentColor: "#D4A840",      // Source menu gold
    accentHover: "#E8C850",      // Bright gold hover
    contentBg: "rgba(30, 22, 8, 0.88)",   // Dark amber, semi-transparent
    surfaceBg: "rgba(40, 30, 12, 0.92)",   // Slightly lighter amber
    borderColor: "#B89830",      // Gold border
    textPrimary: "#D4AA40",      // Golden text
    textSecondary: "#9A8030",    // Muted gold
    priceColor: "#E8C850",       // Bright gold for prices
    titleFont: "'Headhumper', 'Barlow Condensed', sans-serif",
    uiFont: "'Barlow Condensed', sans-serif",
    bodyFont: "'Barlow Condensed', sans-serif",
    titleColor: "#F0C850",          // Bright Half-Life gold
    background: {
      filter: "brightness(0.5) saturate(0.7)",
      filterLight: "brightness(0.85) saturate(0.8)",
      size: "cover",
      transform: "none",
    },
    itemCard: {
      bg: "rgba(35, 26, 10, 0.9)",
      border: "#8A7020",
      hoverBorder: "#D4A840",
      shadow: "0 0 8px rgba(180, 152, 48, 0.15)",
    },
  },
}

/**
 * Get the game theme for a category handle.
 * Checks both the handle itself and its parent category handle.
 */
export function getGameTheme(categoryHandle: string): GameTheme | null {
  // Direct match
  if (GAME_THEMES[categoryHandle]) {
    return GAME_THEMES[categoryHandle]
  }

  // Check if it's a subcategory (e.g., "tf2-scout" → parent "team-fortress-2")
  for (const [key, theme] of Object.entries(GAME_THEMES)) {
    const prefix = theme.slug + "-"
    if (categoryHandle.startsWith(prefix)) {
      return theme
    }
  }

  return null
}

/**
 * Get the game theme by checking a category and its parent.
 */
export function getGameThemeForCategory(
  category: { handle: string; parent_category?: { handle: string } | null }
): GameTheme | null {
  // Check this category
  const theme = getGameTheme(category.handle)
  if (theme) return theme

  // Check parent
  if (category.parent_category) {
    return getGameTheme(category.parent_category.handle)
  }

  return null
}

/**
 * Get game theme for a product by checking its categories.
 */
export function getGameThemeForProduct(
  product: { categories?: Array<{ handle: string; parent_category?: { handle: string } | null }> }
): GameTheme | null {
  if (!product.categories) return null
  for (const cat of product.categories) {
    const theme = getGameThemeForCategory(cat)
    if (theme) return theme
  }
  return null
}

export default GAME_THEMES
