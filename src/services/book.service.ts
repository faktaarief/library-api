import { Book, QueryParams } from '../models/book.model';
import BookRepository from '../repositories/book.repository';
import { serviceError } from '../utils/customError.utils';

const BookService = {
  create: async (book: Book) => {
    try {
      const { title, author } = book;
      const foundBook = await BookRepository.getByTitleAndAuthor(title, author);

      if (foundBook) {
        throw new Error('Book with the same title and author already exists.');
      }

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

  getAll: async (queryParams: QueryParams) => {
    try {
      const books = await BookRepository.getAll(queryParams);
      return books;
    } catch (error: unknown) {
      throw serviceError(error);
    }
  },
};

export default BookService;
