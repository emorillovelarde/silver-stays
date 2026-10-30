import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import type { Locale } from "./i18n/request";

const intlMiddleware = createIntlMiddleware(routing);

// Maintenance mode: set MAINTENANCE_MODE=true in Vercel and redeploy to close
// the public site. Every page is answered with the holding page except the
// legal pages, which existing subscribers must still be able to read.
const MAINTENANCE_PAGE = "/maintenance";
const MAINTENANCE_ALLOWED = [
  "/legal-notice",
  "/privacy-policy",
  "/cookie-policy",
  "/aviso-legal",
  "/politica-privacidad",
  "/politica-cookies",
];

function maintenanceResponse(request: NextRequest): NextResponse | null {
  if (process.env.MAINTENANCE_MODE !== "true") return null;

  const [locale, ...rest] = request.nextUrl.pathname.split("/").filter(Boolean);
  // Paths without a locale go through next-intl first, which redirects them
  // to a localised path; that second request lands here.
  if (!routing.locales.includes(locale as Locale)) return null;
  if (MAINTENANCE_ALLOWED.includes(`/${rest.join("/")}`)) return null;

  const target = `/${locale}${MAINTENANCE_PAGE}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", target);
  // This rewrite skips next-intl's middleware, which normally passes the
  // locale to the server components through this header.
  requestHeaders.set("X-NEXT-INTL-LOCALE", locale);
  return NextResponse.rewrite(new URL(target, request.url), {
    status: 503,
    request: { headers: requestHeaders },
  });
}

function isAdminPath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  // /<locale>/admin/...  → segments[1] === "admin"
  // /admin/...           → segments[0] === "admin"
  return segments[0] === "admin" || segments[1] === "admin";
}

function isAdminLoginPath(pathname: string): boolean {
  return pathname.includes("/admin/login");
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminPath(pathname)) {
    // Allow the login page itself through without auth
    if (isAdminLoginPath(pathname)) {
      return intlMiddleware(request);
    }

    // Create a Supabase client bound to the request cookies
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            for (const { name, value } of cookiesToSet) {
              request.cookies.set(name, value);
            }
            response = NextResponse.next({ request });
            for (const { name, value, options } of cookiesToSet) {
              response.cookies.set(name, value, options);
            }
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const locale =
        pathname.split("/").filter(Boolean)[0] ?? routing.defaultLocale;
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  const maintenance = maintenanceResponse(request);
  if (maintenance) return maintenance;

  const response = intlMiddleware(request);
  // Expose pathname to server components so layouts can opt out of chrome
  (response as import("next/server").NextResponse).headers.set(
    "x-pathname",
    pathname,
  );
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
