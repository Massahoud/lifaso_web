// services/responseService.ts
import axios from "axios";

export interface Response {
  id?: string;
  question_id: string;
  reponse_text: string;
  alimentation: string;
  cadre_vie: string;
  education: string;
  pauvrete: string;
  sante_physique: string;
  violence: string;
  indice_sortir?: string;
}
export type ResponseType = Omit<Response, 'id'>;
const API_BASE_URL = "https://soleilmainapi.vercel.app/api";

const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const fetchResponsesByQuestionId = async (questionId: string): Promise<Response[]> => {
  const token = getAuthToken();
  const res = await axios.get(`${API_BASE_URL}/responses/question/${questionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getHeaders = () => {
  const token = getAuthToken();
  if (!token) throw new Error("Token non trouvé");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getAllResponses = async (): Promise<Response[]> => {
  const res = await axios.get(`${API_BASE_URL}/responses`, {
    headers: getHeaders(),
  });
  return res.data;
};

export const getResponseById = async (id: string): Promise<ResponseType> => {
  const res = await axios.get(`${API_BASE_URL}/responses/${id}`, {
    headers: getHeaders(),
  });
  return res.data;
};



export const createResponse = async (response: Response): Promise<Response> => {
  const res = await axios.post(`${API_BASE_URL}/responses`, response, {
    headers: getHeaders(),
  });

  const data = res.data;
  if (data?.reponse_text) return data.reponse_text;
  throw new Error("Réponse invalide ou inattendue.");
};

export const updateResponse = async (id: string, response: ResponseType): Promise<ResponseType> => {
  const res = await axios.put(`${API_BASE_URL}/responses/${id}`, response, {
    headers: getHeaders(),
  });

  return res.data.reponse_text;
};

export const deleteResponse = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/responses/${id}`, {
    headers: getHeaders(),
  });
};
