import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Something went wrong',
    errors: err.errors || null,
  });
};
