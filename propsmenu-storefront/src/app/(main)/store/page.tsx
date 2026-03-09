import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Shop All Props",
  description: "Browse our complete collection of replica props from films and TV shows. Find authentic collectibles and memorabilia.",
  alternates: {
    canonical: "/store",
  },
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    category?: string
  }>
}

export default async function StorePage(props: Params) {
  const searchParams = await props.searchParams;
  const { sortBy, page, category } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode="us"
      category={category}
    />
  )
}
