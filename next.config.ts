import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/images/silver_stays_premium_terrace.jpg",
        destination: "/images/bluevera_premium_terrace.jpg",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // MailerLite embedded form (winter-guide landing) loads its
            // universal.js from *.mailerlite.com but pulls jQuery, fonts and
            // CSS from its CDN at *.mlcdn.com (e.g. assets.mlcdn.com). Both
            // wildcard and the explicit assets host are listed in case the
            // wildcard ever fails to match. script-src-elem and
            // style-src-elem are set explicitly so we don't depend on the
            // browser falling back to script-src/style-src for <script src>
            // and <link rel="stylesheet">.
            // If the MailerLite form has Google reCAPTCHA spam protection
            // enabled, www.google.com and www.gstatic.com must also be added
            // to script-src and frame-src.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://esm.sh https://challenges.cloudflare.com https://*.mailerlite.com https://*.mlcdn.com https://assets.mlcdn.com",
              "script-src-elem 'self' 'unsafe-inline' https://esm.sh https://challenges.cloudflare.com https://*.mailerlite.com https://*.mlcdn.com https://assets.mlcdn.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.mailerlite.com https://*.mlcdn.com https://assets.mlcdn.com",
              "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.mailerlite.com https://*.mlcdn.com https://assets.mlcdn.com",
              "font-src 'self' https://fonts.gstatic.com https://*.mailerlite.com https://*.mlcdn.com https://assets.mlcdn.com",
              "img-src 'self' https://images.unsplash.com data: https://*.mailerlite.com https://*.mlcdn.com https://assets.mlcdn.com",
              "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com https://*.mailerlite.com https://*.mlcdn.com https://assets.mlcdn.com",
              "frame-src https://challenges.cloudflare.com https://*.mailerlite.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
