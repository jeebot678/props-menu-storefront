import { Metadata } from "next"
import GlassTile from "@modules/common/components/glass-tile"
import ContactCTA from "@modules/common/components/contact-cta"
import PageHero from "@modules/common/components/page-hero"

export const metadata: Metadata = {
  title: "Returns & Exchanges | Props Menu",
  description: "Learn about Props Menu's return and exchange policy.",
}

export default function ReturnsPage() {
  return (
    <div className="w-full">
      <PageHero
        label="Policy"
        title="Returns & Exchanges"
        subtitle="Your satisfaction is our priority. Here's our policy."
      />

      <section className="content-container pb-24">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Returns & Exchanges */}
          <GlassTile title="Returns & Exchanges">
            <div className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <p className="mb-4">
                We accept returns and exchanges within <strong>30 days of delivery</strong>.
                To request a return or exchange, contact us with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Your order number</li>
                <li>Reason for the return/exchange</li>
                <li>Photos if the item is damaged or defective</li>
              </ul>
              <p className="text-sm text-brand-dark-text-muted [html[data-mode=light]_&]:text-gray-500">
                Note: Items damaged at the fault of the buyer (not due to item defect or shipping damage) cannot be returned or exchanged.
              </p>
            </div>
          </GlassTile>

          {/* Cancellations */}
          <GlassTile title="Cancellations">
            <div className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <p>
                Orders can be cancelled at any point <strong>before they are picked up by the shipping provider</strong>. Once an order has been picked up for shipping, we are unable to cancel it.
              </p>
            </div>
          </GlassTile>

          {/* Lost Packages */}
          <GlassTile title="Lost Packages">
            <div className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <p className="mb-4">
                If your package is marked as delivered but you haven&#39;t received it:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Check with neighbors or other household members</li>
                <li>Look for a &quot;left at&quot; notice from the carrier</li>
                <li>For international orders, contact your local carrier</li>
                <li>Contact us if it still hasn&#39;t turned up</li>
              </ol>
            </div>
          </GlassTile>

          <ContactCTA />

        </div>
      </section>
    </div>
  )
}
