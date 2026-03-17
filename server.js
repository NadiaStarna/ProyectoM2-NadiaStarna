import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Ruta de autores
app.get("/api/authors", (req, res) => {
  const authors = [
    { id: 1, name: "Nadia" },
    { id: 2, name: "Otro autor" }
  ];

  res.json(authors);
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});