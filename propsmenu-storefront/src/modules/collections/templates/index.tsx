import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  collections,
  page,
  countryCode,
  classFilter,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  collections?: HttpTypes.StoreCollection[]
  page?: string
  countryCode: string
  classFilter?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "price_asc"

  // Format class name for display
  const classDisplayName = classFilter 
    ? classFilter.charAt(0).toUpperCase() + classFilter.slice(1)
    : null

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} collections={collections} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1>
            {collection.title} <span className="text-brand-dark-text-muted">|</span> <span className="text-brand-orange-500">{classDisplayName || "All Items"}</span>
          </h1>
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
            classFilter={classFilter}
          />
        </Suspense>
      </div>
    </div>
  )
}
