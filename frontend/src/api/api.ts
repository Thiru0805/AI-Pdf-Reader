import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData);
  return response.data;
};

export const askQuestion = async (
  question: string,
  model: 'openai' | 'ollama' | null
) => {
  const response = await axios.post(`${API_BASE_URL}/ask`, { question, model });
  return response.data;
};
