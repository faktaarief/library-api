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

  update: async (id: string, book: Book) => {
    try {
      const checkBook = await BookRepository.getById(id);

      if (!checkBook) {
        throw new Error('Book not found.');
      }

      const { title, author } = book;
      const checkTitleAuthor = await BookRepository.getByTitleAndAuthor(title, author);

      if (checkTitleAuthor && checkTitleAuthor.id !== id) {
        throw new Error('Book with the same title and author already exists.');
      }

      const createdBook = await BookRepository.update(id, book);
      return createdBook;
    } catch (error: unknown) {
      throw serviceError(error);
    }
  },

  delete: async (id: string) => {
    try {
      const deletedBook = await BookRepository.delete(id);
      return deletedBook;
    } catch (error: unknown) {
      throw serviceError(error);
    }
  },
};

export default BookService;
