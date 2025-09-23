"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/feeds/sitemap.xml",
      handler: "sitemap.index",
      config: {
        auth: false,
      },
    },
  ],
};
