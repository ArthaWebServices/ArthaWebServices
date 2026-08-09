import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This frontend is its own project (sibling `backend/` has its own
  // package-lock.json). Pin file tracing to this directory so Next stops
  // trying to infer a monorepo workspace root from the extra lockfile.
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Configure remote image hosts here, e.g. for client logos / case study shots
    // remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  headers: async () => [
    {
      // Basic security + performance headers for the production site
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
};

export default nextConfig;
