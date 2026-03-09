"use client"

export default function GlassTile({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative rounded-2xl transition-all duration-500 hover:scale-[1.02] ${className || ""}`}>
      {/* Glass surface */}
      <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.06] group-hover:border-brand-orange-500/20 transition-all duration-500 p-8 shadow-[inset_0_0_20px_rgba(249,115,22,0.02),0_0_0_rgba(249,115,22,0)] group-hover:shadow-[inset_0_0_30px_rgba(249,115,22,0.03),0_0_10px_rgba(249,115,22,0.04)] [html[data-mode=light]_&]:bg-gray-100/80 [html[data-mode=light]_&]:border-gray-300/80 [html[data-mode=light]_&]:shadow-[0_2px_8px_rgba(0,0,0,0.06)] [html[data-mode=light]_&]:group-hover:border-brand-orange-500/30 [html[data-mode=light]_&]:group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_0_10px_rgba(249,115,22,0.06)] overflow-hidden">
        {/* Edge glow — radial from corners */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand-orange-500/[0.04] rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-400/[0.02] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          {title && (
            <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-b from-amber-300 via-brand-orange-400 via-30% to-brand-orange-500 bg-clip-text text-transparent transition-all duration-300">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
