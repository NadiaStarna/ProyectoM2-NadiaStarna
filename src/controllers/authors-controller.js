import * as authorsService from '../services/authors-service.js';

export const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const id = Number (req.params.id);
    const author = await authorsService.getAuthorById(id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'El email es obligatorio' });
    }
    const author = await authorsService.createAuthor(name, email, bio);
    res.status(201).json(author);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    next(error);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const id = Number (req.params.id);
    const { name, email, bio } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'El email es obligatorio' });
    }
    const author = await authorsService.updateAuthor(id, name, email, bio);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(200).json(author);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const id = Number (req.params.id);
    const author = await authorsService.deleteAuthor(id);
    if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};