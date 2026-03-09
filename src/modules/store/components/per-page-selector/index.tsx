"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const OPTIONS = [16, 32, 64, 100]

export function PerPageSelector({ current }: { current: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    const newLimit = e.target.value
    params.set("limit", newLimit)
    params.set("page", "1") // reset to page 1 when changing limit
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="per-page-select"
        data-testid="per-page-label"
        className="text-sm whitespace-nowrap"
        style={{ opacity: 0.7 }}
      >
        Per page:
      </label>
      <select
        id="per-page-select"
        data-testid="per-page-select"
        value={current}
        onChange={handleChange}
        className="per-page-dropdown"
      >
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
