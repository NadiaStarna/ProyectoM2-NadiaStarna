DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  bio        TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  author_id  INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  title      VARCHAR(200) NOT NULL,
  content    TEXT NOT NULL,
  published  BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_authors_email   ON authors(email);

INSERT INTO authors (name, email, bio) VALUES
  ('Ana Garcia',   'ana@example.com',    'Desarrolladora fullstack.'),
  ('Carlos Lopez', 'carlos@example.com', 'Tech writer y entusiasta de DevOps.'),
  ('Maria Perez',  'maria@example.com',  NULL);

INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Introduccion a PostgreSQL', 'PostgreSQL es un motor de base de datos...', true),
  (1, 'Express desde cero',        'Express es un framework minimalista...',     false),
  (2, 'Deploy en Railway',         'Railway simplifica el proceso de deploy...', true),
  (2, 'SQL vs NoSQL',              'Elegir entre SQL y NoSQL depende del caso...', true),
  (3, 'Mi primer post',            'Este es el contenido de mi primer post...',  false);