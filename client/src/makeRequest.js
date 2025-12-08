import axios from "axios";

// Базовый клиент для Strapi
const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Перехватчик: перед каждым запросом подставляем нужный токен
makeRequest.interceptors.request.use(
  (config) => {
    // 1) Пытаемся взять JWT пользователя (после логина)
    try {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
        return config;
      }
    } catch (e) {
      console.warn("JWT read error:", e);
    }
    // 2) Если JWT нет — как раньше: токен из .env (REACT_APP_API_TOKEN)
    if (process.env.REACT_APP_API_TOKEN) {
      config.headers.Authorization = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default makeRequest;
export { makeRequest };
