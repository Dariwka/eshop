"use strict";
/*** api/order/controllers/order.js*/
const { createCoreController } = require("@strapi/strapi").factories;
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
// ==== helpers ====
/** абсолютный URL для картинок (если нужно отдать Stripe) */
function abs(url) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const base = process.env.STRAPI_URL || "http://localhost:1337";
  return `${base}${url}`;
}
/** генерация кода ваучера */
function genVoucherCode(prefix = "KSM") {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${part}`;
}

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  /** * Создание Stripe Checkout Session * POST /api/orders?slug=... * body: { products: [{ id,title,price,quantity,type,img,desc } ...] } */
  async create(ctx) {
    try {
      const products = (ctx.request.body && ctx.request.body.products) || [];
      if (!Array.isArray(products) || products.length === 0) {
        ctx.response.status = 400;
        return { error: { message: "No products in payload" } };
      } // slug можем получить либо из query, либо из body
      //
      const slug =
        (ctx.request.query && ctx.request.query.slug) ||
        (ctx.request.body && ctx.request.body.slug) ||
        ""; // все позиции — ваучеры?
      //
      const onlyVouchers = products.every((p) => p?.type === "voucher"); // собираем line_items
      //
      const lineItems = await Promise.all(
        products.map(async (product) => {
          // Ваучер по акции — берём имя/цену/картинку из фронта
          //
          if (product?.type === "voucher") {
            return {
              price_data: {
                currency: "eur",
                product_data: {
                  name: product.title || "Voucher",
                  images: product.img ? [abs(product.img)] : [], // Stripe ругается на пустую строку — не отправляем description,
                  //
                  ...(product.desc ? { description: product.desc } : {}),
                },
                unit_amount: Math.round(Number(product.price) * 100),
              },
              quantity: Number(product.quantity || 1),
            };
          } // Обычный товар — подтягиваем из Strapi по id
          //
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id, { populate: { img: true } });
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.title,
                images: item?.img?.url ? [abs(item.img.url)] : [],
                ...(item.desc ? { description: item.desc } : {}),
              },
              unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: Number(product.quantity || 1),
          };
        })
      ); // базовый payload
      //
      const sessionPayload = {
        payment_method_types: ["card", "klarna"],
        mode: "payment",
        cancel_url: `${
          process.env.CLIENT_URL || "http://localhost:3000"
        }/cancel-payment`,
        line_items: lineItems,
      }; // разные success_url
      //
      if (onlyVouchers) {
        // ВАУЧЕРЫ: ведём на страницу, которая откроет бронирование//
        sessionPayload.success_url =
          `${
            process.env.CLIENT_URL || "http://localhost:3000"
          }/checkout-success-payment` +
          `?session_id={CHECKOUT_SESSION_ID}&slug=${encodeURIComponent(slug)}`;
      } else {
        // ТОВАРЫ: обычный success
        //
        sessionPayload.success_url = `${
          process.env.CLIENT_URL || "http://localhost:3000"
        }/checkout-success?session_id={CHECKOUT_SESSION_ID}`;
        // пример доставки — если нужна
        //
        Object.assign(sessionPayload, {
          shipping_address_collection: { allowed_countries: ["FI"] },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 1090, currency: "eur" },
                display_name: "Parcel Locker",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 2 },
                  maximum: { unit: "business_day", value: 4 },
                },
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "eur" },
                display_name: "FREE shipping if total amount > 100 €",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 5 },
                  maximum: { unit: "business_day", value: 7 },
                },
              },
            },
          ],
        });
      }
      // создаём чек-аут//
      const session = await stripe.checkout.sessions.create(sessionPayload);
      // сохраняем заказ в Strapi//
      await strapi.service("api::order.order").create({
        data: {
          products,
          // можно хранить как массив (Strapi v4 позволяет JSON)//
          stripeId: session.id, // {CHECKOUT_SESSION_ID}
          //
          paymentIntentId: session.payment_intent || null,
          isVoucherOnly: onlyVouchers,
          slugAtPurchase: slug || null,
        },
      });
      return { stripeSession: session };
    } catch (error) {
      strapi.log.error("Order create error:", error);
      ctx.response.status = 500;
      return { error: { message: "Internal Server Error" } };
    }
  },
  /** * Success-обработчик: * GET /api/orders/success?session_id=... * 1) читает Stripe Session * 2) находит order * 3) если ваучер — создаёт Voucher + шлёт письмо */ async success(
    ctx
  ) {
    const sessionId =
      ctx.request.query?.session_id || ctx.request.body?.session_id || null;
    if (!sessionId) {
      ctx.response.status = 400;
      return { error: { message: "session_id is required" } };
    }
    strapi.log.info(`[orders/success] start, session_id=${sessionId}`);
    try {
      // Находим order по StripeId
      //
      const found = await strapi.entityService.findMany("api::order.order", {
        filters: { stripeId: sessionId },
        limit: 1,
      });
      const order = Array.isArray(found) ? found[0] : found;
      if (!order) {
        strapi.log.warn(
          `[orders/success] order not found for session_id=${sessionId}`
        );
        ctx.response.status = 404;
        return { error: { message: "Order not found by session_id" } };
      } // Тянем Stripe Session
      //
      let session = null;
      try {
        session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["payment_intent", "customer"],
        });
      } catch (e) {
        strapi.log.warn(
          `[orders/success] stripe session retrieve failed: ${e.message}`
        );
      } // Определяем тип/slug, если не сохранены
      //
      let isVoucherOnly = order?.isVoucherOnly;
      let slug = order?.slugAtPurchase;
      if (typeof isVoucherOnly === "undefined") {
        let productsParsed;
        try {
          productsParsed = Array.isArray(order?.products)
            ? order.products
            : JSON.parse(order?.products || "[]");
        } catch {
          productsParsed = [];
        }
        isVoucherOnly = productsParsed.every((p) => p?.type === "voucher");
        if (!slug) slug = productsParsed?.[0]?.slug || null;
      }
      strapi.log.info(
        `[orders/success] order id=${
          order.id
        }, isVoucherOnly=${isVoucherOnly}, slug=${slug || "-"}`
      ); // Проверяем оплату
      //
      const paid =
        session?.payment_status === "paid" ||
        session?.status === "complete" ||
        !!order.paymentIntentId;
      if (!paid) {
        strapi.log.warn(
          `[orders/success] payment not completed: status=${
            session?.payment_status || session?.status
          }`
        );
        ctx.response.status = 400;
        return { error: { message: "Payment not completed" } };
      } // ===== ВАУЧЕР =====
      //
      if (isVoucherOnly) {
        // берём первую позицию из order.products//
        let basket;
        try {
          basket = Array.isArray(order?.products)
            ? order.products
            : JSON.parse(order?.products || "[]");
        } catch {
          basket = [];
        }
        const p0 = basket[0] || {};

        const treatmentId = p0.id || null;
        // подтянем treatment (ради voucherValidDays / цены)
        //
        const treatment = treatmentId
          ? await strapi.db
              .query("api::treatment.treatment")
              .findOne({ where: { id: treatmentId } })
          : null;
        const voucherDays = Number(treatment?.voucherValidDays || 30);
        const now = new Date();
        const validToDate = new Date(
          now.getTime() + voucherDays * 24 * 60 * 60 * 1000
        );
        const buyerEmail =
          order.email ||
          session?.customer_details?.email ||
          session?.customer_email ||
          null;

        const paymentIntentId =
          typeof session?.payment_intent === "string"
            ? session.payment_intent
            : session?.payment_intent?.id || order?.paymentIntentId || null;
        ("");
        strapi.log.info(`[orders/success] paymentIntentId=${paymentIntentId}`);
        const voucher = await strapi.entityService.create(
          "api::voucher.voucher",
          {
            data: {
              code: genVoucherCode(),
              status: "active",
              treatment: treatmentId || null,
              priceOriginal: treatment?.price ?? null,
              pricePaid:
                session?.amount_total != null
                  ? Math.round(session.amount_total / 100)
                  : null,
              currency: (session?.currency || "EUR").toUpperCase(),
              validFrom: now.toISOString(),
              validTo: validToDate.toISOString(),
              buyerName: null,
              buyerEmail: buyerEmail,
              recipientEmail: buyerEmail,
              paymentProvider: "stripe",
              paymentIntentId,
              paymentStatus: "succeeded",
              maxRedemptions: 1,
              redemptions: 0,
            },
            populate: ["treatment"],
          }
        );
        strapi.log.info(
          `[orders/success] voucher created id=${voucher.id} code=${voucher.code}`
        ); // Письмо покупателю
        //
        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        const bookingLink = slug
          ? `${clientUrl}/treatment/${encodeURIComponent(
              slug
            )}?openBooking=1&voucher=1`
          : `${clientUrl}/treatments`;
        if (buyerEmail) {
          const voucherDaysTextFi = `${voucherDays} päivää`;
          const validFromFi = now.toLocaleDateString("fi-FI");
          const validToFi = validToDate.toLocaleDateString("fi-FI");
          const subjectFi = "Vahvistus: Hoitovoucher ostettu";
          const logoUrl = `${
            process.env.CLIENT_URL || "http://localhost:3000"
          }/img/logo.png`;
          // fallback plain-text
          const textFi = [
            "Hei!",
            "",
            "Kiitos ostostasi KosmediKissa. Vahvistamme, että maksu on vastaanotettu.",
            "",
            `Voucher: ${p0.title || "Hoitolahjakortti"}`,
            `Koodi: ${voucher.code}`,
            `Maksettu: ${p0.price ?? ""} €`,
            `Voimassa: ${validFromFi} - ${validToFi} (${voucherDaysTextFi} ostopäivästä lukien)`,
            `Varaa hoitoaika tästä: ${bookingLink}`,
            "",
            "Ehdot:",
            "- Voucher on henkilökohtainen eikä sitä voi vaihtaa rahaksi.",
            "- Voucher on käytettävä voimassaoloaikana.",
            "- Yksi varaus per voucher.",
            "- Mikäli varaus perutaan eikä uutta aikaa sovita, voucher katsotaan käytetyksi.",
            "",
            "Ystävällisin terveisin, KosmediK",
          ].join("\n");
          const htmlFi =
            `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f7f9;padding:24px;font-family:Arial, Helvetica, sans-serif;"> <tr>  <td align="center">   <table width="640" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:12px;overflow:hidden;">    
            <tr>     
            <td style="background:#2e7d32;padding:24px 28px;color:#ffffff;">      
            <div style="text-align:center;">       
            ${
              logoUrl
                ? `<img src="${logoUrl}" alt="KosmediK" style="max-width:160px;height:auto;display:block;margin:0 auto 12px;" />`
                : ""
            }      
            </div>      
            <h1 style="margin:0;font-size:20px;line-height:1.3;">Vahvistus: Hoitovoucher ostettu</h1>     
            </td>    
            </tr>
    <tr>     
    <td style="padding:24px 28px;color:#111827;font-size:15px;">      
    <p style="margin:0 0 16px 0;">Hei!</p>      
    <p style="margin:0 0 20px 0;">Kiitos ostostasi KosmediKissa. Vahvistamme, että maksu on vastaanotettu.</p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">       
      <tr>        
      <td style="padding:8px 0;color:#6b7280;width:140px;">Voucher</td>        
      <td style="padding:8px 0;color:#111827;font-weight:700;">${
        p0.title || "Hoitolahjakortti"
      }</td>       
      </tr>       
      <tr>        
      <td style="padding:8px 0;color:#6b7280;">Koodi</td>        
      <td style="padding:8px 0;"><span style="letter-spacing:1px;font-weight:700;color:#2e7d32;">${
        voucher.code
      }</span></td>       
      </tr>       
      <tr>        
      <td style="padding:8px 0;color:#6b7280;">Maksettu</td>        
      <td style="padding:8px 0;">${p0.price ?? ""} €</td>       
      </tr>       
      <tr>        
      <td style="padding:8px 0;color:#6b7280;">Voimassa</td>        
      <td style="padding:8px 0;">${validFromFi} - ${validToFi} <span style="color:#6b7280;">(${voucherDaysTextFi} ostopäivästä lukien)</span></td>       
      </tr>      
      </table>
      <div style="text-align:center;margin:24px 0 8px;">       
      <a href="${bookingLink}"        
      style="background:#2e7d32;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:700;display:inline-block;">        
      Varaa hoitoaika       
      </a>      
      </div>
      <h3 style="margin:24px 0 8px 0;color:#111827;font-size:16px;">Ehdot:</h3>      
      <ul style="margin:0 0 12px 18px;padding:0;color:#111827;">       
      <li>Voucher on henkilökohtainen eikä sitä voi vaihtaa rahaksi.</li>       
      <li>Voucher on käytettävä voimassaoloaikana.</li>       
      <li>Yksi varaus per voucher.</li>       
      <li>Mikäli varaus perutaan eikä uutta aikaa sovita, voucher katsotaan käytetyksi.</li>      </ul>
      <p style="margin:20px 0 0 0;color:#6b7280;font-size:12px;">Tämä on automaattinen viesti, ethän vastaa tähän sähköpostiin.</p>     
      </td>    
      </tr>
    <tr>     
    <td style="padding:16px 28px;background:#f0f4f3;color:#374151;font-size:13px;">      Ystävällisin terveisin,<br/>KosmediK     
    </td>    
    </tr>   
    </table>  
    </td> 
    </tr></table>`.trim();
          try {
            await strapi
              .plugin("email")
              .service("email")
              .send({
                to: buyerEmail,
                cc: process.env.SALES_CC || undefined,
                from: process.env.SUPPORT_EMAIL || "info@kosmedik.eu",
                subject: subjectFi,
                text: textFi,
                html: htmlFi,
              });
            strapi.log.info(
              `[orders/success] email sent to ${buyerEmail} code=${voucher.code}`
            );
            await strapi.entityService.update(
              "api::voucher.voucher",
              voucher.id,
              { data: { emailSentAt: new Date() } }
            );
          } catch (e) {
            strapi.log.error(
              `[orders/success] email send failed: ${e.message}`
            );
          }
        } else {
          strapi.log.warn(
            "[orders/success] buyer email not found, email not sent"
          );
        }
        return {
          ok: true,
          kind: "voucher_order",
          voucher: { id: voucher.id, code: voucher.code },
        };
      }
      try {
        // Разбираем корзину
        let basket = [];
        try {
          basket = Array.isArray(order?.products)
            ? order.products
            : JSON.parse(order?.products || "[]");
        } catch (_) {
          basket = [];
        }
        const buyerEmail =
          order.email ||
          session?.customer_details?.email ||
          session?.customer_email ||
          null;

        const buyerName =
          session?.customer_details?.name || order?.name || null;
        const address = session?.customer_details?.address || {};
        const addressLines = [
          address?.line1,
          address?.line2,
          [address?.postal_code, address?.city].filter(Boolean).join(" "),
          address?.country,
        ]
          .filter(Boolean)
          .join(", ");
        const currency = (session?.currency || "EUR").toUpperCase();
        const amountTotal =
          session?.amount_total != null
            ? Math.round(session.amount_total / 100)
            : null;

        const logoUrl = `${
          process.env.CLIENT_URL || "http://localhost:3000"
        }/img/logo.png`;
        const orderNumber = order.id;
        if (buyerEmail) {
          const subjectFi = "Vahvistus: Tilauksesi vastaanotettu";
          // Текстовая версия//
          const textFi = [
            "Hei!",
            "",
            "Kiitos ostoksestasi KosmediKissa. Vahvistamme, että maksu on vastaanotettu.",
            "",
            `Tilausnumero: ${orderNumber}`,
            buyerName ? `Asiakas: ${buyerName}` : null,
            buyerEmail ? `Sähköposti: ${buyerEmail}` : null,
            addressLines ? `Toimitusosoite: ${addressLines}` : null,
            "",
            "Tuotteet:",
            ...basket.map(
              (i) =>
                `• ${i.title || i.name || "Tuote"} x${i.quantity || 1} — ${
                  i.price ?? ""
                } ${currency}`
            ),
            "",
            amountTotal != null
              ? `Maksettu yhteensä: ${amountTotal} ${currency}`
              : null,
            "",
            "Ystävällisin terveisin, KosmediK",
          ]
            .filter(Boolean)
            .join("\n");
          // HTML версия
          //
          const rowsHtml = basket
            .map(
              (i) => `
            <tr>
            <td style="padding:8px 0;color:#111827;">${
              i.title || i.name
            }</td>     
            <td style="padding:8px 0;text-align:center;color:#111827;">${
              i.quantity || 1
            }</td>     
            <td style="padding:8px 0;text-align:right;color:#111827;">${
              i.price ?? ""
            } ${currency}</td>    
            </tr>`
            )
            .join("");
          const htmlFi =
            `<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7FB;padding:24px;font-family:Arial,Helvetica,sans-serif;"><tr><td align="center"><table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;"><!-- Шапка --><tr><td style="background:#2e7d32;padding:20px 24px;text-align:center;"><img src="${logoUrl}" alt="KosmediK" width="120" style="display:block;margin:0 auto 12px;" /><h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">Vahvistus: Tilauksesi vastaanotettu</h1></td></tr>
<!-- Контент -->
<tr><td style="padding:24px;color:#111827;font-size:15px;line-height:1.6;"><p style="margin:0 0 12px;">Hei${
              buyerName ? `, ${buyerName}` : ""
            }!</p><p style="margin:0 0 20px;">Kiitos ostoksestasi KosmediKissa.</p><p style="margin:0 0 8px;color:#6b7280;">Tilausnumero: <strong>${orderNumber}</strong></p>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:16px 0;"><thead><tr><th align="left" style="padding:8px 0;color:#6b7280;">Tuote</th><th align="center" style="padding:8px 0;color:#6b7280;">Määrä</th><th align="right" style="padding:8px 0;color:#6b7280;">Hinta</th></tr></thead><tbody>${
              rowsHtml ||
              `<tr><td colspan="3" style="padding:8px 0;color:#6b7280;text-align:center;">Ei tuotteita</td></tr>`
            }</tbody></table>
<p style="margin:12px 0 0;font-weight:700;font-size:16px;">Maksettu yhteensä: ${
              amountTotal ?? "-"
            } ${currency}</p>
${
  addressLines
    ? `<p style="margin:16px 0 0;color:#6b7280;font-size:14px;">Toimitusosoite: ${addressLines}</p>`
    : ""
}
<p style="margin:20px 0 0;color:#9ca3af;font-size:12px;">Tämä on automaattinen viesti, ethän vastaa tähän sähköpostiin.</p></td></tr>
<!-- Подвал --><tr><td style="padding:16px 24px;background:#f0f4f3;color:#374151;font-size:13px;">Ystävällisin terveisin,<br/>KosmediK</td></tr></table></td></tr></table>`.trim();
          try {
            await strapi
              .plugin("email")
              .service("email")
              .send({
                to: buyerEmail,
                cc: process.env.SALES_CC || undefined,
                from: process.env.SUPPORT_EMAIL || "info@kosmedik.eu",
                subject: subjectFi,
                text: textFi,
                html: htmlFi,
              });
            strapi.log.info(
              `[orders/success] product email sent to ${buyerEmail} order=${orderNumber}`
            );
          } catch (e) {
            strapi.log.error(
              `[orders/success] email send failed (product): ${e.message}`
            );
          }
        } else {
          strapi.log.warn(
            "[orders/success] buyer email not found, product email not sent"
          );
        }
      } catch (e) {
        strapi.log.error(
          `[orders/success] product email section failed: ${e.message}`
        );
      }
      // ===== ОБЫЧНЫЙ ТОВАР =====//
      return { ok: true, kind: "product_order" };
    } catch (err) {
      strapi.log.error(`[orders/success] error: ${err.message}`, err);
      ctx.response.status = 500;
      return { error: { message: "Internal Server Error" } };
    }
  },
}));
