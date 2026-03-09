import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[] }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    limit?: string
  }>
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  return product_categories.map((category: any) => ({
    category: [category.handle],
  }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const title = productCategory.name + " | Props Menu"

    const description = productCategory.description ?? `Browse ${productCategory.name} replica props at Props Menu. Shop authentic collectibles from your favorite films and TV shows.`

    return {
      title: title,
      description,
      alternates: {
        canonical: `/categories/${params.category.join("/")}`,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page, limit } = searchParams

  const [productCategory, allCategories] = await Promise.all([
    getCategoryByHandle(params.category),
    listCategories(),
  ])

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      categories={allCategories}
      sortBy={sortBy}
      page={page}
      limit={limit}
      countryCode="us"
    />
  )
}
