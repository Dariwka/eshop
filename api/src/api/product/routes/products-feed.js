module.exports = {
  routes: [
    {
      method: "GET",
      path: "/feeds/products.xml",
      handler: "products-feed.index",
      config: {
        auth: false, // фид публичный
        policies: [],
      },
    },
  ],
};
