module.exports = ({ env }) => ({
  upload: {
​    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },

  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.hostinger.com'),
        port: env.int('SMTP_PORT', 465), // 465 = SSL
        secure: true, // для 465 = true, для 587 = false
        auth: {
          user: env('SMTP_USER'), // ПОЛНЫЙ адрес почты
          pass: env('SMTP_PASS'), // Пароль почтового ящика
        },
      },
      settings: {
        defaultFrom: env('SUPPORT_EMAIL', env('SMTP_USER')),
        defaultReplyTo: env('SUPPORT_EMAIL', env('SMTP_USER')),
      },
    },
  },
});