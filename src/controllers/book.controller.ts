import { Request, Response } from 'express';
import ResponseFormatter from '../utils/responseFormatter.utils';
import { controllerError } from '../utils/customError.utils';
import BookService from '../services/book.service';
import { createBookValidationSchema, getBookByIdValidationSchema } from '../validations/book.validation';
import { Book } from '../models/book.model';

const BookController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = createBookValidationSchema.validate(req.body);

      if (error) {
        throw Error(error.details[0].message);
      }

      const createdBook = await BookService.create(req.body);

      ResponseFormatter.success(res, createdBook);
    } catch (error: unknown) {
      const parsingError = controllerError(error);

      ResponseFormatter.failed(res, {
        status: parsingError.code,
        message: parsingError.message,
      });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { error, value } = getBookByIdValidationSchema.validate(req.params);

      if (error) {
        throw Error(error.details[0].message);
      }

      const book: Book | null = await BookService.getById(value.id);

      ResponseFormatter.success(res, book);
    } catch (error: unknown) {
      const parsingError = controllerError(error);

      ResponseFormatter.failed(res, {
        status: parsingError.code,
        message: parsingError.message,
      });
    }
  },
};

export default BookController;
