import api from "./api";

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
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
    if (value) formData.append(key, value as string);
  });

  if (file) {
    formData.append("photo", file, file.name);
  }

  const response = await api.post("/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.user;
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

export const sendInvite = async (email: string, role: string) => {
  const response = await api.post("/sendInvite/invite", {
    email,
    statut: role,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};
