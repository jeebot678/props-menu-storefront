import { HttpTypes } from "@medusajs/types"

export function generateProductSchema(
  product: HttpTypes.StoreProduct,
  price?: { amount: number; currency_code: string }
) {
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
          url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/products/${product.handle}`,
        }
      : undefined,
  }

  return schema
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Props Menu",
    url: process.env.NEXT_PUBLIC_BASE_URL || "",
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/logo.png`,
    description:
      "Premium film and TV replica props for fans and collectors.",
    sameAs: [
      // Add social media URLs when available
    ],
  }
}
