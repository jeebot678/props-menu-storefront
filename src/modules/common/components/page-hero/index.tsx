import Image from "next/image"

type PageHeroProps = {
  label: string
  title: string
  subtitle: string
  logoSrc?: string
  logoAlt?: string
}

export default function PageHero({ label, title, subtitle, logoSrc, logoAlt }: PageHeroProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-brand-orange-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-60 h-60 bg-brand-purple-600/8 rounded-full blur-3xl" />
      <div className="content-container relative z-10 text-center">
        <p className="bg-gradient-to-b from-amber-300 via-brand-orange-400 via-30% to-brand-orange-500 bg-clip-text text-transparent font-semibold uppercase tracking-widest text-sm mb-4">{label}</p>
        {logoSrc ? (
          <div className="mb-6 flex justify-center">
            <Image
              src={logoSrc.replace('-dark', '')}
              alt={logoAlt || title}
              width={280}
              height={280}
              className="h-auto [html[data-mode=light]_&]:hidden"
              priority
            />
            <Image
              src={logoSrc}
              alt={logoAlt || title}
              width={280}
              height={280}
              className="h-auto hidden [html[data-mode=light]_&]:block"
              priority
            />
          </div>
        ) : (
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-dark-text-primary [html[data-mode=light]_&]:text-gray-900">
            {title}
          </h1>
        )}
        <p className="text-xl leading-relaxed text-brand-dark-text-secondary max-w-2xl mx-auto [html[data-mode=light]_&]:text-gray-600">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
