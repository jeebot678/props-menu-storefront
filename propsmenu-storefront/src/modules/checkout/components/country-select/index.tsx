import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"

import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { HttpTypes } from "@medusajs/types"

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(({ placeholder = "Country", region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  // Only show US and UK
  const ALLOWED_COUNTRIES = ["us", "gb"]
  
  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries
      ?.filter((country) => ALLOWED_COUNTRIES.includes(country.iso_2?.toLowerCase() ?? ""))
      ?.map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }))
      ?.sort((a, b) => {
        // US first, then UK
        if (a.value === "us") return -1
        if (b.value === "us") return 1
        return (a.label ?? "").localeCompare(b.label ?? "")
      })
  }, [region])

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...props}
    >
      {countryOptions?.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
