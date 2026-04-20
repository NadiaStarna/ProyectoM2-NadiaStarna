import pool from '../db/config.js';

// GET /api/posts
export const getAllPosts = async (req, res, next) => {
  try {
    const { published } = req.query;
    let result;

    if (published !== undefined) {
      const isPublished = published === 'true';
      result = await pool.query(
        'SELECT * FROM posts WHERE published = $1 ORDER BY created_at DESC',
        [isPublished]
      );
    } else {
      result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    }

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/:id
export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/author/:authorId
export const getPostsByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;

    // Verificar que el autor existe
    const author = await pool.query('SELECT * FROM authors WHERE id = $1', [authorId]);
    if (author.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    const result = await pool.query(
      `SELECT posts.*, authors.name AS author_name, authors.email AS author_email
       FROM posts
       JOIN authors ON posts.author_id = authors.id
       WHERE posts.author_id = $1
       ORDER BY posts.created_at DESC`,
      [authorId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// POST /api/posts
export const createPost = async (req, res, next) => {
  try {
    const { author_id, title, content, published } = req.body;

    // Validaciones
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El titulo es obligatorio' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'El contenido es obligatorio' });
    }
    if (!author_id) {
      return res.status(400).json({ error: 'El author_id es obligatorio' });
    }

    // Verificar que el autor existe
    const author = await pool.query('SELECT * FROM authors WHERE id = $1', [author_id]);
    if (author.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    const result = await pool.query(
      'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *',
      [author_id, title, content, published ?? false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    // Validaciones
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'El titulo es obligatorio' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'El contenido es obligatorio' });
    }

    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
      [title, content, published ?? false, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};