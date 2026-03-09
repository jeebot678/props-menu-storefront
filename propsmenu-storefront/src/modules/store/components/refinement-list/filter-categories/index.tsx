"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { useMemo, useCallback, useState, useRef } from "react"

type FilterCategoriesProps = {
  categories: HttpTypes.StoreProductCategory[]
  activeCategoryHandle?: string | null
}

const HOVER_DELAY_MS = 400

const FilterCategories = ({ categories, activeCategoryHandle }: FilterCategoriesProps) => {
  const pathname = usePathname()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const enterTimerRef = useRef<NodeJS.Timeout | null>(null)
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Check current category from path, or use the explicitly passed active handle
  const pathParts = pathname.split("/")
  const isCategoryPage = pathParts.includes("categories")
  const currentCategoryHandle = activeCategoryHandle || (isCategoryPage ? pathParts[pathParts.length - 1] : null)

  // Build category hierarchy
  const { parentCategories, childrenMap, parentOfCurrent } = useMemo(() => {
    // Desired display order for parent game categories
    const categoryOrder = ["team-fortress-2", "portal", "garrys-mod", "half-life"]
    
    // Parent categories: those without parent_category_id or parent_category
    const parents = categories.filter(c => 
      !c.parent_category_id && !c.parent_category
    ).sort((a, b) => {
      const aIdx = categoryOrder.indexOf(a.handle)
      const bIdx = categoryOrder.indexOf(b.handle)
      if (aIdx === -1) return 1
      if (bIdx === -1) return -1
      return aIdx - bIdx
    })
    
    // Map of parent id -> children
    const childMap = new Map<string, HttpTypes.StoreProductCategory[]>()
    let currentParent: string | null = null
    
    categories.forEach(c => {
      const parentId = c.parent_category_id || c.parent_category?.id
      if (parentId) {
        const existing = childMap.get(parentId) || []
        existing.push(c)
        childMap.set(parentId, existing)
        
        // Track if current category is a child
        if (c.handle === currentCategoryHandle) {
          currentParent = parentId
        }
      }
    })
    
    // Sort children by rank
    childMap.forEach((children, key) => {
      children.sort((a, b) => ((a as any).rank ?? 0) - ((b as any).rank ?? 0))
    })
    
    return { 
      parentCategories: parents, 
      childrenMap: childMap,
      parentOfCurrent: currentParent
    }
  }, [categories, currentCategoryHandle])

  const isActiveCategory = useCallback((handle: string) => {
    return currentCategoryHandle === handle
  }, [currentCategoryHandle])

  const isInActiveTree = useCallback((categoryId: string) => {
    // Check if this category or any of its children is active
    if (parentOfCurrent === categoryId) return true
    const parent = parentCategories.find(p => p.id === categoryId)
    return parent?.handle === currentCategoryHandle
  }, [parentOfCurrent, parentCategories, currentCategoryHandle])

  const handleMouseEnter = useCallback((categoryId: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    enterTimerRef.current = setTimeout(() => {
      setHoveredId(categoryId)
    }, HOVER_DELAY_MS)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current)
      enterTimerRef.current = null
    }
    leaveTimerRef.current = setTimeout(() => {
      setHoveredId(null)
    }, 150)
  }, [])

  return (
    <div className="flex flex-col gap-3 mb-6">
      <LocalizedClientLink
        href="/store"
        data-game-title="true"
        className={clx(
          "text-xl font-semibold transition-colors duration-200",
          !currentCategoryHandle
            ? "text-brand-orange-500"
            : "hover:text-brand-orange-500"
        )}
      >
        All Products
      </LocalizedClientLink>
      {parentCategories.map((category) => {
        const children = childrenMap.get(category.id) || []
        const hasChildren = children.length > 0
        const isActive = isActiveCategory(category.handle)
        const isInTree = isInActiveTree(category.id)
        // Keep expanded if we're viewing this category or one of its children
        const alwaysExpanded = isActive || isInTree
        const isHoverExpanded = hoveredId === category.id
        const showChildren = alwaysExpanded || isHoverExpanded
        
        return (
          <div
            key={category.id}
            onMouseEnter={hasChildren ? () => handleMouseEnter(category.id) : undefined}
            onMouseLeave={hasChildren ? handleMouseLeave : undefined}
          >
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              data-game-title="true"
              className={clx(
                "text-xl font-semibold transition-colors duration-200",
                isActive || isInTree
                  ? "text-brand-orange-500"
                  : "hover:text-brand-orange-500"
              )}
            >
              {category.name}
            </LocalizedClientLink>
            
            {/* Subcategories - show after hover delay OR if in active tree */}
            {hasChildren && (
              <div
                className={clx(
                  "overflow-hidden transition-all duration-200 ease-out",
                  showChildren
                    ? "max-h-[500px] opacity-100" 
                    : "max-h-0 opacity-0"
                )}
              >
                <ul className="flex flex-col gap-1 mt-1 ml-3 pl-2 border-l border-ui-border-base">
                  {children.map((child) => (
                    <li key={child.id}>
                      <LocalizedClientLink
                        href={`/categories/${child.handle}`}
                        className={clx(
                          "text-sm transition-colors duration-200",
                          isActiveCategory(child.handle)
                            ? "text-brand-orange-500 font-medium"
                            : "opacity-60 hover:text-brand-orange-500 hover:opacity-100"
                        )}
                      >
                        {child.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FilterCategories
