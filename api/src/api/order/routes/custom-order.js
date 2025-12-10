"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders",
      handler: "order.create",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/orders/success",
      handler: "order.success",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/orders/my",
      handler: "order.my",
      config: { auth: false },
    },
  ],
};
