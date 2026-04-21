export const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title obligatorio" });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content obligatorio" });
  }

  if (!author_id) {
    return res.status(400).json({ error: "Author_id obligatorio" });
  }

  next();
};