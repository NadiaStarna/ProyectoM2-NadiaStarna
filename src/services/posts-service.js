import pool from '../db/config.js';

export const getAllPosts = async (published) => {
  if (published !== undefined) {
    const isPublished = published === 'true';
    const result = await pool.query(
      'SELECT * FROM posts WHERE published = $1 ORDER BY created_at DESC',
      [isPublished]
    );
    return result.rows;
  }
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  return result.rows;
};

export const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

export const getPostsByAuthor = async (authorId) => {
  const result = await pool.query(
    `SELECT posts.*, authors.name AS author_name, authors.email AS author_email
     FROM posts
     JOIN authors ON posts.author_id = authors.id
     WHERE posts.author_id = $1
     ORDER BY posts.created_at DESC`,
    [authorId]
  );
  return result.rows;
};

export const createPost = async (author_id, title, content, published) => {
  const result = await pool.query(
    'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [author_id, title, content, published ?? false]
  );
  return result.rows[0];
};

export const updatePost = async (id, title, content, published) => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
    [title, content, published ?? false, id]
  );
  return result.rows[0];
};

export const deletePost = async (id) => {
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};