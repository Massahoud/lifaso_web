// services/questionService.ts
import axios from "axios";



export interface Question {
  id: string;
  numero: number;
  question_text: string;
    type: string;
    commentaire?: string;
}

const baseUrl = "https://soleilmainapi.vercel.app/api";

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const fetchAllQuestions = async (): Promise<Question[]> => {
  const token = getAuthToken();
  const res = await axios.get(`${baseUrl}/questions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getQuestionById = async (id: string): Promise<Question> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await axios.get(`${baseUrl}/questions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.data) {
    throw new Error("Empty response");
  }

  return response.data;
};

export const createQuestion = async (question: Question): Promise<Question> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await axios.post(`${baseUrl}/questions`, question, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = response.data;
  if (res.question) {
    return res.question;
  } else if (res.question_text) {
    return res.question_text;
  } else {
    throw new Error("Unexpected API response");
  }
};

export const updateQuestion = async (id: string, question: Question): Promise<Question> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await axios.put(`${baseUrl}/questions/${id}`, question, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.question;
};

export const deleteQuestion = async (id: string): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  await axios.delete(`${baseUrl}/questions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
