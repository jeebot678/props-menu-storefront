import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import { ProductInfoSection } from "@modules/products/components/product-tabs"
import ProductInfo from "@modules/products/templates/product-info"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import { generateProductSchema } from "@lib/util/generate-product-schema"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const { cheapestPrice } = getProductPrice({ product })
  const productSchema = generateProductSchema(product, cheapestPrice)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div
        data-testid="product-container"
      >
        {/* Top Section: Image + Actions side by side */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Square Image Gallery */}
          <div className="w-full lg:w-1/2">
            <ImageGallery images={images} productTitle={product.title} />
          </div>
          
          {/* Right: Title, Actions (variants/price/cart), then Description */}
          <div className="w-full lg:w-1/2 flex flex-col gap-y-6">
            {/* Product Title */}
            <ProductInfo product={product} showDescription={false} />
            
            {/* Variant Options, Price, Add to Cart */}
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <div className="h-[200px] animate-pulse bg-ui-bg-subtle rounded-lg" />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            {/* Description — collapsed by default */}
            <ProductInfo product={product} showTitle={false} />

            {/* Product Information (Material, Weight, Dimensions) */}
            <ProductInfoSection product={product} />
          </div>
        </div>

        {/* Product Information & Shipping — full width panel below */}
        <div className="mt-12 pt-8 border-t border-ui-border-base">
          <ProductTabs product={product} />
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
