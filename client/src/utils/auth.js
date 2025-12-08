export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    const user = JSON.parse(raw);
    const jwt = localStorage.getItem("jwt");

    // Вернём пользователя + jwt (если есть)
    return jwt ? { ...user, jwt } : user;
  } catch (e) {
    console.error("getCurrentUser parse error", e);
    return null;
  }
}

export function isProUser() {
  const user = getCurrentUser();
  return !!user?.isPro; // важно: именно user.isPro из Strapi
}
