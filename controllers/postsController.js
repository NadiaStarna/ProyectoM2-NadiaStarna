// controllers/postsController.js

let posts = [
  { id: 1, title: "Primer post", content: "Contenido del primer post", author_id: 1, published: true },
  { id: 2, title: "Segundo post", content: "Contenido del segundo post", author_id: 2, published: false }
];

// GET todos los posts
export const getPosts = (req, res) => {
  res.json(posts);
};

// POST nuevo post
export const createPost = (req, res) => {
  const { title, content, author_id, published } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({ error: "title, content y author_id son obligatorios" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author_id,
    published: published || false
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};