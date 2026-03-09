/**
 * Smart two-line title splitter.
 * Finds the best break point so both lines are roughly balanced,
 * while keeping short words (≤3 chars like "Co.", "&", "of") 
 * grouped with their neighbor.
 *
 * Returns [line1, line2] or [fullTitle] if splitting doesn't make sense.
 */
export function splitTitle(title: string): [string] | [string, string] {
  const words = title.split(/\s+/)

  // Don't split single-word titles
  if (words.length <= 1) return [title]

  // For 2-word titles, split if both words are substantial (4+ chars)
  if (words.length === 2) {
    if (words[0].length >= 4 && words[1].length >= 4) {
      return [words[0], words[1]]
    }
    return [title]
  }

  // For 3+ words: find the best split point near the middle
  const totalLen = title.length
  const targetMid = totalLen / 2

  let bestSplit = 1
  let bestDiff = Infinity

  // Try each possible split point between words
  for (let i = 1; i < words.length; i++) {
    const left = words.slice(0, i).join(" ")
    const right = words.slice(i).join(" ")

    // Penalize splits that isolate a short word (≤3 chars like "Co.", "&", "of")
    // at the boundary — heavier penalty for end of line 1 (looks worse dangling)
    const lastWordLeft = words[i - 1]
    const firstWordRight = words[i]
    const shortPenalty =
      (lastWordLeft.length <= 3 ? 40 : 0) +
      (firstWordRight.length <= 3 ? 15 : 0)

    const diff = Math.abs(left.length - targetMid) + shortPenalty

    if (diff < bestDiff) {
      bestDiff = diff
      bestSplit = i
    }
  }

  const line1 = words.slice(0, bestSplit).join(" ")
  const line2 = words.slice(bestSplit).join(" ")

  return [line1, line2]
}
