module.exports = {
  routes: [
    {
      method: "GET",
      path: "/feeds/treatments.xml",
      handler: "treatments-feed.index",
      config: {
        auth: false, // фид публичный
        policies: [],
      },
    },
  ],
};
