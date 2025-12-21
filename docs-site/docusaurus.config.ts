module.exports = {
  title: "CVSmart Pro",
  tagline: "AI-Powered Resume Intelligence Platform",

  url: "http://localhost:3000",
  baseUrl: "/docs/",

  favicon: "img/favicon.ico",

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
      },
    ],
  ],
};
