import OpenAI from 'openai';
import dotenv from 'dotenv';
import { ApiError } from '../utils/ApiError';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const openaiModel = process.env.OPENAI_MODEL;

if (!apiKey || !openaiModel) {
  throw new ApiError(400, 'OPENAI_API_KEY must be defined in environment variables');
}

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey });
  }

  public async ask(context: string, question: string): Promise<string> {
    try {
      const prompt = `${context}\n\nQ: ${question}\nA:`;

      const completion = await this.openai.chat.completions.create({
        model: openaiModel as string,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that answers based on the given PDF context.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      return completion.choices[0]?.message?.content?.trim() || "No answer found.";
    } catch (error: any) {
      console.error("OpenAI Error:", error);

      if (error?.status === 429 || error?.message?.includes("quota")) {
        throw new ApiError(400, "OpenAI API quota exceeded. Please try again later.");
      }

      throw new ApiError(400, "Something went wrong while calling OpenAI.");
    }
  }
}
