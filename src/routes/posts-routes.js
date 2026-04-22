import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
} from '../controllers/posts-controller.js';

import { validatePost } from '../validaciones/posts.validaciones.js';

const postsRouter = Router();

postsRouter.get('/', getAllPosts);
postsRouter.get('/author/:authorId', getPostsByAuthor);
postsRouter.get('/:id', getPostById);
postsRouter.post('/', validatePost, createPost);
postsRouter.put('/:id', validatePost, updatePost);

postsRouter.delete('/:id', deletePost);

export default postsRouter;