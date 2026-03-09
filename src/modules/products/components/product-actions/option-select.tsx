import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  const hasLongLabels = filteredOptions.some((v) => v.length > 10)
  const cols = hasLongLabels ? Math.min(filteredOptions.length, 3) : Math.min(filteredOptions.length, 4)
  const isTight = filteredOptions.length > cols || hasLongLabels

  const sizeClass = isTight
    ? "min-h-[2.5rem] text-xs"
    : filteredOptions.length <= 3
      ? "min-h-[3.5rem] text-base"
      : "min-h-[3rem] text-sm"

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      <div
        className={clx("grid gap-2", { "game-option-grid--compact": isTight })}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                `game-option-btn bg-ui-bg-subtle ${sizeClass} rounded-rounded px-2 py-1.5 leading-tight text-center transition-all ease-in-out duration-150 flex items-center justify-center`,
                {
                  "game-option-btn--active": v === current,
                  "hover:shadow-elevation-card-rest": v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
              data-active={v === current ? "true" : undefined}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
