import { Request, Response } from 'express';
import BookController from '../controllers/book.controller';
import BookService from '../services/book.service';
import ResponseFormatter from '../utils/responseFormatter.utils';

const mockResponse = (): Response => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  return res as unknown as Response;
};

describe('BookController', () => {
  describe('create', () => {
    it('should create a book successfully', async () => {
      const req = { body: { title: 'Cara Membangun Usaha', author: 'Budi', publishedYear: '2025', genres: ['wirausaha', 'inspirasi'], stock: '100' } } as unknown as Request;
      const res = mockResponse();

      const newBook = {
        id: '5d1f21aa-a596-4696-9642-3fe76045d1c5',
        title: 'Cara Membangun Usaha',
        author: 'Budi',
        publishedYear: 2025,
        genres: ['wirausaha', 'inspirasi'],
        stock: 100,
      };

      jest.spyOn(BookService, 'create').mockResolvedValue(newBook);
      jest.spyOn(ResponseFormatter, 'success').mockImplementation(jest.fn());

      await BookController.create(req, res);

      expect(BookService.create).toHaveBeenCalledWith(req.body);
      expect(ResponseFormatter.success).toHaveBeenCalledWith(res, newBook);
    });
  });

  describe('getById', () => {
    it('should return a book by ID', async () => {
      const req = { params: { id: '5d1f21aa-a596-4696-9642-3fe76045d1c5' } } as unknown as Request;
      const res = mockResponse();

      const book = {
        id: '5d1f21aa-a596-4696-9642-3fe76045d1c5',
        title: 'Cara Membangun Usaha',
        author: 'Budi',
        publishedYear: 2025,
        genres: ['wirausaha', 'inspirasi'],
        stock: 100,
      };

      jest.spyOn(BookService, 'getById').mockResolvedValue(book);
      jest.spyOn(ResponseFormatter, 'success').mockImplementation(jest.fn());

      await BookController.getById(req, res);

      expect(BookService.getById).toHaveBeenCalledWith('5d1f21aa-a596-4696-9642-3fe76045d1c5');
      expect(ResponseFormatter.success).toHaveBeenCalledWith(res, book);
    });
  });

  describe('update', () => {
    it('should update a book successfully', async () => {
      const req = { params: { id: '5d1f21aa-a596-4696-9642-3fe76045d1c5' }, body: { title: 'Cara Membangun Usaha', author: 'Budi', publishedYear: '2024', genres: ['wirausaha', 'inspirasi'], stock: '100' } } as unknown as Request;
      const res = mockResponse();

      const updatedBook = {
        id: '5d1f21aa-a596-4696-9642-3fe76045d1c5',
        title: 'Cara Membangun Usaha',
        author: 'Budi',
        publishedYear: 2024,
        genres: ['wirausaha', 'inspirasi'],
        stock: 100,
      };

      jest.spyOn(BookService, 'update').mockResolvedValue(updatedBook);
      jest.spyOn(ResponseFormatter, 'success').mockImplementation(jest.fn());

      await BookController.update(req, res);

      expect(BookService.update).toHaveBeenCalledWith('5d1f21aa-a596-4696-9642-3fe76045d1c5', req.body);
      expect(ResponseFormatter.success).toHaveBeenCalledWith(res, updatedBook);
    });
  });

  describe('delete', () => {
    it('should delete a book successfully', async () => {
      const req = { params: { id: '5d1f21aa-a596-4696-9642-3fe76045d1c5' } } as unknown as Request;
      const res = mockResponse();

      jest.spyOn(BookService, 'delete').mockResolvedValue();
      jest.spyOn(ResponseFormatter, 'success').mockImplementation(jest.fn());

      await BookController.delete(req, res);

      expect(BookService.delete).toHaveBeenCalledWith('5d1f21aa-a596-4696-9642-3fe76045d1c5');
      expect(ResponseFormatter.success).toHaveBeenCalledWith(res, { message: 'Book deleted successfully' });
    });
  });
});
