import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { PerPageSelector } from "@modules/store/components/per-page-selector"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const DEFAULT_PRODUCT_LIMIT = 16

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  classFilter,
  excludeFeaturedFromFirstPage,
  productsPerPage,
  featuredCount,
  showPerPage = true,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  classFilter?: string
  excludeFeaturedFromFirstPage?: boolean
  productsPerPage?: number
  featuredCount?: number
  showPerPage?: boolean
}) {
  const BASE_LIMIT = productsPerPage || DEFAULT_PRODUCT_LIMIT
  const PRODUCT_LIMIT = BASE_LIMIT

  // For page 1 dedup: fetch extra to compensate for removed featured items
  const needsDedup = !!excludeFeaturedFromFirstPage && page === 1
  const fetchExtra = needsDedup && featuredCount ? featuredCount : 0
  // classFilter still needs bulk fetch (rare, only TF2 subcategories)
  const fetchLimit = classFilter ? 100 : PRODUCT_LIMIT + fetchExtra

  const queryParams: PaginatedProductsParams = {
    limit: fetchLimit,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count: apiCount },
  } = await listProductsWithSort({
    page: classFilter ? 1 : page,
    queryParams,
    sortBy,
    countryCode,
  })

  // Filter by class if specified
  if (classFilter) {
    products = products.filter(
      (p) => p.metadata?.class === classFilter.toLowerCase()
    )
    apiCount = products.length
    // Manual pagination for class-filtered results
    const startIndex = (page - 1) * PRODUCT_LIMIT
    products = products.slice(startIndex, startIndex + PRODUCT_LIMIT)
  }

  // Dedup: on page 1, exclude featured products so they don't duplicate
  // the Class Favorites shelf. They reappear naturally on page 2+.
  if (needsDedup) {
    products = products.filter(
      (p) => !p.tags?.some((t) => t.value === "featured")
    )
    // Trim to page size after dedup
    products = products.slice(0, PRODUCT_LIMIT)
  }

  const totalPages = Math.max(1, Math.ceil(apiCount / PRODUCT_LIMIT))

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center w-full py-20" data-testid="products-empty">
        <h2 className="text-3xl font-light uppercase tracking-widest opacity-60 game-themed-text">
          Coming Soon
        </h2>
      </div>
    )
  }

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-5"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {(totalPages > 1 || (showPerPage && apiCount > DEFAULT_PRODUCT_LIMIT)) && (
        <div className="relative flex items-center justify-center w-full mt-12">
          {totalPages > 1 && (
            <Pagination
              data-testid="product-pagination"
              page={page}
              totalPages={totalPages}
            />
          )}
          {showPerPage && (
            <div className="absolute right-0">
              <PerPageSelector current={BASE_LIMIT} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
