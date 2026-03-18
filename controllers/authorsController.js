import pool from "../db/database.js";

// GET todos los autores
export const getAuthors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener autores" });
  }
};

// POST nuevo autor - CON AJUSTES DE SEGURIDAD
export const createAuthor = async (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y email son obligatorios" });
  }

  try {
  const result = await pool.query(
    "INSERT INTO autores (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bio || null]
  );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ERROR EN POSTGRES:", error.message);
    res.status(500).json({ error: "Error al crear autor", detail: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  try {
    const result = await pool.query(
      "UPDATE autores SET \"name\" = $1, \"email\" = $2, \"bio\" = $3 WHERE id = $4 RETURNING *",
      [name, email, bio, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar autor" });
  }
};