import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

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

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
