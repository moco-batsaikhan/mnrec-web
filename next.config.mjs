/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for deployment
  output: "standalone",
  images: {
    unoptimized: true, // For static export compatibility
    domains: [],
    // Support for uploaded images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/mn",
      permanent: false,
    },
  ],
  // Ensure public directory is properly served
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
