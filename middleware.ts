import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["en", "mn"] as const;
const defaultLocale = "mn" as const;

function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = acceptLang.split(",")[0]?.split("-")[0];
  return (locales as readonly string[]).includes(preferred)
    ? preferred
    : defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files and API
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return;
  }

  // Protect admin paths: if user has no accessToken cookie, redirect to login
  // but exclude the login and register pages themselves to avoid redirect loops
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/admin/register")
  ) {
    const access = request.cookies.get("accessToken");
    if (!access) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      return NextResponse.redirect(loginUrl);
    }
    // allow through; actual token verification happens server-side in admin layout
  }

  // Don't add locale prefix for admin paths - admin should be language-agnostic
  if (pathname.startsWith("/admin")) {
    return;
  }

  // Also keep auth routes language-agnostic (login/register should not be prefixed)
  if (pathname.startsWith("/auth")) {
    return;
  }

  // Already has a locale
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
