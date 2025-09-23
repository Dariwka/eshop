"use strict";
const getSite = (strapi) =>
  process.env.FRONTEND_URL ||
  strapi.config.get("server.url") ||
  "https://www.kosmedik.eu";

const urlTag = ({ loc, lastmod, priority }) =>
  `<url><loc>${loc}</loc>${
    lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""
  }${priority ? `<priority>${priority}</priority>` : ""}</url>`;
module.exports = {
  async index(ctx) {
    const SITE = getSite(strapi);
    // PRODUCTS
    //
    const products = await strapi.entityService.findMany(
      "api::product.product",
      {
        publicationState: "live",
        fields: ["slug", "updatedAt"],
        sort: { updatedAt: "desc" },
        limit: 5000,
      }
    );
    // TREATMENTS
    //
    const treatments = await strapi.entityService.findMany(
      "api::treatment.treatment",
      {
        publicationState: "live",
        fields: ["slug", "updatedAt"],
        sort: { updatedAt: "desc" },
        limit: 5000,
      }
    );
    const body = [
      ...products.map((p) =>
        urlTag({
          loc: `${SITE}/product/${p.slug}`,
          lastmod: p.updatedAt,
          priority: "0.8",
        })
      ),
      ...treatments.map((t) =>
        urlTag({
          loc: `${SITE}/treatment/${t.slug}`,
          lastmod: t.updatedAt,
          priority: "0.7",
        })
      ),
    ].join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
    ctx.set("Content-Type", "application/xml; charset=utf-8");
    ctx.body = xml;
  },
};
