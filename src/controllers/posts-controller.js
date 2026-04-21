import * as postsService from '../services/posts-service.js';
import * as authorsService from '../services/authors-service.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const { published } = req.query;
    const posts = await postsService.getAllPosts(published);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postsService.getPostById(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostsByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = await authorsService.getAuthorById(authorId);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    const posts = await postsService.getPostsByAuthor(authorId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { author_id, title, content, published } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El titulo es obligatorio' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'El contenido es obligatorio' });
    }
    if (!author_id) {
      return res.status(400).json({ error: 'El author_id es obligatorio' });
    }
    const author = await authorsService.getAuthorById(author_id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    const post = await postsService.createPost(author_id, title, content, published);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El titulo es obligatorio' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'El contenido es obligatorio' });
    }
    const post = await postsService.updatePost(id, title, content, published);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postsService.deletePost(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};