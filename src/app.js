import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import authorsRouter from './routes/authors-routes.js';
import postsRouter from './routes/posts-routes.js';

const app = express();
app.use(express.json());

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

app.use(errorHandler);

export default app;