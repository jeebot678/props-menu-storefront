"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <div className="w-full flex flex-col gap-y-8">
      {/* Shipping & Returns — centered, larger text */}
      <div data-testid="shipping-info-section">
        <ShippingInfoSection />
      </div>
    </div>
  )
}

export const ProductInfoSection = ({ product }: ProductTabsProps) => {
  return (
    <div data-testid="product-info-section">
      <h3 className="text-base font-semibold mb-3" data-role="info-heading">Product Information</h3>
      <div className="flex flex-col gap-y-2 text-sm">
        <div>
          <span className="font-semibold" data-role="info-label">Material</span>
          <p className="text-ui-fg-subtle mt-0.5" data-role="info-value">{product.material ? product.material : "-"}</p>
        </div>
        <div>
          <span className="font-semibold" data-role="info-label">Weight</span>
          <p className="text-ui-fg-subtle mt-0.5" data-role="info-value">{product.weight ? `${product.weight} g` : "-"}</p>
        </div>
        <div>
          <span className="font-semibold" data-role="info-label">Dimensions</span>
          <p className="text-ui-fg-subtle mt-0.5" data-role="info-value">
            {(() => {
              const parts = []
              if (product.length) parts.push(`${product.length}" L`)
              if (product.width) parts.push(`${product.width}" W`)
              if (product.height) parts.push(`${product.height}" H`)
              return parts.length > 0 ? parts.join(' x ') : "-"
            })()}
          </p>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoSection = () => {
  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "48px", padding: "32px 0", color: "var(--game-text, inherit)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <FastDelivery size="48" />
        <span data-role="section-title" style={{ fontSize: "28px", fontWeight: 700, color: "var(--game-accent, inherit)", fontFamily: "var(--game-ui-font, inherit)" }}>Fast delivery</span>
        <p style={{ fontSize: "18px", maxWidth: "32rem", margin: 0, color: "var(--game-text-secondary, inherit)", fontFamily: "var(--game-body-font, inherit)", lineHeight: 1.5 }}>
          Your package will arrive in 3-5 business days at your pick up
          location or in the comfort of your home.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Refresh size="48" />
        <span data-role="section-title" style={{ fontSize: "28px", fontWeight: 700, color: "var(--game-accent, inherit)", fontFamily: "var(--game-ui-font, inherit)" }}>Simple exchanges</span>
        <p style={{ fontSize: "18px", maxWidth: "32rem", margin: 0, color: "var(--game-text-secondary, inherit)", fontFamily: "var(--game-body-font, inherit)", lineHeight: 1.5 }}>
          Is the fit not quite right? No worries - we&apos;ll exchange your
          product for a new one.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <Back size="48" />
        <span data-role="section-title" style={{ fontSize: "28px", fontWeight: 700, color: "var(--game-accent, inherit)", fontFamily: "var(--game-ui-font, inherit)" }}>Easy returns</span>
        <p style={{ fontSize: "18px", maxWidth: "32rem", margin: 0, color: "var(--game-text-secondary, inherit)", fontFamily: "var(--game-body-font, inherit)", lineHeight: 1.5 }}>
          Just return your product and we&apos;ll refund your money. No
          questions asked – we&apos;ll do our best to make sure your return
          is hassle-free.
        </p>
      </div>
    </div>
  )
}

export default ProductTabs
