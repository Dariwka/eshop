"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::booking.booking", ({ strapi }) => ({
  async myBookings(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in");
    }
    try {
      const bookings = await strapi.entityService.findMany(
        "api::booking.booking",
        {
          filters: {
            // теперь связь называется "user"//
            user: user.id,
          },
          populate: { treatment: true, user: true },
          sort: { date: "asc", start: "asc" },
        }
      );
      return bookings;
    } catch (err) {
      strapi.log.error("MY BOOKINGS ERROR:", err);
      return ctx.internalServerError("Service error");
    }
  },
}));
