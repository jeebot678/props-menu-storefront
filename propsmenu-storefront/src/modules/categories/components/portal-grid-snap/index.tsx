"use client"

import { useEffect } from "react"

/**
 * Client component that snaps the Portal grid container's dimensions
 * to exact multiples of the tile size so grid lines always align with edges.
 */
const TILE_PX = 220 / 3 // ~73.33px — must match --portal-tile in CSS

export default function PortalGridSnap() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-portal-grid="true"]')
    if (!el) return

    const snap = () => {
      // Clear previous forced size to measure natural dimensions
      el.style.minHeight = ""

      // Wait a frame for layout
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        // Round UP to next tile multiple
        const snappedH = Math.ceil(rect.height / TILE_PX) * TILE_PX
        el.style.minHeight = `${snappedH}px`
      })
    }

    // Snap after initial render + images
    snap()
    const timer = setTimeout(snap, 500)

    // Re-snap on resize
    const observer = new ResizeObserver(() => snap())
    observer.observe(el)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return null
}
