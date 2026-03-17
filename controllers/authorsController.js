let authors = [
  { id: 1, name: "Nadia" },
  { id: 2, name: "Otro autor" }
];

export const getAuthors = (req, res) => {
  res.json(authors);
};

export const createAuthor = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es obligatorio" });

  const newAuthor = { id: authors.length + 1, name };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};