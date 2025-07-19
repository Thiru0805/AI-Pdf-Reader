import axios from 'axios';
import dotenv from 'dotenv';
import { ApiError } from '../utils/ApiError';
dotenv.config();

const ollamaModel = process.env.OLLAMA_MODEL;
const ollamaUrl = process.env.OLLAMA_URL;

if (!ollamaModel || !ollamaUrl) {
  throw new ApiError(400, 'OLLAMA_MODEL and OLLAMA_URL must be defined in environment variables');
}

export class OllamaService {
  private model: string;
  private url: string;

  constructor() {
    this.model = ollamaModel!;
    this.url = ollamaUrl!;
  }

  public async ask(context: string, question: string): Promise<string> {
    try {
      const response = await axios.post(this.url, {
        model: this.model,
        prompt: `${context}\n\nQ: ${question}\nA:`,
        stream: false
      });

      return response.data.response?.trim() || "No answer";
    } catch (error: any) {
      console.error('Ollama API error:', error?.response?.data || error.message);
      return "Failed to get response from Ollama";
    }
  }
}
