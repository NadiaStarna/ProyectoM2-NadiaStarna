import express from "express";
import { getAuthors, createAuthor, getAuthorById, deleteAuthor, updateAuthor } from "../controllers/authorsController.js";

const router = express.Router();

router.get("/", getAuthors);
router.post("/", createAuthor);

router.get("/:id", getAuthorById);
router.delete("/:id", deleteAuthor);

router.put("/:id", updateAuthor)

export default router;