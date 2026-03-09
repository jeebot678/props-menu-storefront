import React from "react"
import { Heading, Text } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="w-full">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen w-full overflow-hidden bg-brand-dark-bg [html[data-mode=light]_&]:bg-gray-50">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-bg via-transparent to-brand-dark-bg z-10 [html[data-mode=light]_&]:from-gray-50 [html[data-mode=light]_&]:to-gray-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-bg/90 via-brand-dark-bg/40 to-transparent z-10 [html[data-mode=light]_&]:from-gray-50/90 [html[data-mode=light]_&]:via-gray-50/40" />
        
        {/* Ambient glows */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-purple-600/10 rounded-full blur-3xl" />
        
        {/* Hero content */}
        <div className="relative z-20 content-container flex flex-col justify-center min-h-screen py-20">
          <div className="max-w-3xl">
            <Heading
              level="h1"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark-text-primary leading-tight mb-6 [html[data-mode=light]_&]:text-gray-900"
            >
              Props Menu
            </Heading>
            <Text className="text-xl md:text-2xl text-brand-dark-text-secondary max-w-2xl mb-10 leading-relaxed [html[data-mode=light]_&]:text-gray-600">
              Unofficial fan-made props from your favorite Valve games
            </Text>
            <div className="flex flex-col sm:flex-row gap-4">
              <LocalizedClientLink
                href="/store"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-brand-orange-500 rounded-lg hover:bg-brand-orange-400 transition-all duration-300 shadow-lg shadow-brand-orange-500/25 hover:shadow-brand-orange-500/40"
              >
                Browse Collection
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-brand-dark-text-primary border-2 border-brand-dark-border rounded-lg hover:border-brand-orange-500/50 hover:text-brand-orange-400 transition-all duration-300 [html[data-mode=light]_&]:text-gray-900 [html[data-mode=light]_&]:border-gray-300"
              >
                Learn More
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: GAME CATEGORY SHOWCASE ===== */}
      <section className="py-24 bg-brand-dark-surface [html[data-mode=light]_&]:bg-white">
        <div className="content-container">
          <div className="text-center mb-16">
            <Heading level="h2" className="text-4xl md:text-5xl font-bold text-brand-dark-text-primary mb-4 [html[data-mode=light]_&]:text-gray-900">
              Explore by Game
            </Heading>
            <Text className="text-lg text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
              Choose your universe and discover props from your favorite Valve game
            </Text>
          </div>

          {/* Game cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            
            {/* Team Fortress 2 */}
            <LocalizedClientLink
              href="/categories/team-fortress-2"
              className="game-category-card group relative overflow-hidden rounded-2xl aspect-[4/3] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/themes/tf2-bg-new.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-brand-orange-500/0 group-hover:bg-brand-orange-500/10 transition-colors duration-300 z-10" />
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#FFD700] transition-all duration-300 rounded-2xl z-20" />
              
              <div className="relative z-30 h-full flex flex-col justify-end p-8">
                <h3 className="tf2-title text-5xl md:text-6xl mb-2" style={{ fontFamily: 'TF2 Build', color: '#FFD700', letterSpacing: '0.05em' }}>
                  TEAM FORTRESS 2
                </h3>
                <p className="text-white/90 text-lg">
                  Weapons, cosmetics & figurines from the iconic class-based shooter
                </p>
              </div>
            </LocalizedClientLink>

            {/* Portal */}
            <LocalizedClientLink
              href="/categories/portal"
              className="game-category-card group relative overflow-hidden rounded-2xl aspect-[4/3] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/themes/portal-bg.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 z-10" />
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#00A2FF] transition-all duration-300 rounded-2xl z-20" />
              
              <div className="relative z-30 h-full flex flex-col justify-end p-8">
                <h3 className="text-5xl md:text-6xl font-semibold mb-2" style={{ color: '#00A2FF', letterSpacing: '0.08em' }}>
                  PORTAL
                </h3>
                <p className="text-white/90 text-lg">
                  Test chamber essentials & Aperture Science collectibles
                </p>
              </div>
            </LocalizedClientLink>

            {/* Garry's Mod */}
            <LocalizedClientLink
              href="/categories/garrys-mod"
              className="game-category-card group relative overflow-hidden rounded-2xl aspect-[4/3] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/themes/gmod-bg.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-colors duration-300 z-10" />
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#48A4FF] transition-all duration-300 rounded-2xl z-20" />
              
              <div className="relative z-30 h-full flex flex-col justify-end p-8">
                <h3 className="text-5xl md:text-6xl mb-2" style={{ fontFamily: 'Coolvetica', color: '#48A4FF', letterSpacing: '0.05em' }}>
                  GARRY'S MOD
                </h3>
                <p className="text-white/90 text-lg">
                  Source Engine classics & sandbox favorites
                </p>
              </div>
            </LocalizedClientLink>

            {/* Half-Life */}
            <LocalizedClientLink
              href="/categories/half-life"
              className="game-category-card group relative overflow-hidden rounded-2xl aspect-[4/3] transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src="/themes/halflife-bg.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-300 z-10" />
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#FFA500] transition-all duration-300 rounded-2xl z-20" />
              
              <div className="relative z-30 h-full flex flex-col justify-end p-8">
                <h3 className="text-5xl md:text-6xl font-semibold mb-2" style={{ fontFamily: 'Barlow Condensed', color: '#FFA500', letterSpacing: '0.05em' }}>
                  HALF+LIFE
                </h3>
                <p className="text-white/90 text-lg">
                  Black Mesa artifacts & Freeman's iconic gear
                </p>
              </div>
            </LocalizedClientLink>

          </div>
        </div>
      </section>

      {/* ===== SECTION 4: VALUE PROPS ===== */}
      <section className="py-24 bg-brand-dark-surface border-t border-brand-dark-border [html[data-mode=light]_&]:bg-white [html[data-mode=light]_&]:border-gray-200">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-brand-orange-500/10 border border-brand-orange-500/20">
                <svg className="w-8 h-8 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L7 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-text-primary mb-3 [html[data-mode=light]_&]:text-gray-900">
                3D Printed
              </h3>
              <p className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
                High-quality PLA prints with careful attention to in-game accuracy
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-brand-orange-500/10 border border-brand-orange-500/20">
                <svg className="w-8 h-8 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-text-primary mb-3 [html[data-mode=light]_&]:text-gray-900">
                Made to Order
              </h3>
              <p className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
                Fresh prints, not shelf stock — each item printed when you order
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-brand-orange-500/10 border border-brand-orange-500/20">
                <svg className="w-8 h-8 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-brand-dark-text-primary mb-3 [html[data-mode=light]_&]:text-gray-900">
                Fan-Run
              </h3>
              <p className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
                By Valve fans, for Valve fans — we love these games as much as you do
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CTA BANNER ===== */}
      <section className="py-24 bg-gradient-to-b from-brand-dark-surface to-brand-dark-bg border-t border-brand-dark-border [html[data-mode=light]_&]:from-white [html[data-mode=light]_&]:to-gray-50 [html[data-mode=light]_&]:border-gray-200">
        <div className="content-container text-center">
          <Heading level="h2" className="text-4xl md:text-5xl font-bold text-brand-dark-text-primary mb-6 [html[data-mode=light]_&]:text-gray-900">
            Start Your Collection
          </Heading>
          <Text className="text-lg text-brand-dark-text-secondary max-w-2xl mx-auto mb-10 [html[data-mode=light]_&]:text-gray-600">
            Browse our full catalog of premium Valve props and collectibles
          </Text>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-brand-orange-500 rounded-lg hover:bg-brand-orange-400 transition-all duration-300 shadow-lg shadow-brand-orange-500/25 hover:shadow-brand-orange-500/40"
          >
            Shop All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </section>
    </div>
  )
}

export default Hero
