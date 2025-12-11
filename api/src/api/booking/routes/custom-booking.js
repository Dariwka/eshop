"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/my-bookings",
      handler: "booking.myBookings",
      config: {
        auth: true, // маршрут только для залогиненных
        policies: [],
        middlewares: [],
      },
    },
  ],
};
