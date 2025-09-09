module.exports = {
  output: "export",
  redirects: async () => [
    {
      source: "/",
      destination: "/mn",
      permanent: false,
    },
  ],
};
