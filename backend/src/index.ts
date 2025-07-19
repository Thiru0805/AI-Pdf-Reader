import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PdfRoutes } from './routes/pdfRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { responseFormatter } from './middlewares/responseFormatter';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(responseFormatter);

const pdfRoutes = new PdfRoutes();
app.use('/api', pdfRoutes.router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
