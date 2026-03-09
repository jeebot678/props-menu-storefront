# Product Page Theming Brief

## Goal
Each individual product page should mirror the visual identity of its game's category page (TF2, GMod, Portal). Same patterns, colors, fonts — but showing a single product instead of a catalog.

## Layout (shared across all themes)
- **Left (60%)**: Main product image with thumbnails below
- **Right (40%)**: Product title, description, variant options, price, add to cart button
- **Below**: Product tabs (info, shipping) and related products
- Layout structure stays the same across all themes — only visual styling differs.

## How it works
1. Product page fetches product's categories via Medusa API
2. `getGameThemeForProduct()` utility determines which theme applies
3. The product template conditionally wraps content in `GameThemeWrapper`
4. Theme-specific CSS handles all visual differences

## Key existing files
- `src/lib/util/game-themes.ts` — theme configs + detection functions
- `src/modules/categories/components/game-theme-wrapper/index.tsx` — background + CSS vars
- `src/modules/products/templates/index.tsx` — current product template
- `src/app/[countryCode]/(main)/products/[handle]/page.tsx` — product page route
- `src/styles/globals.css` — all theme CSS

## Database structure
Products are linked to categories via `product_category_product` table.
Categories: `team-fortress-2`, `garrys-mod`, `portal` (+ TF2 subcategories like `tf2-scout`)
The Medusa API can include `*categories` in the product fields.
