import { getLocaleHeader } from "@lib/util/get-locale-header"
import Medusa, { FetchArgs, FetchInput } from "@medusajs/js-sdk"

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL

if (!MEDUSA_BACKEND_URL) {
  throw new Error(
    "Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL (or MEDUSA_BACKEND_URL) environment variable."
  )
}

// Polyfill localStorage globally before SDK initialization
const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
}

// Apply polyfill to globalThis for both server and edge runtime
if (typeof globalThis !== "undefined") {
  if (!globalThis.localStorage || typeof globalThis.localStorage.getItem !== "function") {
    (globalThis as any).localStorage = noopStorage
  }
  if (!globalThis.sessionStorage || typeof globalThis.sessionStorage.getItem !== "function") {
    (globalThis as any).sessionStorage = noopStorage
  }
}

// Also apply to global for Node.js
if (typeof global !== "undefined") {
  if (!(global as any).localStorage || typeof (global as any).localStorage?.getItem !== "function") {
    (global as any).localStorage = noopStorage
  }
  if (!(global as any).sessionStorage || typeof (global as any).sessionStorage?.getItem !== "function") {
    (global as any).sessionStorage = noopStorage
  }
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

const originalFetch = sdk.client.fetch.bind(sdk.client)

sdk.client.fetch = async <T>(
  input: FetchInput,
  init?: FetchArgs
): Promise<T> => {
  const headers = init?.headers ?? {}
  let localeHeader: Record<string, string | null> | undefined
  try {
    localeHeader = await getLocaleHeader()
    headers["x-medusa-locale"] ??= localeHeader["x-medusa-locale"]
  } catch {}

  // Ensure publishable API key is included
  if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  }

  const newHeaders = {
    ...localeHeader,
    ...headers,
  }
  init = {
    ...init,
    headers: newHeaders,
  }
  return originalFetch(input, init)
}
