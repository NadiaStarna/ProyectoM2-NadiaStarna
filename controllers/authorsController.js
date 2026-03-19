import pool from "../db/database.js"; // Asegurate que apunta a tu config de PostgreSQL

// Obtener todos los autores
export const getAuthors = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "autores"');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err); // Para ver el error real en la consola
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo autor
export const createAuthor = async (req, res) => {
  const { name, email, bio } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "autores"(name, email, bio) VALUES($1, $2, $3) RETURNING *',
      [name, email, bio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Obtener un autor por ID
export const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM "autores" WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Autor no encontrado" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un autor
export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "autores" SET name=$1, email=$2, bio=$3 WHERE id=$4 RETURNING *',
      [name, email, bio, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Autor no encontrado" });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un autor
export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM "autores" WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Autor no encontrado" });
    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};