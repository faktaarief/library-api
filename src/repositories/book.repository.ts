import { v4 as uuidv4 } from 'uuid';
import { Book } from '../models/book.model';
import db from '../config/db.config';
import { repositoryError } from '../utils/customError.utils';

const BookRepository = {
  create: async (book: Book): Promise<Book> => {
    try {
      const query = `
        INSERT INTO books (id, title, author, publishedYear, genres, stock)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      Object.assign(book, { id: uuidv4() });

      await db.execute(query, [
        book.id,
        book.title,
        book.author,
        book.publishedYear,
        book.genres,
        book.stock,
      ]);

      const result = {
        id: book.id,
        ...book,
      };

      return result;
    } catch (error: unknown) {
      throw repositoryError(error);
    }
  },
};

export default BookRepository;
