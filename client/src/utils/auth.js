export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("getCurrentUser parse error", e);
    return null;
  }
}

export function isProUser() {
  const user = getCurrentUser();
  return !!user?.isPro; // важно: именно user.isPro из Strapi
}
