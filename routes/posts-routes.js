// routes/postsRoutes.js

import express from "express";
import { getPosts, createPost, getPostById, getPostsByAuthor, updatePost, deletePost } from "../controllers/postsController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);

router.get("/:id", getPostById)
router.get("/author/:authorId", getPostsByAuthor)

router.put("/:id", updatePost)
router.delete("/:id", deletePost)

export default router;