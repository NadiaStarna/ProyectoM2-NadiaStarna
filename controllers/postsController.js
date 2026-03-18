import pool from "../db/database.js";

// GET todos los posts
export const getPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener posts" });
  }
};

// GET post por ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener post" });
  }
};

// GET posts por autor
export const getPostsByAuthor = async (req, res) => {
  const { authorId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE author_id=$1", [authorId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener posts del autor" });
  }
};

// POST crear post
export const createPost = async (req, res) => {
  const { title, content, author_id, published } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({ error: "title, content y author_id son obligatorios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, author_id, published || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear post" });
  }
};

// PUT actualizar post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author_id, published } = req.body;

  try {
    const result = await pool.query(
      "UPDATE posts SET title=$1, content=$2, author_id=$3, published=$4 WHERE id=$5 RETURNING *",
      [title, content, author_id, published, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar post" });
  }
};

// DELETE post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM posts WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar post" });
  }
};