"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  productTitle?: string
}

const ImageGallery = ({ images, productTitle }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const imageContainerRef = useRef<HTMLDivElement>(null)
  
  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxScale, setLightboxScale] = useState(1)
  const [lightboxPosition, setLightboxPosition] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const lightboxImageRef = useRef<HTMLDivElement>(null)
  
  const selectedImage = images[selectedIndex]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setZoomPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsZooming(true)
  }

  const handleMouseLeave = () => {
    setIsZooming(false)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    setLightboxScale(1)
    setLightboxPosition({ x: 0, y: 0 })
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    } else {
      setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }
    setLightboxScale(1)
    setLightboxPosition({ x: 0, y: 0 })
  }

  const handleLightboxWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setLightboxScale((prev) => Math.max(1, Math.min(5, prev + delta)))
  }

  const handleLightboxMouseDown = (e: React.MouseEvent) => {
    if (lightboxScale > 1) {
      setIsPanning(true)
      setPanStart({ x: e.clientX - lightboxPosition.x, y: e.clientY - lightboxPosition.y })
    }
  }

  const handleLightboxMouseMove = (e: React.MouseEvent) => {
    if (isPanning && lightboxScale > 1) {
      setLightboxPosition({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      })
    }
  }

  const handleLightboxMouseUp = () => {
    setIsPanning(false)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev')
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, images.length])

  // Touch support for mobile pinch-zoom
  useEffect(() => {
    if (!isLightboxOpen || !lightboxImageRef.current) return

    let initialDistance = 0
    let initialScale = 1

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )
        initialScale = lightboxScale
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        )
        const scale = (distance / initialDistance) * initialScale
        setLightboxScale(Math.max(1, Math.min(5, scale)))
      }
    }

    const element = lightboxImageRef.current
    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isLightboxOpen, lightboxScale])

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image - 3:2 aspect ratio (horizontal) with zoom */}
        <div className="w-full">
          <Container
            ref={imageContainerRef}
            className="relative aspect-square w-full overflow-hidden bg-ui-bg-subtle rounded-lg cursor-zoom-in"
            id={selectedImage?.id}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => openLightbox(selectedIndex)}
          >
            {!!selectedImage?.url && (
              <Image
                src={selectedImage.url}
                priority={true}
                quality={75}
                className={`absolute inset-0 rounded-lg transition-transform duration-200 ${
                  isZooming ? 'scale-[2]' : 'scale-100'
                }`}
                alt={productTitle ? `${productTitle} - Main View` : "Product image"}
                fill
                sizes="(max-width: 576px) 100vw, (max-width: 992px) 60vw, 700px"
                style={{
                  objectFit: "cover",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            )}
          </Container>
        </div>

        {/* Thumbnails - grid layout, up to 12 per row */}
        {images.length > 1 && (
          <div className="w-full">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedIndex(index)}
                  className={`product-thumbnail relative aspect-square overflow-hidden rounded-md transition-all duration-200 ${
                    selectedIndex === index
                      ? "product-thumbnail--active"
                      : "product-thumbnail--inactive"
                  }`}
                  data-active={selectedIndex === index ? "true" : undefined}
                >
                  {!!image.url && (
                    <Image
                      src={image.url}
                      alt={productTitle ? `${productTitle} - Thumbnail ${index + 1}` : `Thumbnail ${index + 1}`}
                      fill
                      sizes="100px"
                      quality={60}
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 text-white"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 text-white"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 text-white"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Main Lightbox Image */}
          <div
            ref={lightboxImageRef}
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            onWheel={handleLightboxWheel}
            onMouseDown={handleLightboxMouseDown}
            onMouseMove={handleLightboxMouseMove}
            onMouseUp={handleLightboxMouseUp}
            onMouseLeave={handleLightboxMouseUp}
          >
            {!!images[lightboxIndex]?.url && (
              <div
                className="relative max-w-[90vw] max-h-[80vh] transition-transform duration-200"
                style={{
                  transform: `scale(${lightboxScale}) translate(${lightboxPosition.x / lightboxScale}px, ${lightboxPosition.y / lightboxScale}px)`,
                }}
              >
                <Image
                  src={images[lightboxIndex].url}
                  alt={productTitle ? `${productTitle} - Image ${lightboxIndex + 1}` : `Image ${lightboxIndex + 1}`}
                  width={1920}
                  height={1920}
                  quality={100}
                  unoptimized={true}
                  loading={lightboxIndex === selectedIndex ? "eager" : "lazy"}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                  style={{
                    pointerEvents: 'none',
                  }}
                />
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-md rounded-lg p-2 max-w-[90vw] overflow-x-auto">
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      setLightboxIndex(index)
                      setLightboxScale(1)
                      setLightboxPosition({ x: 0, y: 0 })
                    }}
                    className={`relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md transition-all duration-200 ${
                      lightboxIndex === index
                        ? "ring-2 ring-white"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {!!image.url && (
                      <Image
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        sizes="64px"
                        quality={60}
                        className="object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Zoom indicator */}
          {lightboxScale > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-md rounded-lg px-4 py-2 text-white text-sm">
              {Math.round(lightboxScale * 100)}%
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ImageGallery
