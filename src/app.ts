import express from 'express';
import bookRoutes from './routes/book.routes';
import { handleGlobalError, handleParsingError } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(handleParsingError);

app.use('/books', bookRoutes);

app.use(handleGlobalError);

export default app;
