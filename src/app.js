import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

// Rutas (las agregamos después)
// app.use('/api/authors', authorsRouter);
// app.use('/api/posts', postsRouter);

app.use(errorHandler);

export default app;