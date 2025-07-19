import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { OllamaService } from '../services/ollamaService';
import { ApiError } from '../utils/ApiError';
import { ModelType } from '../enum/model.enum';
import { OpenAIService } from '../services/openaiService';

export class PDFController {
  private extractedText = '';
  private ollamaService = new OllamaService();
  private openaiService = new OpenAIService();

  public processPDF = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataBuffer = fs.readFileSync(req.file!.path);
      const data = await pdfParse(dataBuffer);
      this.extractedText = data.text;
      res.status(200).json({ message: 'PDF processed successfully' });
    } catch (error) {
      next(new ApiError(500, 'Failed to process PDF'));
    }
  };

  public askQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, model } = req.body;

      if (!question || !question.trim()) {
        throw new ApiError(400, 'Question is required');
      }

      if (!this.extractedText) {
        throw new ApiError(400, 'No document uploaded yet');
      }

      let answer: string;

      if (model === ModelType.OPENAI) {
        answer = await this.openaiService.ask(this.extractedText, question);
      } else if (model === ModelType.OLLAMA) {
        answer = await this.ollamaService.ask(this.extractedText, question);
      } else {
        throw new ApiError(400, 'Invalid model selected');
      }

      res.status(200).json({ answer });
    } catch (error) {
      next(error);
    }
  };
}
