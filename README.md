# Props Menu Storefront (Medusa v2 + Next.js 15)

Standalone Medusa v2 storefront built with Next.js 15 (App Router), React 19, and Tailwind CSS.

## Requirements

- Node.js 20+
- npm 10+
- A running Medusa v2 backend

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy env template and set real values:

```bash
cp .env.template .env.local
```

3. Start the development server:

```bash
npm run dev
```

The storefront runs on `http://localhost:8000`.

## Required Environment Variables

- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: Medusa backend URL (for example `http://localhost:9000`)
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`: Medusa publishable API key
- `NEXT_PUBLIC_BASE_URL`: Public storefront URL (local or production)
- `NEXT_PUBLIC_DEFAULT_REGION`: Default region/country code (for example `us`)
- `REVALIDATE_SECRET`: Secret token for any cache revalidation endpoints

## Optional Environment Variables

- `NEXT_PUBLIC_MEDUSA_ADMIN_URL`: Used by onboarding links to open Medusa Admin
- `NEXT_PUBLIC_IMAGE_DOMAINS`: Comma-separated allowlist for external `next/image` hosts
- `MEDUSA_CLOUD_S3_HOSTNAME`, `MEDUSA_CLOUD_S3_PATHNAME`: Optional Medusa Cloud image settings
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`: Required only if using the contact form
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`: SMTP credentials for contact form email
- `CONTACT_FORM_TO_EMAIL`: Destination inbox for contact form submissions

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Set all required environment variables in Vercel Project Settings.
4. Deploy.

Recommended Vercel settings:

- Framework preset: `Next.js`
- Build command: `npm run build`
- Output: default Next.js output
