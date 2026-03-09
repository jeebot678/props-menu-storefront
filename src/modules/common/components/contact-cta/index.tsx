export default function ContactCTA() {
  return (
    <div className="relative rounded-2xl">
      <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.06] p-8 text-center overflow-hidden shadow-[inset_0_0_20px_rgba(249,115,22,0.02)] [html[data-mode=light]_&]:bg-gray-100/80 [html[data-mode=light]_&]:border-gray-300/80 [html[data-mode=light]_&]:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {/* Edge glows */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-orange-500/[0.04] rounded-full blur-2xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl opacity-70 pointer-events-none" />

        <p className="relative z-10 text-lg">
          <strong className="text-brand-dark-text-primary [html[data-mode=light]_&]:text-gray-900">
            Still have questions?
          </strong>
          <br />
          <a
            href="/contact"
            className="text-brand-orange-400 hover:text-brand-orange-300 font-medium transition-colors duration-300"
          >
            Contact us
          </a>
          {" "}<span className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">— we&apos;re here to help!</span>
        </p>
      </div>
    </div>
  )
}
