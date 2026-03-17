import express from "express";
import { getAuthors, createAuthor } from "../controllers/authorsController.js";

const router = express.Router();

// GET todos los autores
router.get("/", getAuthors);

// POST nuevo autor
router.post("/", createAuthor);

export default router;