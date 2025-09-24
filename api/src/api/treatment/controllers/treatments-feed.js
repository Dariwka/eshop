"use strict";
// helpers
//
const getSite = (strapi) =>
  process.env.FRONTEND_URL ||
  strapi.config.get("server.url") ||
  "https://www.kosmedik.eu";

const abs = (site, url) =>
  !url ? "" : /^https?:\/\//i.test(url) ? url : `${site}${url}`;
const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

module.exports = {
  async index(ctx) {
    const SITE = getSite(strapi);
    // берём опубликованные процедуры
    //
    const items = await strapi.entityService.findMany(
      "api::treatment.treatment",
      {
        publicationState: "live",
        populate: {
          img: { fields: ["url"] },
          img2: { fields: ["url"] },
        },
        // бери те поля, что реально существуют в твоей модели
        //
        fields: ["title", "info", "longDesc", "price", "slug"],
        sort: { updatedAt: "desc" },
        limit: 2000,
      }
    );
    const body = items
      .map((t) => {
        const id = t.id;
        const link = `${SITE}/treatment/${t.slug}`;
        const img1 = abs(SITE, t.img?.url);
        const img2 = abs(SITE, t.img2?.url);
        const price = Number(t.price || 0).toFixed(2);
        const desc = t.longDesc || t.info || "";
        return `<item>
        <g:id>${id}</g:id>
        <g:title><![CDATA[${t.title}]]></g:title>
        <g:description><![CDATA[${desc}]]></g:description>
        <g:link>${link}</g:link>
        ${img1 ? `<g:image_link>${img1}</g:image_link>` : ""}
        ${
          img2
            ? `<g:additional_image_link>${img2}</g:additional_image_link>`
            : ""
        }
         <g:availability>in stock</g:availability>
         <g:price>${price} EUR</g:price>
          <g:brand><![CDATA[KosmeDiK]]></g:brand>
          <g:condition>new</g:condition></item>`;
      })
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
    <title>KosmeDiK Treatments</title>
    <link>${SITE}</link>
    <description>Treatments feed for Google Merchant Center</description>
     ${body}
     </channel></rss>`;
    ctx.set("Content-Type", "application/xml; charset=utf-8");
    ctx.body = xml;
  },
};
