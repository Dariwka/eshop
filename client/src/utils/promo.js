// src/utils/promo.js
export function isPromoActive(attrs) {
  if (!attrs?.promoEnabled) return false;
  const now = new Date();
  const start = attrs?.promoStartsAt ? new Date(attrs.promoStartsAt) : null;
  const end = attrs?.promoEndsAt ? new Date(attrs.promoEndsAt) : null;

  if (start && now < start) return false;
  if (end && now > end) return false;
  return typeof attrs?.promoPrice === "number" && attrs.promoPrice >= 0;
}

export function getActivePrice(attrs) {
  return isPromoActive(attrs) ? attrs.promoPrice : attrs?.price;
}

export function getCountdown(attrs) {
  // Вернёт миллисекунды до конца акции или null
  if (!isPromoActive(attrs) || !attrs?.promoEndsAt) return null;
  const ms = new Date(attrs.promoEndsAt) - new Date();
  return ms > 0 ? ms : null;
}
