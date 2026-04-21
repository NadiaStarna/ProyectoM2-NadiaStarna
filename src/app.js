import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import { errorHandler } from './middleware/errorHandler.js';
import authorsRouter from './routes/authors-routes.js';
import postsRouter from './routes/posts-routes.js';

const app = express();
app.use(express.json());

// 🔥 Swagger
const swaggerDocument = YAML.load(
  path.resolve('src/yaml/openapi.yaml')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🔥 Rutas
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);

// 🔥 Error handler
app.use(errorHandler);

export default app;