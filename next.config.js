const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL
const EXTRA_IMAGE_HOSTNAMES = (process.env.NEXT_PUBLIC_IMAGE_DOMAINS || "")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean)

const remotePatterns = []

if (MEDUSA_BACKEND_URL) {
  try {
    const backendUrl = new URL(MEDUSA_BACKEND_URL)
    remotePatterns.push({
      protocol: backendUrl.protocol.replace(":", ""),
      hostname: backendUrl.hostname,
      port: backendUrl.port || undefined,
    })
  } catch {}
}

if (S3_HOSTNAME) {
  remotePatterns.push({
    protocol: "https",
    hostname: S3_HOSTNAME,
    pathname: S3_PATHNAME || undefined,
  })
}

for (const hostname of EXTRA_IMAGE_HOSTNAMES) {
  remotePatterns.push({
    protocol: "https",
    hostname,
  })
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 60, 75],
    remotePatterns,
  },
}

module.exports = nextConfig
