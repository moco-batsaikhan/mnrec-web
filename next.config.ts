module.exports = {
  // Temporarily commented out for admin development
  // output: "export",
  trailingSlash: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/mn",
      permanent: false,
    },
  ],
};
