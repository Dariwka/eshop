module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // ...
});

// ./config/plugins.js//
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.hostinger.com"),
        port: env.int("SMTP_PORT", 465), // 465 SSL (рекомендую). 587 -> secure:false
        secure: true, // true для 465; если 587 — false
        auth: {
          user: env("SMTP_USER"), // ПОЛНЫЙ адрес ящика: info@kosmedik.eu
          pass: env("SMTP_PASS"), // пароль от ящика в Hostinger (не Gmail!)
        },
      },
      settings: {
        defaultFrom: env("SUPPORT_EMAIL", env("SMTP_USER")),
        defaultReplyTo: env("SUPPORT_EMAIL", env("SMTP_USER")),
      },
    },
  },
});
