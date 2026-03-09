import { NextRequest, NextResponse } from "next/server"

/**
 * Simplified middleware — no country code routing.
 * Just ensures the _medusa_cache_id cookie is set.
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const cacheIdCookie = request.cookies.get("_medusa_cache_id")

  if (!cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", crypto.randomUUID(), {
      maxAge: 60 * 60 * 24,
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
