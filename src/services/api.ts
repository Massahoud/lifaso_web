import axios from "axios";
import Cookies from 'js-cookie'; // on importe js-cookie
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// 🔹 Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Supprimer les cookies en cas d'erreur d'authentification
      document.cookie = "token=; Max-Age=0; path=/;";
      document.cookie = "userId=; Max-Age=0; path=/;";

      // ✅ Redirection simple vers /login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;