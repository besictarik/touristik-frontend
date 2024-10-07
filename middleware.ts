import { NextRequest, NextResponse } from "next/server";
import { getLocale, locales } from "@/lib/utils";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const cookiesConsent = request.cookies.get("cookiesConsent")?.value;
  const cookiesAccepted = cookiesConsent === "agree-to-all";

  const cookiesLocale = cookiesAccepted
    ? request.cookies.get("lang")?.value
    : undefined;

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  const response = NextResponse.next();

  // If a locale is found in the pathname
  if (pathnameLocale) {
    // If the cookie matches the locale, continue
    if (cookiesLocale === pathnameLocale) return response;

    // Set the cookie to the new locale
    if (cookiesAccepted) response.cookies.set("lang", pathnameLocale);
    return response; // Return the modified response
  }

  // If no locale in the pathname, check the cookie
  if (cookiesLocale) {
    request.nextUrl.pathname = `/${cookiesLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // If no locale found, determine the default locale
  const locale = getLocale(request);
  if (cookiesAccepted) response.cookies.set("lang", locale);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|sitemap.xml|robots.txt|[a-z]{2}/icon\\.ico).*)",
  ],
};
