import { listFeaturedProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"

/**
 * "Class Favorites" — featured products shelf for the TF2 root category.
 * Uses the "featured" tag for server-side filtering instead of fetching all products.
 */
export default async function ClassFavorites({
  categoryId,
  countryCode,
}: {
  categoryId: string
  countryCode: string
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const featured = await listFeaturedProducts({ countryCode })

  if (featured.length === 0) {
    return null
  }

  return (
    <div className="tf2-class-favorites" data-testid="class-favorites">
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-5"
        data-testid="class-favorites-list"
      >
        {featured.map((p) => (
          <li key={p.id}>
            <ProductPreview product={p} region={region} />
          </li>
        ))}
      </ul>
    </div>
  )
}
