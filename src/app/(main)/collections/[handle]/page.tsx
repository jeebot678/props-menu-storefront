import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { StoreCollection } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ handle: string }>
  searchParams: Promise<{
    page?: string
    sortBy?: SortOptions
    class?: string
  }>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  if (!collections) {
    return []
  }

  return collections.map((collection: StoreCollection) => ({
    handle: collection.handle,
  }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | Props Menu`,
    description: collection.metadata?.description || `Shop ${collection.title} replica props. Browse authentic collectibles and memorabilia from your favorite films and TV shows.`,
    alternates: {
      canonical: `/collections/${collection.handle}`,
    },
    openGraph: {
      title: `${collection.title} | Props Menu`,
      description: collection.metadata?.description || `Shop ${collection.title} replica props.`,
    },
  } as Metadata

  return metadata
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page, class: classFilter } = searchParams

  const [collection, { collections }] = await Promise.all([
    getCollectionByHandle(params.handle),
    listCollections(),
  ])

  if (!collection) {
    notFound()
  }

  return (
    <CollectionTemplate
      collection={collection}
      collections={collections}
      page={page}
      sortBy={sortBy}
      countryCode="us"
      classFilter={classFilter}
    />
  )
}
