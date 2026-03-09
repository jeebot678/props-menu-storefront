import { listCategories } from "@lib/data/categories"
import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ThemeLogo from "@modules/layout/components/theme-logo"

export default async function Footer() {
  const categories = await listCategories()
  
  // Get only parent categories (games), sorted in display order
  const categoryOrder = ["team-fortress-2", "portal", "garrys-mod", "half-life"]
  const parentCategories = categories
    .filter(c => !c.parent_category_id)
    .sort((a, b) => {
      const aIdx = categoryOrder.indexOf(a.handle)
      const bIdx = categoryOrder.indexOf(b.handle)
      if (aIdx === -1) return 1
      if (bIdx === -1) return -1
      return aIdx - bIdx
    })

  return (
    <footer className="border-t-0 border-transparent w-full bg-brand-dark-bg/55 backdrop-blur-xl [html[data-mode=light]_&]:bg-white/40 [html[data-mode=light]_&]:backdrop-blur-xl [html[data-mode=light]_&]:border-transparent relative z-50">
      <div className="w-full">
        <div className="content-container flex flex-col w-full">
          <div className="flex flex-col lg:flex-row items-start justify-between py-8 lg:py-10 gap-8 lg:gap-8">
            {/* Logo Section - Much Larger */}
            <div className="flex-shrink-0">
              <LocalizedClientLink
                href="/"
                className="hover:opacity-80 transition-opacity block"
              >
                <ThemeLogo
                  variant="stacked"
                  className="h-14 w-auto"
                  width={140}
                />
              </LocalizedClientLink>
              <Text className="mt-4 text-brand-dark-text-muted txt-small max-w-[200px] [html[data-mode=light]_&]:text-gray-500">
                Unofficial fan-made props from your favorite Valve games.
              </Text>
            </div>

            {/* Footer Columns - All in One Row */}
            <div className="flex flex-wrap lg:flex-nowrap gap-12 lg:gap-16">
              {/* Catalog Column - Single Column */}
              {parentCategories && parentCategories.length > 0 && (
                <div className="flex flex-col gap-y-3">
                  <span className="txt-small-plus text-brand-dark-text-primary font-semibold [html[data-mode=light]_&]:text-gray-900">
                    Catalog
                  </span>
                  <ul className="flex flex-col gap-y-2 text-brand-dark-text-secondary txt-small [html[data-mode=light]_&]:text-gray-600">
                    {parentCategories?.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-brand-orange-500 transition-colors"
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shop Column */}
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-brand-dark-text-primary font-semibold [html[data-mode=light]_&]:text-gray-900">
                  Shop
                </span>
                <ul className="flex flex-col gap-y-2 text-brand-dark-text-secondary txt-small [html[data-mode=light]_&]:text-gray-600">
                  <li>
                    <LocalizedClientLink
                      href="/store"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      All Products
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/account"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      My Account
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/cart"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      Cart
                    </LocalizedClientLink>
                  </li>
                </ul>
              </div>

              {/* Support Column */}
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-brand-dark-text-primary font-semibold [html[data-mode=light]_&]:text-gray-900">
                  Support
                </span>
                <ul className="flex flex-col gap-y-2 text-brand-dark-text-secondary txt-small [html[data-mode=light]_&]:text-gray-600">
                  <li>
                    <LocalizedClientLink
                      href="/contact"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      Contact Us
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/shipping"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      Shipping Info
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/returns"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      Returns & Refunds
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/faq"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      FAQ
                    </LocalizedClientLink>
                  </li>
                </ul>
              </div>

              {/* Company Column */}
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-brand-dark-text-primary font-semibold [html[data-mode=light]_&]:text-gray-900">
                  Company
                </span>
                <ul className="flex flex-col gap-y-2 text-brand-dark-text-secondary txt-small [html[data-mode=light]_&]:text-gray-600">
                  <li>
                    <LocalizedClientLink
                      href="/about"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      About Us
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/privacy"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      Privacy Policy
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/terms"
                      className="hover:text-brand-orange-500 transition-colors"
                    >
                      Terms of Service
                    </LocalizedClientLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex w-full py-6 justify-between items-center border-t border-brand-dark-border [html[data-mode=light]_&]:border-gray-400">
            <Text className="txt-compact-small text-brand-dark-text-muted/60 [html[data-mode=light]_&]:text-gray-500">
              Based in Atlanta, Georgia 🍑
            </Text>
            <Text className="txt-compact-small text-brand-dark-text-muted/60 [html[data-mode=light]_&]:text-gray-500">
              © {new Date().getFullYear()} Props Menu. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </footer>
  )
}
