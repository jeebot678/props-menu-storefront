import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import ThemeToggle from "@modules/layout/components/theme-toggle"
import ThemeLogo from "@modules/layout/components/theme-logo"
import ReactCountryFlag from "react-country-flag"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b-0 duration-200 bg-brand-dark-bg/55 dark:bg-brand-dark-bg/55 backdrop-blur-xl border-transparent dark:border-transparent [html[data-mode=light]_&]:bg-white/40 [html[data-mode=light]_&]:backdrop-blur-xl [html[data-mode=light]_&]:border-transparent">
        <div className="content-container h-full">
          <nav className="txt-xsmall-plus flex items-center w-full h-full text-small-regular text-brand-dark-text dark:text-brand-dark-text [html[data-mode=light]_&]:text-gray-900">
            {/* Left section - Flag + Menu */}
            <div className="flex items-center gap-x-4 h-full w-[200px]">
              {/* Static US Flag */}
              {/* @ts-ignore */}
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: "24px",
                  height: "18px",
                }}
                title="US"
              />
              <div className="h-full">
                <SideMenu />
              </div>
            </div>

            {/* Center section - Logo (absolute centered) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <LocalizedClientLink
                href="/"
                className="hover:opacity-80 transition-opacity block"
                data-testid="nav-store-link"
              >
                {/* Mobile: smaller logo */}
                <div className="block small:hidden">
                  <ThemeLogo
                    variant="full"
                    width={120}
                    height={28}
                    priority
                  />
                </div>
                {/* Desktop: full size logo */}
                <div className="hidden small:block">
                  <ThemeLogo
                    variant="full"
                    width={200}
                    height={46}
                    priority
                  />
                </div>
              </LocalizedClientLink>
            </div>

            {/* Right section - Account, Cart, Theme Toggle */}
            <div className="flex items-center justify-end gap-x-4 h-full ml-auto">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                <LocalizedClientLink
                  className="hover:text-brand-orange-500 transition-colors"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
              </div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-brand-orange-500 flex gap-2 transition-colors"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}
