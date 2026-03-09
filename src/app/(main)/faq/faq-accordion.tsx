"use client"

import { useState } from "react"

type FAQ = {
  question: string
  answer: string
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="group relative rounded-2xl transition-all duration-500"
          >
            {/* Glass surface */}
            <div
              className={`relative rounded-2xl backdrop-blur-md border transition-all duration-500 overflow-hidden ${
                isOpen
                  ? "bg-white/[0.04] border-brand-orange-500/20 shadow-[inset_0_0_30px_rgba(249,115,22,0.03),0_0_10px_rgba(249,115,22,0.04)] [html[data-mode=light]_&]:bg-gray-100/80 [html[data-mode=light]_&]:border-gray-300/80 [html[data-mode=light]_&]:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_0_10px_rgba(249,115,22,0.06)]"
                  : "bg-white/[0.03] border-white/[0.06] group-hover:border-brand-orange-500/20 shadow-[inset_0_0_20px_rgba(249,115,22,0.02)] group-hover:shadow-[inset_0_0_30px_rgba(249,115,22,0.03),0_0_10px_rgba(249,115,22,0.04)] [html[data-mode=light]_&]:bg-gray-100/80 [html[data-mode=light]_&]:border-gray-300/80 [html[data-mode=light]_&]:shadow-[0_2px_8px_rgba(0,0,0,0.06)] [html[data-mode=light]_&]:group-hover:border-brand-orange-500/30 [html[data-mode=light]_&]:group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_10px_rgba(249,115,22,0.06)]"
              }`}
            >
              {/* Edge glows */}
              <div className={`absolute -top-12 -left-12 w-32 h-32 bg-brand-orange-500/[0.04] rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`} />
              <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`} />

              <button
                onClick={() => toggle(index)}
                className="relative z-10 w-full flex items-center justify-between p-6 text-left"
              >
                <h2
                  className={`text-lg font-semibold pr-4 transition-all duration-300 ${
                    isOpen
                      ? "bg-gradient-to-b from-amber-300 via-brand-orange-400 via-30% to-brand-orange-500 bg-clip-text text-transparent"
                      : "text-brand-dark-text-primary group-hover:text-brand-orange-400 [html[data-mode=light]_&]:text-gray-900"
                  }`}
                >
                  {faq.question}
                </h2>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-brand-orange-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className="relative z-10 px-6 pb-6 text-brand-dark-text-secondary leading-relaxed whitespace-pre-line [html[data-mode=light]_&]:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
