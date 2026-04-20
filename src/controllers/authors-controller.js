import pool from '../db/config.js';

// GET /api/authors
export const getAllAuthors = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM authors ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// GET /api/authors/:id
export const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// POST /api/authors
export const createAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    // Validaciones
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'El email es obligatorio' });
    }

    const result = await pool.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Email duplicado
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    next(error);
  }
};

// PUT /api/authors/:id
export const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    // Validaciones
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'El email es obligatorio' });
    }

    const result = await pool.query(
      'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
      [name, email, bio || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    next(error);
  }
};

// DELETE /api/authors/:id
export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM authors WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};