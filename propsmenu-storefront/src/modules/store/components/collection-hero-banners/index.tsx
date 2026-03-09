import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import GAME_THEMES from "@lib/util/game-themes"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CollectionHeroBannersProps = {
  collections: HttpTypes.StoreProductCategory[]
  countryCode?: string
}

const promoData: Record<string, { tagline: string; cta: string }> = {
  "team-fortress-2": {
    tagline: "Weapons, cosmetics & figurines from the iconic class-based shooter",
    cta: "Browse Arsenal",
  },
  "portal": {
    tagline: "Test chamber essentials & Aperture Science collectibles",
    cta: "Enter Test Chamber",
  },
  "half-life": {
    tagline: "Black Mesa artifacts & Freeman's iconic gear",
    cta: "Coming Soon",
  },
  "garrys-mod": {
    tagline: "Source Engine classics & sandbox favorites",
    cta: "Open Spawnlist",
  },
}

const bannerOrder = ["team-fortress-2", "portal", "garrys-mod", "half-life"]

const CollectionHeroBanners = ({ collections }: CollectionHeroBannersProps) => {
  if (!collections || collections.length === 0) return null

  const sortedCollections = [...collections].sort((a, b) => {
    const aIndex = bannerOrder.indexOf(a.handle)
    const bIndex = bannerOrder.indexOf(b.handle)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  return (
    <div className="content-container py-12">
      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
        {sortedCollections.map((collection) => {
          const theme = GAME_THEMES[collection.handle]
          const promo = promoData[collection.handle]
          const bgImage = theme?.backgroundImage || "/themes/tf2-bg-new.jpg"
          const titleFont = theme?.titleFont || "'Bebas Neue', sans-serif"
          const titleColor = theme?.titleColor || "#FFFFFF"
          const accent = theme?.accentColor || "#e04d15"
          const isComingSoon = collection.handle === "half-life"
          const displayName = collection.handle === "half-life" ? "HALF+LIFE" : collection.name

          return (
            <LocalizedClientLink
              key={collection.id}
              href={isComingSoon ? "#" : `/categories/${collection.handle}`}
              className="group relative overflow-hidden rounded-2xl aspect-[16/5] transition-transform duration-300 hover:scale-[1.01]"
            >
              <Image
                src={bgImage}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              {/* Dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />

              {/* Glass edge highlights */}
              <div className="absolute inset-0 z-10 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: `inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(255,255,255,0.05), inset 1px 0 1px rgba(255,255,255,0.08), inset -1px 0 1px rgba(255,255,255,0.08)`,
                }}
              />
              {/* Top shine reflection */}
              <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/[0.08] to-transparent z-10 rounded-t-2xl pointer-events-none" />
              {/* Bottom edge darkening */}
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/20 to-transparent z-10 rounded-b-2xl pointer-events-none" />

              {/* Hover accent tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
                style={{ backgroundColor: `${accent}10` }}
              />
              {/* Border ring */}
              <div
                className="absolute inset-0 rounded-2xl z-20 pointer-events-none transition-all duration-300"
                style={{
                  boxShadow: `inset 0 0 0 1.5px rgba(255,255,255,0.12)`,
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  boxShadow: `inset 0 0 0 2px ${accent}66, 0 0 15px ${accent}15`,
                }}
              />

              <div className="relative z-30 h-full flex flex-col justify-center p-8 md:p-12">
                <h2
                  className={`leading-tight drop-shadow-lg mb-2 ${collection.handle === "half-life" ? "text-3xl md:text-4xl lg:text-5xl" : "text-4xl md:text-5xl lg:text-6xl"}`}
                  style={{
                    fontFamily: titleFont,
                    color: titleColor,
                    ...(collection.handle === "half-life" ? { letterSpacing: "-0.02em" } : {}),
                  }}
                >
                  {displayName}
                </h2>
                {promo?.tagline && (
                  <p className="text-white/80 text-base md:text-lg max-w-md mb-4">
                    {promo.tagline}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  {promo?.cta || "Browse Collection"}
                  {!isComingSoon && <span className="text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>}
                </span>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}

export default CollectionHeroBanners
