import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

interface MinPricedProduct extends HttpTypes.StoreProduct {
  _minPrice?: number
}

/**
 * Helper function to sort products by price until the store API supports sorting by price
 * @param products
 * @param sortBy
 * @returns products sorted by price
 */
export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
): HttpTypes.StoreProduct[] {
  const sortedProducts = products as MinPricedProduct[]

  // Precompute the minimum price for each product
  sortedProducts.forEach((product) => {
    if (product.variants && product.variants.length > 0) {
      product._minPrice = Math.min(
        ...product.variants.map(
          (variant) => variant?.calculated_price?.calculated_amount || 0
        )
      )
    } else {
      product._minPrice = Infinity
    }
  })

  // Sort products
  if (sortBy === "name_asc") {
    sortedProducts.sort((a, b) =>
      (a.title ?? "").localeCompare(b.title ?? "")
    )
  } else {
    sortedProducts.sort((a, b) => {
      const diff = a._minPrice! - b._minPrice!
      return sortBy === "price_asc" ? diff : -diff
    })
  }

  return sortedProducts
}
