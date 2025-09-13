"use strict";

const { string } = require("@strapi/utils");
const { slugify } = string;

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    const targets = [
      { uid: "api::product.product", title: "title", slug: "slug" },
      { uid: "api::treatment.treatment", title: "title", slug: "slug" },
      { uid: "api::sub-category.sub-category", title: "title", slug: "slug" },
      {
        uid: "api::sub-treat-category.sub-treat-category",
        title: "title",
        slug: "slug",
      },
      { uid: "api::category.category", title: "title", slug: "slug" },
    ];

    for (const c of targets) {
      const rows = await strapi.entityService.findMany(c.uid, {
        filters: { [c.slug]: { $null: true } },
        fields: ["id", c.title, c.slug],
        limit: 1000,
      });

      let updated = 0;
      for (const r of rows) {
        const baseTitle = (r[c.title] || "").toString().trim();
        if (!baseTitle) continue;

        const base = slugify(baseTitle, { lower: true, strict: true });

        const dup = await strapi.entityService.findMany(c.uid, {
          filters: { [c.slug]: base },
          fields: ["id"],
          limit: 1,
        });

        const finalSlug =
          dup.length && dup[0].id !== r.id ? `${base}-${r.id}` : base;

        await strapi.entityService.update(c.uid, r.id, {
          data: { [c.slug]: finalSlug },
        });

        updated++;
      }

      strapi.log.info(`[slug backfill] ${c.uid}: updated ${updated}`);
    }

    strapi.log.info("[slug backfill] DONE");
  },
};
