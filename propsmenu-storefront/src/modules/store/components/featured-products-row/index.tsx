import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"

type FeaturedProductsRowProps = {
  countryCode: string
}

export default async function FeaturedProductsRow({ countryCode }: FeaturedProductsRowProps) {
  const region = await getRegion(countryCode)
  
  if (!region) return null

  // Fetch featured products (first 4 products sorted by created_at desc for "newest")
  const { response } = await listProducts({
    countryCode,
    queryParams: {
      limit: 4,
      order: "-created_at",
    },
  })

  const products = response.products

  if (!products || products.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-4 gap-y-5">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
