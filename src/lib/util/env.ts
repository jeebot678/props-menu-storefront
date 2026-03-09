const readRequiredEnv = (key: string) => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const getBaseURL = () => readRequiredEnv("NEXT_PUBLIC_BASE_URL")

export const getDefaultRegion = () =>
  readRequiredEnv("NEXT_PUBLIC_DEFAULT_REGION")
