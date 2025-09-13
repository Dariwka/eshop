"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api:order.order");

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders",
      handler: "order.create",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/orders/success",
      handler: "order.success",
      config: { auth: false },
    },
  ],
};
