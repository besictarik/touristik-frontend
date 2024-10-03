import { NextRequest, NextResponse } from "next/server";
import { getLocale, locales } from "@/lib/utils";

//  Might get refactored, 'en' -> '/'
//  In that case getting moved to page and getting redirected by fetch api
export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Should secure potential unwanted params
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
