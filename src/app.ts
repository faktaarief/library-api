import express from 'express';
import bookRoutes from './routes/book.routes';
import { handleGlobalError, handleParsingError } from './middlewares/error.middleware';
import { swaggerSpec, swaggerUi } from './swagger';

const app = express();

app.use(express.json());
app.use(handleParsingError);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/books', bookRoutes);
app.use(handleGlobalError);

export default app;
