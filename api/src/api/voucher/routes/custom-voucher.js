"use strict";
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/vouchers/webhook/stripe",
      handler: "voucher.webhookStripe",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/vouchers/for-session",
      handler: "voucher.findBySession",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/vouchers/redeem",
      handler: "voucher.redeem",
      config: { auth: false },
    }, // опционально, если используешь ручную проверку кода
    //
    {
      method: "GET",
      path: "/vouchers/validate",
      handler: "voucher.validate",
      config: { auth: false },
    },
  ],
};
