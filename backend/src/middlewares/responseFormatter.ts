import { Request, Response, NextFunction } from 'express';

export const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (data: any) {
    const statusCode = res.statusCode;

    if (statusCode >= 400) {
      return originalJson.call(this, {
        status: 'error',
        message: data?.message || 'Something went wrong',
        errors: data?.errors || null,
      });
    }

    return originalJson.call(this, {
      status: 'success',
      message: data?.message || 'OK',
      data: data?.data || data,
    });
  };

  next();
};
