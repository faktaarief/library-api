import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket } from 'mysql2';
import { Book, QueryParams } from '../models/book.model';
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

  getAll: async (params: QueryParams) => {
    try {
      const offset = (params.page - 1) * params.limit;

      const countQuery = `
        SELECT COUNT(*) AS totalBooks
        FROM books
        ${params.search ? 'WHERE MATCH(title, author) AGAINST(? IN BOOLEAN MODE) OR JSON_CONTAINS(genres, JSON_QUOTE(?))' : ''}
      `;

      const [countRows] = await db.query<RowDataPacket[]>(
        countQuery,
        params.search ? [params.search, params.search] : [],
      );

      const { totalBooks } = countRows[0];

      const booksQuery = `
        SELECT id, title, author, publishedYear, JSON_UNQUOTE(genres) AS genres, stock
        FROM books
        ${params.search ? 'WHERE MATCH(title, author) AGAINST(? IN BOOLEAN MODE)OR JSON_CONTAINS(genres, JSON_QUOTE(?)) ORDER BY createdAt ASC' : 'ORDER BY createdAt DESC'}
        LIMIT ? OFFSET ?
      `;

      const queryParams: Array<unknown> = params.search
        ? [params.search, params.search, params.limit, offset]
        : [params.limit, offset];

      const [rows] = await db.query<RowDataPacket[]>(booksQuery, queryParams);

      const books = rows.map((row) => ({
        id: row.id,
        title: row.title,
        author: row.author,
        publishedYear: row.publishedYear,
        genres: row.genres ? JSON.parse(row.genres) : [],
        stock: row.stock,
      }));

      const totalPages = Math.ceil(totalBooks / params.limit);

      return {
        page: params.page,
        totalPages,
        totalBooks,
        books,
      };
    } catch (error: unknown) {
      throw repositoryError(error);
    }
  },

  getByTitleAndAuthor: async (title: string, author: string) => {
    try {
      const query = `
        SELECT id, title, author, publishedYear, JSON_UNQUOTE(genres) AS genres, stock  
        FROM books WHERE title = ? AND author = ? LIMIT 1
      `;

      const [rows] = await db.query<RowDataPacket[]>(query, [title, author]);
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

  update: async (id: string, book: Book): Promise<Book> => {
    try {
      const updateQuery = `
        UPDATE books
        SET title = ?, author = ?, publishedYear = ?, genres = ?, stock = ?
        WHERE id = ?
      `;

      const {
        title,
        author,
        publishedYear,
        genres,
        stock,
      } = book;

      await db.execute(updateQuery, [
        title,
        author,
        publishedYear,
        JSON.stringify(genres),
        stock,
        id,
      ]);

      return {
        id,
        title,
        author,
        publishedYear,
        genres,
        stock,
      };
    } catch (error: unknown) {
      throw repositoryError(error);
    }
  },
};

export default BookRepository;
