import { Book } from '../models/book.model';
import BookRepository from '../repositories/book.repository';
import { serviceError } from '../utils/customError.utils';

const BookService = {
  create: async (book: Book) => {
    try {
      const createdBook = await BookRepository.create(book);
      return createdBook;
    } catch (error: unknown) {
      throw serviceError(error);
    }
  },

  getById: async (id: string) => {
    try {
      const book = await BookRepository.getById(id);
      return book;
    } catch (error: unknown) {
      throw serviceError(error);
    }
  },
};

export default BookService;
