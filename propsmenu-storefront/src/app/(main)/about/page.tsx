import { Metadata } from "next"
import GlassTile from "@modules/common/components/glass-tile"
import PageHero from "@modules/common/components/page-hero"
import ContactCTA from "@modules/common/components/contact-cta"

export const metadata: Metadata = {
  title: "About Us | Props Menu",
  description: "Learn about Props Menu - your source for premium 3D printed props and collectibles from your favorite games.",
}

export default function AboutPage() {
  return (
    <div className="w-full">
      <PageHero
        label="About Us"
        title="Props Menu"
        subtitle="A fan-run, unofficial Valve store."
        logoSrc="/logos/logo-stacked-dark.png"
        logoAlt="Props Menu"
      />

      {/* Tiles */}
      <section className="content-container pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">

          <GlassTile title="What We Do">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We create high-quality props and replicas based on our favorite games such as Team Fortress 2, Portal, Half-Life, and Garry&apos;s Mod. 
              Our team has collectively clocked dozens of thousands of hours in these titles, so each item can be designed with true love and attention to detail. 
            </p>
          </GlassTile>

          <GlassTile title="Who We Are">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We create high-quality props and replicas based on our favorite games such as Team Fortress 2, Portal, Half-Life, and Garry&apos;s Mod. 
              Our team has collectively clocked dozens of thousands of hours in these titles, so each item can be designed with true love and attention to detail. 
            </p>
          </GlassTile>

          <GlassTile title="Quality Guarantee">
            <p className="text-lg leading-relaxed text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              We stand behind every item we sell. If you&apos;re not satisfied with your purchase,
              we&apos;ll work with you to make it right. Our goal is to bring your favorite game items
              into the real world with the quality they deserve.
            </p>
          </GlassTile>

          <ContactCTA />
        </div>
      </section>
    </div>
  )
}
