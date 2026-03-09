import { Metadata } from "next"
import GlassTile from "@modules/common/components/glass-tile"
import ContactCTA from "@modules/common/components/contact-cta"
import PageHero from "@modules/common/components/page-hero"

export const metadata: Metadata = {
  title: "Shipping Info | Props Menu",
  description: "Learn about Props Menu shipping options, delivery times, and international shipping.",
}

export default function ShippingPage() {
  return (
    <div className="w-full">
      <PageHero
        label="Shipping"
        title="Shipping Information"
        subtitle="Everything you need to know about getting your order to you."
      />

      <section className="content-container pb-24">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Production Time */}
          <GlassTile title="Production Time">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-orange-500/10 border border-brand-orange-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
                  Orders typically ship within <strong>1-5 business days</strong> from the moment your order is placed.
                  All items are made-to-order, so production begins as soon as we receive your order.
                </p>
              </div>
            </div>
          </GlassTile>

          {/* Domestic Shipping */}
          <GlassTile title="Domestic Shipping (USA)">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-orange-500/10 border border-brand-orange-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="flex-1 space-y-4 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
                <p>
                  Free shipping is sent via <strong>USPS Ground Advantage</strong> (3-7 business days).
                </p>
                <p>
                  Want it faster? At checkout you can upgrade to <strong>USPS Priority Mail</strong> or <strong>UPS</strong>.
                </p>
                <p className="text-sm text-brand-dark-text-muted [html[data-mode=light]_&]:text-gray-500">
                  *Upgraded shipping costs are calculated at checkout.
                </p>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/25 rounded-lg">
                  <p className="text-yellow-400 [html[data-mode=light]_&]:text-yellow-600 font-medium">
                    Free shipping on all orders over $30!
                  </p>
                </div>
              </div>
            </div>
          </GlassTile>

          {/* International Shipping */}
          <GlassTile title="International Shipping">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-orange-500/10 border border-brand-orange-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
                <p className="mb-4">
                  We ship worldwide! International shipping rates are calculated at checkout.
                </p>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-300 [html[data-mode=light]_&]:text-red-600 text-sm">
                    <strong>Note:</strong> VAT and applicable taxes are automatically calculated and added to your order at checkout.
                  </p>
                </div>
              </div>
            </div>
          </GlassTile>

          {/* Order Tracking */}
          <GlassTile title="Order Tracking">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-orange-500/10 border border-brand-orange-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
                <p>
                  Once your order ships, you&#39;ll receive a tracking number via email. You can also view your order status
                  and tracking information anytime in your{" "}
                  <a href="/us/account" className="text-brand-orange-400 hover:text-brand-orange-300 transition-colors">
                    account portal
                  </a>.
                </p>
              </div>
            </div>
          </GlassTile>

          <ContactCTA />

        </div>
      </section>
    </div>
  )
}
