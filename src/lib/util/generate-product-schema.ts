import { HttpTypes } from "@medusajs/types"
import { getBaseURL } from "@lib/util/env"

export function generateProductSchema(
  product: HttpTypes.StoreProduct,
  price?: { amount: number; currency_code: string }
) {
  const baseUrl = getBaseURL()

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.title,
    image: product.images?.map((img) => img.url) || [],
    brand: {
      "@type": "Brand",
      name: "Props Menu",
    },
    offers: price
      ? {
          "@type": "Offer",
          price: (price.amount / 100).toFixed(2),
          priceCurrency: price.currency_code.toUpperCase(),
          availability: "https://schema.org/InStock",
          url: `${baseUrl}/products/${product.handle}`,
        }
      : undefined,
  }

  return schema
}

export function generateOrganizationSchema() {
  const baseUrl = getBaseURL()

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Props Menu",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Premium film and TV replica props for fans and collectors.",
    sameAs: [
      // Add social media URLs when available
    ],
  }
}
