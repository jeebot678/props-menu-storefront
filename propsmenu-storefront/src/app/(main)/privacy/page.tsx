import { Metadata } from "next"
import PageHero from "@modules/common/components/page-hero"
import GlassTile from "@modules/common/components/glass-tile"
import ContactCTA from "@modules/common/components/contact-cta"

export const metadata: Metadata = {
  title: "Privacy Policy | Props Menu",
  description: "How Props Menu collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="w-full">
      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
      />

      <section className="content-container pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">

          <GlassTile title="Information We Collect">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              When you place an order or create an account, we collect:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-4 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <li>Name and email address</li>
              <li>Shipping and billing address</li>
              <li>Payment information (processed securely by our payment provider)</li>
              <li>Order history and preferences</li>
            </ul>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              We also automatically collect basic usage data such as pages visited and referral source
              to improve our website.
            </p>
          </GlassTile>

          <GlassTile title="How We Use Your Information">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              Your information is used to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-4 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your questions and support requests</li>
              <li>Improve our products and services</li>
              <li>Send promotional emails (only if you opted in)</li>
            </ul>
          </GlassTile>

          <GlassTile title="Information Sharing">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We do <strong>not</strong> sell, trade, or rent your personal information to third parties.
            </p>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              We may share information with:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-4 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <li><strong>Shipping carriers</strong> to deliver your order</li>
              <li><strong>Payment processors</strong> to securely handle transactions</li>
              <li><strong>Analytics services</strong> (aggregated, non-identifying data only)</li>
            </ul>
          </GlassTile>

          <GlassTile title="Data Security">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We implement industry-standard security measures to protect your information.
              Payment information is encrypted and processed by secure, PCI-compliant payment
              providers. We never store your full credit card number.
            </p>
          </GlassTile>

          <GlassTile title="Cookies">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We use cookies to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-4 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <li>Keep you logged in</li>
              <li>Remember items in your cart</li>
              <li>Understand how visitors use our site</li>
            </ul>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              You can disable cookies in your browser settings, but some site features may not
              work properly.
            </p>
          </GlassTile>

          <GlassTile title="Your Rights">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              You have the right to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-4 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600 mt-4">
              To exercise these rights, please{" "}
              <a href="/us/contact" className="text-brand-orange-400 hover:text-brand-orange-300">
                contact us
              </a>.
            </p>
          </GlassTile>

          <GlassTile title="Changes to This Policy">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We may update this privacy policy from time to time. Significant changes will be
              communicated via email or a notice on our website.
            </p>
          </GlassTile>

          <GlassTile title="Contact">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              Questions about this privacy policy? Reach out at{" "}
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
