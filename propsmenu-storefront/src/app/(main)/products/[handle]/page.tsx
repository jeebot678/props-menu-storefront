import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import ProductTemplate from "@modules/products/templates"
import RefinementList from "@modules/store/components/refinement-list"
import GameSidebar from "@modules/categories/components/game-sidebar"
import { getGameThemeForProduct } from "@lib/util/game-themes"
import GameThemeWrapper from "@modules/categories/components/game-theme-wrapper"
import { HttpTypes } from "@medusajs/types"

type Props = {
  params: Promise<{ handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export async function generateStaticParams() {
  try {
    const { response } = await listProducts({
      countryCode: "us",
      queryParams: { limit: 100, fields: "handle" },
    })

    return response.products
      .filter((product) => product.handle)
      .map((product) => ({
        handle: product.handle,
      }))
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct | undefined,
  selectedVariantId?: string
) {
  if (!product) {
    return []
  }

  if (!selectedVariantId || !product.variants) {
    return product.images ?? []
  }

  const variant = product.variants.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images?.length) {
    return product.images ?? []
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return (product.images ?? []).filter((i) => imageIdsMap.has(i.id))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion("us")

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: "us",
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Props Menu`,
    description: product.description || `Shop ${product.title} replica prop at Props Menu. High-quality collectible from your favorite films and TV shows.`,
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      title: `${product.title} | Props Menu`,
      description: product.description || `Shop ${product.title} replica prop at Props Menu.`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion("us")
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: "us",
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  if (!pricedProduct) {
    notFound()
  }

  const categories = await listCategories()
  const theme = getGameThemeForProduct(pricedProduct)

  // Find the most specific (deepest) category for sidebar highlighting
  const productCategories = (pricedProduct.categories || []) as HttpTypes.StoreProductCategory[]
  const activeCategoryHandle = productCategories
    .filter(c => c.parent_category_id || c.parent_category)
    .map(c => c.handle)[0]
    || productCategories.map(c => c.handle)[0]
    || null

  const page = (
    <div className="py-6 content-container" data-theme={theme?.slug}>
      <div>
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Sidebar — positioned to the left of centered content, identical to category pages */}
          <div className="hidden small:block absolute right-full mr-6 top-0" style={{ width: '220px' }}>
            <div className="sticky top-24">
              {theme ? (
                <GameSidebar theme={theme}>
                  <RefinementList sortBy="price_asc" categories={categories} activeCategoryHandle={activeCategoryHandle} />
                </GameSidebar>
              ) : (
                <RefinementList sortBy="price_asc" categories={categories} activeCategoryHandle={activeCategoryHandle} />
              )}
            </div>
          </div>

          {/* Product content */}
          <ProductTemplate
            product={pricedProduct}
            region={region}
            countryCode="us"
            images={images}
          />
        </div>
      </div>
    </div>
  )

  if (theme) {
    return <GameThemeWrapper theme={theme}>{page}</GameThemeWrapper>
  }
  return page
}
