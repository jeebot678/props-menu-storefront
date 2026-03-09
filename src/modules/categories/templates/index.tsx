import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import GameThemeWrapper from "@modules/categories/components/game-theme-wrapper"
import GameSidebar from "@modules/categories/components/game-sidebar"
import GmodWindowChrome from "@modules/categories/components/gmod-window-chrome"
import ClassFavorites from "@modules/categories/components/class-favorites"
import PortalGridSnap from "@modules/categories/components/portal-grid-snap"
import { HttpTypes } from "@medusajs/types"
import { getGameTheme, getGameThemeForCategory } from "@lib/util/game-themes"

export default function CategoryTemplate({
  category,
  categories,
  sortBy,
  page,
  limit,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  categories?: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  limit?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "price_asc"
  const productsPerPage = limit ? parseInt(limit) : undefined

  if (!category || !countryCode) notFound()

  const theme = getGameThemeForCategory(category)

  // Build breadcrumb from parent categories
  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.push(cat.parent_category)
      getParents(cat.parent_category)
    }
  }

  getParents(category)
  parents.reverse()

  const content = (
    <div className="py-6 content-container" data-testid="category-container">
      <div>
        {/* Products area — truly centered */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Sidebar — positioned to the left of centered content */}
          <div className="hidden small:block absolute right-full mr-6 top-0" data-testid="category-sidebar" style={{ width: '220px' }}>
            <div className="sticky top-24">
              {theme ? (
                <GameSidebar theme={theme}>
                  <RefinementList sortBy={sort} categories={categories} data-testid="sort-by-container" />
                </GameSidebar>
              ) : (
                <RefinementList sortBy={sort} categories={categories} data-testid="sort-by-container" />
              )}
            </div>
          </div>
          {/* TF2 root category, page 1: split into two separate panels */}
          {theme?.slug === 'tf2' && !category.parent_category && pageNumber === 1 ? (
            <div className="flex flex-col gap-6">
              {/* Box 1: Class Favorites */}
              <div className="tf2-inventory-panel">
                <div className="tf2-section-title" data-testid="tf2-favorites-title">
                  <h2 className="tf2-section-title__text">Class Favorites</h2>
                </div>
                <Suspense fallback={null}>
                  <ClassFavorites
                    categoryId={category.id}
                    countryCode={countryCode}
                  />
                </Suspense>
              </div>

              {/* Box 2: Browse Catalog */}
              <div className="tf2-inventory-panel">
                <div className="tf2-section-title" data-testid="tf2-browse-loadout">
                  <h1 className="tf2-section-title__text">Browse Catalog</h1>
                </div>

                {category.description && (
                  <div className="mb-8 text-base-regular game-themed-text-secondary">
                    <p>{category.description}</p>
                  </div>
                )}

                <Suspense
                  fallback={
                    <SkeletonProductGrid
                      numberOfProducts={category.products?.length ?? 8}
                    />
                  }
                >
                  <PaginatedProducts
                    sortBy={sort}
                    page={pageNumber}
                    categoryId={category.id}
                    countryCode={countryCode}
                    excludeFeaturedFromFirstPage={true}
                    productsPerPage={productsPerPage}
                    featuredCount={4}
                    showPerPage={true}
                  />
                </Suspense>
              </div>
            </div>
          ) : (
            <div data-testid="category-products" data-portal-grid={theme?.slug === 'portal' ? "true" : undefined} className={theme?.slug === 'tf2' ? 'tf2-inventory-panel' : undefined}>
              {theme?.slug === 'portal' && <PortalGridSnap />}

              {/* TF2 Browse title (subcategories or page 2+) */}
              {theme?.slug === 'tf2' && (
                <div className="tf2-section-title" data-testid="tf2-browse-loadout">
                  <h1 className="tf2-section-title__text">
                    {category.parent_category ? (
                      <>Browse{' '}<span className="tf2-section-title__class">{category.name}</span></>
                    ) : (
                      'Browse Catalog'
                    )}
                  </h1>
                </div>
              )}

              {/* Breadcrumb + Title (hidden when Gmod or TF2 chrome is used) */}
              {theme?.slug !== 'gmod' && theme?.slug !== 'tf2' && (
                <div className="flex flex-row mb-8 text-2xl-semi gap-4 items-baseline" data-testid="category-breadcrumb">
                  {parents.map((parent) => (
                    <span key={parent.id} className="game-themed-text-secondary" data-testid="breadcrumb-parent">
                      <LocalizedClientLink
                        className="game-themed-link"
                        href={`/categories/${parent.handle}`}
                      >
                        {(theme?.displayName && getGameTheme(parent.handle)) ? theme.displayName : parent.name}
                      </LocalizedClientLink>
                    </span>
                  ))}
                  <h1
                    data-testid="category-page-title"
                    className="game-themed-title"
                  >
                    {!category.parent_category ? 'Browse Catalog' : category.name}
                  </h1>
                </div>
              )}
              
              {category.description && (
                <div className="mb-8 text-base-regular game-themed-text-secondary">
                  <p>{category.description}</p>
                </div>
              )}

              {/* Game-specific chrome wraps the product grid */}
              {theme?.slug === 'gmod' ? (
                <GmodWindowChrome
                  tabName={(theme?.displayName && !category.parent_category) ? theme.displayName : category.name}
                >
                  <Suspense
                    fallback={
                      <SkeletonProductGrid
                        numberOfProducts={category.products?.length ?? 8}
                      />
                    }
                  >
                    <PaginatedProducts
                      sortBy={sort}
                      page={pageNumber}
                      categoryId={category.id}
                      countryCode={countryCode}
                      productsPerPage={productsPerPage}
                      showPerPage={false}
                    />
                  </Suspense>
                </GmodWindowChrome>
              ) : (
                <Suspense
                  fallback={
                    <SkeletonProductGrid
                      numberOfProducts={category.products?.length ?? 8}
                    />
                  }
                >
                  <PaginatedProducts
                    sortBy={sort}
                    page={pageNumber}
                    categoryId={category.id}
                    countryCode={countryCode}
                    excludeFeaturedFromFirstPage={theme?.slug === 'tf2' && !category.parent_category}
                    productsPerPage={productsPerPage}
                    featuredCount={theme?.slug === 'tf2' && !category.parent_category ? 4 : undefined}
                    showPerPage={!theme || theme.slug === 'tf2'}
                  />
                </Suspense>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (theme) {
    return <GameThemeWrapper theme={theme}>{content}</GameThemeWrapper>
  }

  return content
}
