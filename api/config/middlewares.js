module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "res.cloudinary.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  // ← единственный парсер тела
  //
  {
    name: "strapi::body",
    config: {
      jsonLimit: "10mb",
      formLimit: "10mb",
      textLimit: "10mb",
      includeUnparsed: true, // нужно для Stripe webhook
      //
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
