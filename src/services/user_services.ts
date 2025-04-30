import { AxiosError } from "axios"; 
import api from "./api";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);

    if (error && typeof error === 'object' && 'isAxiosError' in error && (error as AxiosError).isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const { status, data } = axiosError.response;

        if (status === 404) {
          throw new Error((data as any).message || 'Aucun utilisateur trouvé.');
        } else if (status === 403) {
          throw new Error((data as any).message || 'Accès refusé.');
        } else if (status === 500) {
          throw new Error('Erreur serveur interne.');
        } else {
          throw new Error((data as any).message || 'Erreur inconnue.');
        }
      } else if (axiosError.request) {
        throw new Error('Impossible de joindre le serveur.');
      }
    }
    throw new Error('Une erreur est survenue.');
  }
};



export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  await api.post("/auth/reset-password-request", { email });
};

export const resetPassword = async (token: string, newPassword: string) => {
  await api.post("/auth/reset-password", {
    token,
    new_password: newPassword,
  });
};
export const createUser = async (user: any, file?: File) => {
  const formData = new FormData();

  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  if (file) {
    formData.append("photo", file, file.name);
  }

  try {
    const response = await api.post("/users", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.user;
  } catch (error: any) {
    // Gestion d’erreur côté client
    const message = error?.response?.data?.message || "Erreur lors de la création de l'utilisateur.";
    console.error("Erreur createUser:", error);
    throw new Error(message);
  }
};


export const updateUser = async (id: string, user: any, file?: File) => {
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value) formData.append(key, value as string);
  });

  if (file) {
    formData.append("photo", file, file.name);
  }

  const response = await api.put(`/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.user;
};

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`);
};

export const sendInvite = async (email: string, role: string,organismeid: string) => {
  const response = await api.post("/sendInvite/invite", {
    email,
    statut: role,
    organismeid,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};
