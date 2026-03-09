// Polyfill localStorage for SSR environments
// This runs before any other code

const storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
}

// Apply polyfill immediately
if (typeof globalThis !== "undefined") {
  if (!(globalThis as any).localStorage || typeof (globalThis as any).localStorage?.getItem !== "function") {
    (globalThis as any).localStorage = storage
  }
  if (!(globalThis as any).sessionStorage || typeof (globalThis as any).sessionStorage?.getItem !== "function") {
    (globalThis as any).sessionStorage = storage
  }
}

if (typeof global !== "undefined") {
  if (!(global as any).localStorage || typeof (global as any).localStorage?.getItem !== "function") {
    (global as any).localStorage = storage
  }
  if (!(global as any).sessionStorage || typeof (global as any).sessionStorage?.getItem !== "function") {
    (global as any).sessionStorage = storage
  }
}

export async function register() {
  // Already applied above
}
