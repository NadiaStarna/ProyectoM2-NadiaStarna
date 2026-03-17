import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authorsRoutes from "./routes/authors-routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/authors", authorsRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 💖");
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

