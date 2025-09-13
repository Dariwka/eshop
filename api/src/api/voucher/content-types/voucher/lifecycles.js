"use strict";
const coerceMoney = (v) => (v == null ? null : Number(v));
const applyDefaults = (data) => {
  // Дефолты и коэрсинг чисел
  if (data.discountValue == null) data.discountValue = 0; // ← UI не дал 0? ставим тут
  if (data.maxRedemptions == null) data.maxRedemptions = 1;
  if (data.redemptions == null) data.redemptions = 0;
  // Динамическое "сейчас" для validFrom, если не задано
  if (!data.validFrom) data.validFrom = new Date().toISOString();
  // Приведение денежных полей к числу (на всякий случай)
  data.priceOriginal = coerceMoney(data.priceOriginal);
  data.discountValue = coerceMoney(data.discountValue);
  data.pricePaid = coerceMoney(data.pricePaid);
  // Статус по умолчанию
  if (!data.status) data.status = "active"; // или "pending" — по твоей логике
};

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    applyDefaults(data);
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    if (!data) return; // При обновлении тоже подстрахуем
    if (data.discountValue == null) data.discountValue = 0;
    if (data.maxRedemptions == null) data.maxRedemptions = 1;
    if (data.redemptions == null) data.redemptions = 0;
  },
};
