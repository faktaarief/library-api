import { NextFunction, Request, Response } from 'express';
import { controllerError } from '../utils/customError.utils';
import ResponseFormatter from '../utils/responseFormatter.utils';

export const handleParsingError = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof SyntaxError && 'body' in error) {
    ResponseFormatter.failed(res, {
      status: 400,
      message: 'Invalid JSON format',
    });
  }

  next();
};

export const handleGlobalError = (error: unknown, res: Response) => {
  const parsingError = controllerError(error);

  if (parsingError.code) {
    ResponseFormatter.failed(res, {
      status: parsingError.code,
      message: parsingError.message,
    });
  }

  ResponseFormatter.failed(res, {
    status: 500,
    message: 'Internal Server Error',
  });
};
