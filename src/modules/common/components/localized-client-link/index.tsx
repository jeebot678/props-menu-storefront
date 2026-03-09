"use client"

import Link from "next/link"
import React from "react"

/**
 * Simplified link component — no longer prepends country code.
 * Just a thin wrapper around Next.js Link.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
