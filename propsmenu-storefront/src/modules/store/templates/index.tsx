import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import CollectionHeroBanners from "@modules/store/components/collection-hero-banners"
import { listCategories } from "@lib/data/categories"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  category,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  category?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "price_asc"
  
  const categories = await listCategories()
  
  // Get parent categories for hero banners
  const parentCategories = categories.filter(c => !c.parent_category_id)
  
  const selectedCategory = category 
    ? categories.find(c => c.handle === category)
    : null

  // Promotional landing — no category selected
  if (!selectedCategory) {
    return (
      <div data-testid="store-landing">
        <CollectionHeroBanners collections={parentCategories as any} countryCode={countryCode} />
      </div>
    )
  }

  // Category filtered view — show catalog
  return (
    <div className="py-6 content-container" data-testid="category-container">
      <div>
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="hidden small:block absolute right-full mr-6 top-0" style={{ width: '220px' }}>
            <div className="sticky top-24">
              <RefinementList sortBy={sort} categories={categories} />
            </div>
          </div>
          <div className="mb-8 text-2xl-semi">
            <h1 data-testid="store-page-title">
              {selectedCategory.name}
            </h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              categoryId={selectedCategory.id}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
