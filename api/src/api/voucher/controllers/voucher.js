"use strict";
const { createCoreController } = require("@strapi/strapi").factories;
const stripe = require("stripe")(process.env.STRIPE_KEY);

function isActiveWindow(v) {
  const now = new Date();
  const from = v.validFrom ? new Date(v.validFrom) : null;
  const to = v.validTo ? new Date(v.validTo) : null;
  if (from && now < from) return false;
  if (to && now > to) return false;
  return true;
}
module.exports = createCoreController("api::voucher.voucher", ({ strapi }) => ({
  // ======================== // GET /vouchers/validate?code=XXXX // ========================
  //
  async validate(ctx) {
    const code = String(ctx.request.query.code || "").trim();
    if (!code) return ctx.badRequest("code is required");
    const items = await strapi.entityService.findMany("api::voucher.voucher", {
      filters: { code },
      populate: {
        treatment: { fields: ["id", "title", "slug", "price", "promoPrice"] },
        booking: { fields: ["id"] },
      },
      limit: 1,
    });
    const v = items?.[0];
    if (!v) {
      ctx.body = { valid: false, reason: "NOT_FOUND" };
      return;
    }
    if (!["active", "paid", "unused"].includes(v.status)) {
      ctx.body = {
        valid: false,
        reason: `STATUS_${String(v.status || "").toUpperCase()}`,
      };
      return;
    }
    if (!isActiveWindow(v)) {
      ctx.body = { valid: false, reason: "EXPIRED_WINDOW" };
      return;
    }
    if (
      typeof v.maxRedemptions === "number" &&
      typeof v.redemptions === "number"
    ) {
      if (v.redemptions >= v.maxRedemptions) {
        ctx.body = { valid: false, reason: "NO_REDEMPTIONS_LEFT" };
        return;
      }
    }
    ctx.body = {
      valid: true,
      code: v.code,
      status: v.status,
      remaining: (v.maxRedemptions ?? 1) - (v.redemptions ?? 0),
      validFrom: v.validFrom,
      validTo: v.validTo,
      treatment: v.treatment
        ? {
            id: v.treatment.id,
            title: v.treatment.title,
            slug: v.treatment.slug,
            price: v.treatment.price,
            promoPrice: v.treatment.promoPrice,
          }
        : null,
      priceOriginal: v.priceOriginal,
      pricePaid: v.pricePaid,
      currency: v.currency,
      alreadyBooked: !!v.booking,
    };
  },
  // ======================== // POST /vouchers/webhook/stripe // (упрощённо: без проверки подписи в DEV) // ========================
  //
  async webhookStripe(ctx) {
    try {
      const event = ctx.request.body; // DEV-упрощение
      // Нас интересует завершённая сессия
      //
      if (event?.type !== "checkout.session.completed") {
        ctx.body = { ok: true, skipped: true };
        return;
      }
      const session = event.data.object;
      const sessionId = session.id;
      const paymentIntent = session.payment_intent;
      const currency = session.currency?.toUpperCase() || "EUR";
      const amountTotal = session.amount_total ?? 0;
      // Попробуем вытащить slug из success_url (мы передавали его в query)   // Либо храни его в metadata при создании сессии
      //
      let treatmentSlug = session?.metadata?.treatment_slug || null;
      // Создадим код ваучера
      //
      const code = (session?.id || paymentIntent || Date.now())
        .toString()
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(-12)
        .toUpperCase();
      // Если есть slug — найдём процедуру
      //
      let treatment = null;
      if (treatmentSlug) {
        const found = await strapi.entityService.findMany(
          "api::treatment.treatment",
          {
            filters: { slug: treatmentSlug },
            fields: ["id", "title", "slug", "price", "promoPrice"],
            limit: 1,
          }
        );
        treatment = found?.[0] ?? null;
      }
      // Срок действия — например, 60 дней
      //
      const now = new Date();
      const validTo = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
      // Создаём ваучер
      //
      const created = await strapi.entityService.create(
        "api::voucher.voucher",
        {
          data: {
            code,
            status: "unused", // или "paid"/"active" — как тебе удобнее
            //
            validFrom: now,
            validTo,
            pricePaid: Math.round(amountTotal / 100),
            currency,
            paymentProvider: "stripe",
            paymentIntentId: String(paymentIntent || sessionId),
            paymentStatus: "succeeded",
            maxRedemptions: 1,
            redemptions: 0,
            ...(treatment ? { treatment: treatment.id } : {}),
            sessionId, // поле добавь в модель если хочешь (string)
            //
          },
        }
      );
      ctx.body = { ok: true, voucher: { id: created.id, code: created.code } };
    } catch (err) {
      strapi.log.error("webhookStripe error", err);
      ctx.status = 400;
      ctx.body = { ok: false, error: err.message || "webhook error" };
    }
  },
  // ======================== // GET /vouchers/for-session?session_id=... // ========================
  //
  async findBySession(ctx) {
    const sid = String(ctx.request.query.session_id || "").trim();
    if (!sid) return ctx.badRequest("session_id is required");
    const items = await strapi.entityService.findMany("api::voucher.voucher", {
      filters: { sessionId: sid }, // убедись, что поле sessionId есть в модели Voucher (Text)
      //
      populate: { treatment: { fields: ["slug", "title", "id"] } },
      limit: 1,
    });
    const v = items?.[0];
    if (!v) {
      ctx.notFound("voucher not found for this session");
      return;
    }
    ctx.body = {
      code: v.code,
      treatment: v.treatment
        ? {
            slug: v.treatment.slug,
            title: v.treatment.title,
            id: v.treatment.id,
          }
        : null,
      status: v.status,
    };
  },
  // ======================== // POST /vouchers/redeem { code } // ========================
  //
  async redeem(ctx) {
    const code = String(ctx.request.body.code || "").trim();
    if (!code) return ctx.badRequest("code is required");
    const found = await strapi.entityService.findMany("api::voucher.voucher", {
      filters: { code },
      populate: { treatment: true },
      limit: 1,
    });
    const v = found?.[0];
    if (!v) {
      ctx.notFound("Voucher not found");
      return;
    }
    if (!["unused", "active", "paid"].includes(v.status)) {
      ctx.badRequest("Voucher status does not allow redemption");
      return;
    }
    if (!isActiveWindow(v)) {
      ctx.badRequest("Voucher expired");
      return;
    }
    const remaining = (v.maxRedemptions ?? 1) - (v.redemptions ?? 0);
    if (remaining <= 0) {
      ctx.badRequest("No redemptions left");
      return;
    }
    const now = new Date();
    const updated = await strapi.entityService.update(
      "api::voucher.voucher",
      v.id,
      {
        data: {
          status: remaining - 1 > 0 ? v.status : "used",
          redemptions: (v.redemptions ?? 0) + 1,
          redeemedAt: now,
        },
      }
    );
    ctx.body = {
      ok: true,
      code: updated.code,
      status: updated.status,
      remaining: (v.maxRedemptions ?? 1) - updated.redemptions,
    };
  },
}));
