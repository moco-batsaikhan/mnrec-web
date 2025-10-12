module.exports = {
  // Temporarily commented out for admin development
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // For static export compatibility
    domains: [],
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
};
