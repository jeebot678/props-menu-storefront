"use client"

import { Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Text, clx } from "@medusajs/ui"
import { Fragment, useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const TopMenuItems = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
]

const TF2Classes = [
  { name: "All Class", href: "/categories/tf2-all-class" },
  { name: "Scout", href: "/categories/tf2-scout" },
  { name: "Soldier", href: "/categories/tf2-soldier" },
  { name: "Pyro", href: "/categories/tf2-pyro" },
  { name: "Demoman", href: "/categories/tf2-demoman" },
  { name: "Heavy", href: "/categories/tf2-heavy" },
  { name: "Engineer", href: "/categories/tf2-engineer" },
  { name: "Medic", href: "/categories/tf2-medic" },
  { name: "Sniper", href: "/categories/tf2-sniper" },
  { name: "Spy", href: "/categories/tf2-spy" },
]

const CatalogItems = [
  { name: "Team Fortress 2", href: "/categories/team-fortress-2", hasSubmenu: true },
  { name: "Portal", href: "/categories/portal" },
  { name: "Garry's Mod", href: "/categories/garrys-mod" },
  { name: "Half-Life", href: "/categories/half-life" },
]

const BottomMenuItems = [
  { name: "About", href: "/about" },
  { name: "Account", href: "/account" },
  { name: "Cart", href: "/cart" },
]

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tf2Expanded, setTf2Expanded] = useState(false)
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tf2EnterTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tf2LeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 8, left: rect.left })
    }
  }, [isOpen])

  const handleMenuMouseEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
      menuTimeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMenuMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      setTf2Expanded(false)
    }, 150)
  }

  const handleTf2MouseEnter = () => {
    // Clear any pending leave timeout
    if (tf2LeaveTimeoutRef.current) {
      clearTimeout(tf2LeaveTimeoutRef.current)
      tf2LeaveTimeoutRef.current = null
    }
    // Add a short delay before showing (200ms) to prevent accidental triggers
    tf2EnterTimeoutRef.current = setTimeout(() => {
      setTf2Expanded(true)
    }, 200)
  }

  const handleTf2MouseLeave = () => {
    // Clear any pending enter timeout
    if (tf2EnterTimeoutRef.current) {
      clearTimeout(tf2EnterTimeoutRef.current)
      tf2EnterTimeoutRef.current = null
    }
    // Delay before hiding
    tf2LeaveTimeoutRef.current = setTimeout(() => {
      setTf2Expanded(false)
    }, 150)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setTf2Expanded(false)
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <div 
          className="h-full flex relative"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <button
            ref={buttonRef}
            data-testid="nav-menu-button"
            className="relative h-full flex items-center gap-x-1 transition-all ease-out duration-200 focus:outline-none hover:text-brand-orange-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-lg font-semibold">Menu</span>
            <svg 
              className={clx(
                "w-3 h-3 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
              viewBox="0 0 12 12" 
              fill="currentColor"
            >
              <path d="M6 8L2 4h8L6 8z" />
            </svg>
          </button>

          {mounted && isOpen && createPortal(
            <div
              className="fixed inset-0 z-[998] bg-black/0 pointer-events-auto"
              onClick={closeMenu}
              data-testid="side-menu-backdrop"
            />,
            document.body
          )}

          {mounted && createPortal(
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
                className="fixed w-[calc(100vw-1rem)] sm:w-[400px] z-[999] text-sm text-white [html[data-mode=light]_&]:text-gray-900"
                style={{ top: dropdownPos.top, left: dropdownPos.left }}
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMenuMouseLeave}
              >
                <div
                  data-testid="nav-menu-popup"
                  className="flex flex-col bg-brand-dark-bg/55 [html[data-mode=light]_&]:bg-white/40 backdrop-blur-xl rounded-lg p-6 shadow-xl border border-white/10 [html[data-mode=light]_&]:border-black/10"
                >
                <div className="flex justify-end mb-4" id="xmark">
                  <button data-testid="close-menu-button" onClick={closeMenu}>
                    <XMark />
                  </button>
                </div>
                <div className="flex flex-col gap-6">
                  <ul className="flex flex-col gap-4 items-start justify-start">
                    {TopMenuItems.map((item) => (
                      <li key={item.name}>
                        <LocalizedClientLink
                          href={item.href}
                          className="text-2xl leading-8 hover:text-brand-orange-500 transition-colors duration-200"
                          onClick={closeMenu}
                          data-testid={`${item.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                        >
                          {item.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                    {/* Catalog indented under Store */}
                    {CatalogItems.map((item) => (
                      <li key={item.name} className="pl-6">
                        {item.hasSubmenu ? (
                          <div
                            onMouseEnter={handleTf2MouseEnter}
                            onMouseLeave={handleTf2MouseLeave}
                          >
                            <LocalizedClientLink
                              href={item.href}
                              className="text-2xl leading-8 hover:text-brand-orange-500 transition-colors duration-200 block"
                             
                              onClick={closeMenu}
                              data-testid={`${item.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                            >
                              {item.name}
                            </LocalizedClientLink>
                            {/* TF2 Classes - inline submenu with fade animation */}
                            <Transition
                              show={tf2Expanded}
                              as="div"
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 max-h-0"
                              enterTo="opacity-100 max-h-[500px]"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 max-h-[500px]"
                              leaveTo="opacity-0 max-h-0"
                              className="overflow-hidden"
                            >
                              <ul className="flex flex-col gap-2 mt-2 pl-4">
                                {TF2Classes.map((classItem) => (
                                  <li key={classItem.name}>
                                    <LocalizedClientLink
                                      href={classItem.href}
                                      className="text-lg text-gray-300 [html[data-mode=light]_&]:text-gray-600 hover:text-brand-orange-500 transition-colors duration-200"
                                      onClick={closeMenu}
                                    >
                                      {classItem.name}
                                    </LocalizedClientLink>
                                  </li>
                                ))}
                              </ul>
                            </Transition>
                          </div>
                        ) : (
                          <LocalizedClientLink
                            href={item.href}
                            className="text-2xl leading-8 hover:text-brand-orange-500 transition-colors duration-200"
                           
                            onClick={closeMenu}
                            data-testid={`${item.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                          >
                            {item.name}
                          </LocalizedClientLink>
                        )}
                      </li>
                    ))}
                    {BottomMenuItems.map((item) => (
                      <li key={item.name}>
                        <LocalizedClientLink
                          href={item.href}
                          className="text-2xl leading-8 hover:text-brand-orange-500 transition-colors duration-200"
                          onClick={closeMenu}
                          data-testid={`${item.name.toLowerCase().replace(/\s+/g, '-')}-link`}
                        >
                          {item.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-y-4 mt-6 pt-6 border-t border-white/15 [html[data-mode=light]_&]:border-black/15">
                  <Text className="txt-compact-small text-gray-500 [html[data-mode=light]_&]:text-gray-400">
                    © {new Date().getFullYear()} Props Menu. All rights reserved.
                  </Text>
                </div>
              </div>
            </div>
          </Transition>,
          document.body
          )}
        </div>
      </div>
    </div>
  )
}

export default SideMenu
