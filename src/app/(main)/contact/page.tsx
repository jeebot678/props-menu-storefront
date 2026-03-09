import { Metadata } from "next"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Props Menu",
  description: "Get in touch with Props Menu for questions, custom orders, or support.",
}

export default function ContactPage() {
  return (
    <div className="content-container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8 text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
        <h1 className="text-4xl font-bold mb-4 text-brand-dark-text-primary [html[data-mode=light]_&]:text-gray-900">
          Contact Us
        </h1>
          <p className="text-lg leading-relaxed">
            Have a question, need support, or want to discuss a custom order? We'd love to hear from you!
          </p>
          
          <div className="bg-brand-dark-surface border border-brand-dark-border rounded-xl p-8 [html[data-mode=light]_&]:bg-white [html[data-mode=light]_&]:border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-brand-dark-text-primary [html[data-mode=light]_&]:text-gray-900">
              Send Us a Message
            </h2>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
