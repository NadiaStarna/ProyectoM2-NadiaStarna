-- db/setup.sql

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);