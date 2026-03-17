import express from "express";

const router = express.Router();

const authors = [
  { id: 1, name: "Nadia" },
  { id: 2, name: "Otro autor" }
];

router.get("/", (req, res) => {
  res.json(authors);
});

export default router;