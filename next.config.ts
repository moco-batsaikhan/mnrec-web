module.exports = {
  // Temporarily commented out for admin development
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // For static export compatibility
    domains: [],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/mn",
      permanent: false,
    },
  ],
};
