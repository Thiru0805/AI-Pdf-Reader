import express, { Router } from 'express';
import multer from 'multer';
import { PDFController } from '../controllers/pdfController';

export class PdfRoutes {
  public router: Router;
  private pdfController: PDFController;

  constructor() {
    this.router = express.Router();
    this.pdfController = new PDFController();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    const upload = multer({ dest: 'uploads/' });

    this.router.post('/upload', upload.single('pdf'), this.pdfController.processPDF);
    this.router.post('/ask', this.pdfController.askQuestion);
  }
}
