import { Router } from 'express';
import BookController from '../controllers/book.controller';

const bookRoutes = Router();

bookRoutes.post('/', BookController.create);

export default bookRoutes;
