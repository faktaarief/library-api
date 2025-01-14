import { Router } from 'express';
import BookController from '../controllers/book.controller';

const bookRoutes = Router();

bookRoutes.post('/', BookController.create);
bookRoutes.get('/:id', BookController.getById);
bookRoutes.get('/', BookController.getAll);
bookRoutes.put('/:id', BookController.update);

export default bookRoutes;
