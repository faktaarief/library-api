import { Request, Response } from 'express';
import ResponseFormatter from '../utils/responseFormatter.utils';
import { controllerError } from '../utils/customError.utils';
import BookService from '../services/book.service';
import { createBookValidationSchema } from '../validations/book.validation';

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
};

export default BookController;
