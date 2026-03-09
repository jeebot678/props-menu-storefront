"use client"

import { useState } from "react"
import { Text } from "@medusajs/ui"

type Props = {
  description: string
}

export default function ProductDescriptionToggle({ description }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div data-testid="product-description-wrapper">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-2 text-sm font-semibold text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
        data-testid="description-toggle"
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▸
        </span>
        Description
      </button>
      {isOpen && (
        <Text
          className="text-medium text-ui-fg-subtle whitespace-pre-line mt-3"
          data-testid="product-description"
        >
          {description}
        </Text>
      )}
    </div>
  )
}
