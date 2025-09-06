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

export function formatCountdown(ms) {
  if (!ms || ms <= 0) return null;
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const hrs = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  return days > 0 ? `${days}d ${hrs}h ${mins}m` : `${hrs}h ${mins}m`;
}

export function formatCountdownParts(ms) {
  if (ms == null || ms <= 0) return null;
  const total = Math.floor(ms / 1000);
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600) % 24;
  const d = Math.floor(total / 86400);
  return { d, h, m, s };
}
