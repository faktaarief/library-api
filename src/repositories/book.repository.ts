import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';
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

  getById: async (id: string): Promise<Book | null> => {
    try {
      const query = `
        SELECT id, title, author, publishedYear, JSON_UNQUOTE(genres) AS genres, stock  
        FROM books WHERE id = ? LIMIT 1
      `;

      const [rows] = await db.query<RowDataPacket[]>(query, [id]);
      if (rows.length === 0) return null;

      const { genres, ...book } = rows[0];

      return {
        id: book.id,
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genres: genres ? JSON.parse(genres) : [],
        stock: book.stock,
      };
    } catch (error: unknown) {
      throw repositoryError(error);
    }
  },
};

export default BookRepository;
