import { Metadata } from "next"
import PageHero from "@modules/common/components/page-hero"
import GlassTile from "@modules/common/components/glass-tile"
import ContactCTA from "@modules/common/components/contact-cta"

export const metadata: Metadata = {
  title: "Terms of Service | Props Menu",
  description: "Terms and conditions for using Props Menu and purchasing our products.",
}

export default function TermsPage() {
  return (
    <div className="w-full">
      <PageHero
        label="Legal"
        title="Terms of Service"
        subtitle="Terms and conditions for using Props Menu and purchasing our products."
      />

      <section className="content-container pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">

          <GlassTile title="Agreement to Terms">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              By accessing or using Props Menu (&quot;the Site&quot;), you agree to be bound by these Terms
              of Service. If you do not agree to these terms, please do not use the Site.
            </p>
          </GlassTile>

          <GlassTile title="Products and Orders">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              All products are 3D printed on-demand. By placing an order, you acknowledge that:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 mt-4 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <li>Items are made-to-order and production begins shortly after purchase</li>
              <li>Colors may vary slightly from photos due to monitor differences and 3D printing variability</li>
              <li>Minor variations between prints are normal and part of the 3D printing process</li>
              <li>Estimated delivery times are not guaranteed and may vary</li>
            </ul>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              We reserve the right to refuse or cancel orders at our discretion, including for
              suspected fraud or errors in pricing.
            </p>
          </GlassTile>

          <GlassTile title="Intellectual Property Notice">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-amber-200 [html[data-mode=light]_&]:text-amber-700">
              <p>
                <strong>Important:</strong> The props sold on this site are unofficial fan-made
                creations. They are not affiliated with, endorsed by, or licensed by Valve Corporation
                or any other game publisher.
              </p>
            </div>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              Team Fortress 2, Portal, Half-Life, Garry&apos;s Mod, and associated characters and
              designs are trademarks of Valve Corporation. These products are sold as fan art
              for personal collection and display purposes only.
            </p>
          </GlassTile>

          <GlassTile title="Pricing and Payment">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              All prices are listed in USD. We reserve the right to change prices at any time
              without notice. Prices at checkout are final for that order.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              Payment is processed securely through our payment provider. We do not store your
              complete payment information on our servers.
            </p>
          </GlassTile>

          <GlassTile title="Shipping and Delivery">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              See our{" "}
              <a href="/us/shipping" className="text-brand-orange-400 hover:text-brand-orange-300">
                Shipping Info
              </a>
              {" "}page for details on production times, shipping methods, and international orders.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              Risk of loss and title for items pass to you upon delivery to the carrier. We are
              not responsible for delays caused by the shipping carrier, customs, or events
              outside our control.
            </p>
          </GlassTile>

          <GlassTile title="Returns and Refunds">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              Please see our{" "}
              <a href="/us/returns" className="text-brand-orange-400 hover:text-brand-orange-300">
                Returns & Exchanges
              </a>
              {" "}page for our complete return policy.
            </p>
          </GlassTile>

          <GlassTile title="Limitation of Liability">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              To the maximum extent permitted by law, Props Menu shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from
              your use of the Site or purchase of products.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              Our liability for any claim arising from your purchase shall not exceed the
              amount you paid for the item(s) in question.
            </p>
          </GlassTile>

          <GlassTile title="Product Use">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              Our products are decorative props intended for display and collection. They are
              not toys and may contain small parts. Keep away from young children. These items
              are not designed for rough handling, outdoor use, or functional purposes beyond
              decoration.
            </p>
          </GlassTile>

          <GlassTile title="Changes to Terms">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We may modify these terms at any time. Continued use of the Site after changes
              constitutes acceptance of the updated terms. Material changes will be noted with
              an updated date at the top of this page.
            </p>
          </GlassTile>

          <GlassTile title="Governing Law">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              These terms shall be governed by the laws of the State of Georgia, USA, without
              regard to conflict of law principles.
            </p>
          </GlassTile>

          <GlassTile title="Contact">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              Questions about these terms? Contact us at{" "}
              <a
                href="mailto:support@propsmenu.com"
                className="text-brand-orange-400 hover:text-brand-orange-300"
              >
                support@propsmenu.com
              </a>
            </p>
          </GlassTile>

          <ContactCTA />

        </div>
      </section>
    </div>
  )
}
