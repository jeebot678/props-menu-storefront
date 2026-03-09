import { MetadataRoute } from 'next'
import { listProducts } from '@lib/data/products'
import { listCollections } from '@lib/data/collections'
import { listCategories } from '@lib/data/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://propsmenu.com'

  try {
    let urls: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/store`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ]

    try {
      // Add product pages
      const { response: productsResponse } = await listProducts({
        countryCode: 'us',
        queryParams: { 
          limit: 100, 
          fields: 'handle,updated_at' 
        },
      })

      if (productsResponse?.products) {
        productsResponse.products.forEach(product => {
          if (product.handle) {
            urls.push({
              url: `${baseUrl}/products/${product.handle}`,
              lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
              changeFrequency: 'weekly',
              priority: 0.8,
            })
          }
        })
      }

      // Add collection pages
      const { collections } = await listCollections({
        fields: 'handle,updated_at',
      })

      if (collections) {
        collections.forEach(collection => {
          if (collection.handle) {
            urls.push({
              url: `${baseUrl}/collections/${collection.handle}`,
              lastModified: collection.updated_at ? new Date(collection.updated_at) : new Date(),
              changeFrequency: 'weekly',
              priority: 0.7,
            })
          }
        })
      }

      // Add category pages
      const product_categories = await listCategories()

      if (product_categories) {
        product_categories.forEach(category => {
          if (category.handle) {
            urls.push({
              url: `${baseUrl}/categories/${category.handle}`,
              lastModified: category.updated_at ? new Date(category.updated_at) : new Date(),
              changeFrequency: 'weekly',
              priority: 0.7,
            })
          }
        })
      }
    } catch (error) {
      console.error('Error fetching data for sitemap:', error)
    }

    return urls

  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/store`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]
  }
}
