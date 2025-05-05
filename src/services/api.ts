import axios from "axios";
import Cookies from "js-cookie"; // ⬅️ Ajouté pour lire dans les cookies

const API_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: API_URL,
});

// 🔹 Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // ⬅️ On lit depuis les cookies au lieu de localStorage

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
    
    }
    return Promise.reject(error);
  }
);

export default api;