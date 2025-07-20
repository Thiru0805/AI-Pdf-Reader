import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ai-pdf-reader-44d1.onrender.com/api';

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
