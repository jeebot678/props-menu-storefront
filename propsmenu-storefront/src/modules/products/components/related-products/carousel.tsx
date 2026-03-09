"use client"

import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"
import { useEffect, useRef, useState, useCallback } from "react"

type RelatedProductsCarouselProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

export default function RelatedProductsCarousel({
  products,
  region,
}: RelatedProductsCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(4) // Default to 4 for SSR
  const [isMounted, setIsMounted] = useState(false)

  // Calculate how many items to show based on screen size
  const getVisibleItems = useCallback(() => {
    if (typeof window === "undefined") return 4
    if (window.innerWidth < 640) return 2
    if (window.innerWidth < 768) return 3
    return 4
  }, [])

  // Update visible items after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    setVisibleItems(getVisibleItems())
    
    const handleResize = () => setVisibleItems(getVisibleItems())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [getVisibleItems])

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return
    
    const container = scrollRef.current
    const items = container.children
    if (items.length === 0) return

    const itemWidth = (items[0] as HTMLElement).offsetWidth
    const gap = 24 // gap-x-6 = 24px
    const scrollPosition = index * (itemWidth + gap)
    
    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
  }, [])

  // Auto-rotate every 2.5 seconds (only after mount)
  useEffect(() => {
    if (!isMounted || isPaused || products.length <= visibleItems) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = products.length - visibleItems
        const nextIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1
        scrollToIndex(nextIndex)
        return nextIndex
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [isMounted, isPaused, products.length, visibleItems, scrollToIndex])

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ul 
        ref={scrollRef}
        className="flex gap-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {products.map((product) => (
          <li 
            key={product.id} 
            className="flex-shrink-0 w-[calc(50%-12px)] small:w-[calc(33.333%-16px)] medium:w-[calc(25%-18px)]"
          >
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>

      {/* Navigation dots - only show if more items than visible (render after mount) */}
      {isMounted && products.length > visibleItems && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: products.length - visibleItems + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                scrollToIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-ui-fg-base w-6" 
                  : "bg-ui-fg-subtle hover:bg-ui-fg-muted"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
