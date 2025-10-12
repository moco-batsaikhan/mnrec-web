module.exports = {
  // Use standalone output for DigitalOcean/production deployment
  output: "standalone",
  trailingSlash: false, // Set to false for server mode
  images: {
    unoptimized: false, // Enable image optimization in server mode
    domains: ["mnrec.mn", "www.mnrec.mn"],
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
  // Ensure rewrites work correctly
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/mn",
      },
    ];
  },
};
