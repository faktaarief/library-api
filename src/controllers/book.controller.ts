import { Request, Response } from 'express';
import ResponseFormatter from '../utils/responseFormatter.utils';
import { controllerError } from '../utils/customError.utils';
import BookService from '../services/book.service';
import { createBookValidationSchema, getBookByIdValidationSchema, updateBookValidationSchema } from '../validations/book.validation';
import { Book, QueryParams } from '../models/book.model';

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

  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const { page, limit, search } = req.query;

      const queryParams: QueryParams = {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        search: search ? String(search) : '',
      };

      const books = await BookService.getAll(queryParams);

      ResponseFormatter.success(res, books);
    } catch (error: unknown) {
      const parsingError = controllerError(error);

      ResponseFormatter.failed(res, {
        status: parsingError.code,
        message: parsingError.message,
      });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { error } = updateBookValidationSchema.validate(req.body);
      const { id } = req.params;

      if (error) {
        throw Error(error.details[0].message);
      }

      const updatedBook = await BookService.update(id, req.body);

      ResponseFormatter.success(res, updatedBook);
    } catch (error: unknown) {
      const parsingError = controllerError(error);

      ResponseFormatter.failed(res, {
        status: parsingError.code,
        message: parsingError.message,
      });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      await BookService.delete(id);
      const deletedBook = { message: 'Book deleted successfully' };

      ResponseFormatter.success(res, deletedBook);
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
