import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ⬅️ OBLIGATOIRE pour envoyer les cookies
});

// 🔹 Supprimer l'intercepteur pour ajouter le token JWT
// Les cookies seront automatiquement envoyés grâce à `withCredentials: true`

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