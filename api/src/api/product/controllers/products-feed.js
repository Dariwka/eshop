"use strict";
// Абсолютная ссылка для картинок/линков
//
const getSite = (strapi) =>
  process.env.FRONTEND_URL ||
  strapi.config.get("server.url") ||
  "https://www.kosmedik.eu";

const abs = (site, url) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `${site}${url}`;
};
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

module.exports = {
  async index(ctx) {
    const SITE = getSite(strapi);
    // Берём опубликованные товары + нужные поля/relations
    //
    const items = await strapi.entityService.findMany("api::product.product", {
      publicationState: "live",
      populate: {
        img: { fields: ["url"] },
        img2: { fields: ["url"] },
        brands: { fields: ["title"] },
      },
      fields: ["title", "desc", "price", "stock", "slug"],
      sort: { updatedAt: "desc" },
      limit: 2000,
    });
    const body = items
      .map((p) => {
        // В твоей модели поля плоские (не в attributes), так что обращаемся напрямую:
        //
        const id = p.id;
        const link = `${SITE}/product/${p.slug}`;
        const img1 = abs(SITE, p.img?.url);
        const img2 = abs(SITE, p.img2?.url);
        const price = Number(p.price || 0).toFixed(2);
        const availability = (p.stock || "")
          .toString()
          .toLowerCase()
          .includes("out")
          ? "out of stock"
          : "in stock";
        const brand =
          p.brands?.title || p.brands?.data?.attributes?.title || "KosmeDiK";
        return `
        <item>
        <g:id>${id}</g:id>
        <g:title><![CDATA[${p.title}]]></g:title>
        <g:description><![CDATA[${p.desc || ""}]]></g:description>
        <g:link>${link}</g:link>${
          img1 ? `<g:image_link>${img1}</g:image_link>` : ""
        }${
          img2
            ? `<g:additional_image_link>${img2}</g:additional_image_link>`
            : ""
        }
        <g:availability>${availability}</g:availability>
        <g:price>${price} EUR</g:price>
        <g:brand><![CDATA[${brand}]]></g:brand>
        <g:condition>new</g:condition></item>`;
      })
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
    <title>KosmeDiK Products</title>
    <link>${SITE}</link>
    <description>Product feed for Google Merchant Center</description>${body}
    </channel>
    </rss>`;
    ctx.set("Content-Type", "application/xml; charset=utf-8");
    ctx.body = xml;
  },
};
