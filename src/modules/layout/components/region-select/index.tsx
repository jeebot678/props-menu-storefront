"use client"

import { Transition } from "@headlessui/react"
import { Fragment, useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import ReactCountryFlag from "react-country-flag"
import { useParams, usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type RegionSelectProps = {
  regions: HttpTypes.StoreRegion[] | null
  currentRegion?: HttpTypes.StoreRegion
}

const RegionSelect = ({ regions, currentRegion }: RegionSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const params = useParams()
  
  const currentCountryCode = (params.countryCode as string) || "us"
  const flagRef = useRef<HTMLButtonElement>(null)
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 })
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => { setPortalReady(true) }, [])

  const updateDropPos = useCallback(() => {
    if (flagRef.current) {
      const rect = flagRef.current.getBoundingClientRect()
      setDropPos({ top: rect.bottom + 8, left: rect.left })
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    updateDropPos()
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  const handleRegionChange = (countryCode: string) => {
    // Get the path without the country code prefix
    const pathParts = pathname.split("/")
    pathParts[1] = countryCode
    const newPath = pathParts.join("/")
    
    // Navigate to the new region
    window.location.href = newPath
  }

  // Only show US and UK
  const ALLOWED_COUNTRIES = ["us", "gb"]
  
  // Build list of allowed countries from all regions
  const countries: { code: string; name: string; regionId: string }[] = []
  regions?.forEach((region) => {
    region.countries?.forEach((country) => {
      if (country.iso_2 && ALLOWED_COUNTRIES.includes(country.iso_2.toLowerCase())) {
        countries.push({
          code: country.iso_2,
          name: country.display_name || country.name || country.iso_2.toUpperCase(),
          regionId: region.id,
        })
      }
    })
  })

  // Sort: US first, then UK
  countries.sort((a, b) => {
    if (a.code.toLowerCase() === "us") return -1
    if (b.code.toLowerCase() === "us") return 1
    return a.name.localeCompare(b.name)
  })

  // Get current country info
  const currentCountry = countries.find(c => c.code === currentCountryCode) || {
    code: "us",
    name: "United States",
    regionId: "",
  }

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={flagRef}
        className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
        onClick={() => { updateDropPos(); setIsOpen(!isOpen) }}
        aria-label="Select region"
      >
        {/* @ts-ignore */}
        <ReactCountryFlag
          svg
          countryCode={currentCountry.code.toUpperCase()}
          style={{
            width: "24px",
            height: "18px",
          }}
          title={currentCountry.name}
        />
      </button>

      {portalReady && createPortal(
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-[-8px]"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[-8px]"
      >
        <div 
          className="fixed bg-brand-dark-bg/60 [html[data-mode=light]_&]:bg-white/45 backdrop-blur-2xl rounded-lg p-3 shadow-xl min-w-[200px] z-[999] max-h-[300px] overflow-y-auto border border-white/10 [html[data-mode=light]_&]:border-black/10"
          style={{ top: dropPos.top, left: dropPos.left }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-xs text-gray-400 mb-2 px-2">Select Region</div>
          <ul className="flex flex-col gap-1">
            {countries.map((country) => (
              <li key={country.code}>
                <button
                  onClick={() => handleRegionChange(country.code)}
                  className={clx(
                    "flex items-center gap-3 w-full px-2 py-2 rounded-md transition-colors text-left",
                    country.code === currentCountryCode
                      ? "bg-brand-orange-500/20 text-brand-orange-400"
                      : "text-white hover:bg-white/10"
                  )}
                >
                  {/* @ts-ignore */}
                  <ReactCountryFlag
                    svg
                    countryCode={country.code.toUpperCase()}
                    style={{
                      width: "20px",
                      height: "15px",
                    }}
                  />
                  <span className="text-sm">{country.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Transition>,
      document.body
      )}
    </div>
  )
}

export default RegionSelect
