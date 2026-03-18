import request from "supertest";
import app from "../app.js";
import pool from "../db/database.js";

describe("Posts API", () => {
  let newPostId;
  const existingAuthorId = 1; 

  test("GET /api/posts - debería devolver todos los posts", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/posts - debería crear un nuevo post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({
        title: "Post de prueba",
        content: "Este es un post de prueba para el autor",
        author_id: existingAuthorId,
        published: true
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Post de prueba");
    newPostId = res.body.id;
  });

  test("GET /api/posts/:id - debería devolver el post recién creado", async () => {
    const res = await request(app).get(`/api/posts/${newPostId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newPostId);
  });

  test("GET /api/posts/author/:authorId - debería devolver posts de un autor", async () => {
    const res = await request(app).get(`/api/posts/author/${existingAuthorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.every(post => post.author_id === existingAuthorId)).toBe(true);
  });

test("PUT /api/posts/:id - debería actualizar el post", async () => {
  console.log("ID del post a modificar:", newPostId); // <--- acá

  const res = await request(app)
    .put(`/api/posts/${newPostId}`)
    .send({
      title: "Post Modificado",
      content: "Contenido modificado",
      author_id: 1,
      published: false
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe("Post Modificado");
});

  test("DELETE /api/posts/:id - debería eliminar el post", async () => {
    const res = await request(app).delete(`/api/posts/${newPostId}`);
    expect(res.statusCode).toBe(204);
  });

  test("GET /api/posts/:id - debería devolver 404 para post eliminado", async () => {
    const res = await request(app).get(`/api/posts/${newPostId}`);
    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await pool.end(); // cierra la conexión a PostgreSQL
});