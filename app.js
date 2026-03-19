import express from "express";
import authorsRoutes from "./routes/authors-routes.js";
import postsRoutes from "./routes/posts-routes.js";

const app = express();

app.use(express.json());
app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;