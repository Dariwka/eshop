"use strict";
module.exports = {
  async manualReset(ctx) {
    try {
      const { email, password } = ctx.request.body;
      // простые проверки//
      if (!email || !password) {
        return ctx.badRequest("Email ja salasana vaaditaan");
      }
      // ищем пользователя по email//
      const user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { email } });
      if (!user) {
        return ctx.badRequest("Käyttäjää ei löytynyt");
      }
      // хэшируем новый пароль через сервис users-permissions//
      const hashedPassword = await strapi
        .service("plugin::users-permissions.user")
        .hashPassword({ password });
      // обновляем пароль пользователя//
      await strapi
        .query("plugin::users-permissions.user")
        .update({ where: { id: user.id }, data: { password: hashedPassword } });
      return ctx.send({ ok: true, message: "Uusi salasana tallennettu" });
    } catch (err) {
      console.error("RESET ERROR:", err);
      return ctx.internalServerError("Palvelinvirhe");
    }
  },
};
