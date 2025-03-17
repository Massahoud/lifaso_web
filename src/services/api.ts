import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // URL de l'API
const FLUTTER_LOGIN_URL = import.meta.env.VITE_REDIRECT_URL; // URL de l'app Flutter

const api = axios.create({
  baseURL: API_URL,
});

// Fonction pour vérifier si le token est expiré
const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

const isTokenExpired = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  return new Date().getTime() / 1000 > decoded.exp;
};

// Intercepteur pour ajouter le token aux requêtes et gérer son expiration
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired()) {
      localStorage.removeItem("token");

      // URL complète de l'application React avant redirection
      const currentUrl = window.location.href;

      // Rediriger vers l'app Flutter avec l'URL complète en paramètre
      window.location.href = `${FLUTTER_LOGIN_URL}?redirect=${(currentUrl)}`;

      return Promise.reject("Token expiré");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
