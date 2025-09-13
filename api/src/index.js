"use strict";

const slugify = require("slugify");

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    strapi.log.info("[slug backfill] starting...");
    const products = await strapi.db.query("api::product.product").findMany({
      where: { slug: null },
    });

    for (const p of products) {
      const newSlug = slugify(p.title, { lower: true, strict: true });
      await strapi.db.query("api::product.product").update({
        where: { id: p.id },
        data: { slug: newSlug },
      });
    }

    strapi.log.info(
      `[slug backfill] done. Updated ${products.length} products`
    );
  },
};
