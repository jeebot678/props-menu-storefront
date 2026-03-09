import { Metadata } from "next"
import FAQAccordion from "./faq-accordion"
import ContactCTA from "@modules/common/components/contact-cta"
import PageHero from "@modules/common/components/page-hero"

export const metadata: Metadata = {
  title: "FAQ | Props Menu",
  description: "Frequently asked questions about Props Menu 3D printed props, shipping, and orders.",
}

const faqs = [
  {
    question: "Are these official licensed products?",
    answer: "These are 100% fan-made props created by fans out of love. We are not affiliated with or endorsed by Valve Corporation or any other game publisher."
  },
  {
    question: "How long does production take?",
    answer: "Because every item is made to order in-house, production typically takes 2-5 business days depending on the size of the order and season. During holidays and busy seasons, production may take slightly longer. This doesn't include shipping time."
  },
  {
    question: "What material are the props made from?",
    answer: "All our props are 3D printed using specifically selected PLA filament that is both as high quality and accurate as possible. PLA is a durable, eco-friendly thermoplastic that produces excellent detail and a smooth finish.\n\nNote: Avoid leaving PLA items in high heat environments (such as cars parked in direct sunlight) as this can cause the plastic to warp."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes! We ship worldwide. International shipping costs and delivery times vary by destination. Please note that international buyers are responsible for any customs duties or import taxes that may apply in their country."
  },
  {
    question: "What if my item arrives damaged?",
    answer: "We carefully package every order, but shipping can sometimes be rough. If your item arrives damaged, please contact us within 14 days with photos of the damage, and we'll work with you to make it right. See our <a href='/us/returns' class='text-brand-orange-400 hover:text-brand-orange-300'>Returns & Exchanges</a> page for details."
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled at any point before they are picked up by the shipping provider. Once an order has been picked up for shipping, we are unable to cancel it."
  },
]

export default function FAQPage() {
  return (
    <div className="w-full">
      <PageHero
        label="Support"
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers."
      />

      {/* FAQ Tiles */}
      <section className="content-container pb-24">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion faqs={faqs} />

          <ContactCTA />
        </div>
      </section>
    </div>
  )
}
