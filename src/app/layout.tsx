import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { generateOrganizationSchema } from "@lib/util/generate-product-schema"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Props Menu - Premium Film & TV Replica Props",
    template: "%s | Props Menu",
  },
  description: "Shop authentic replica props from your favorite films and TV shows. High-quality collectibles and memorabilia for fans and collectors.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Props Menu",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en" data-mode="dark" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
