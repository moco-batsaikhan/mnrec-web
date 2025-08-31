import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["en", "mn"] as const;
const defaultLocale = "en" as const;

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang.split(",")[0]?.split("-")[0];
  return (locales as readonly string[]).includes(preferred) ? preferred : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files and API
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return;
  }

  // Already has a locale
  const hasLocale = locales.some(loc => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`));
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
