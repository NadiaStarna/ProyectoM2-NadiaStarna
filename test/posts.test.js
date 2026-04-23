import request from "supertest";
import app from "../src/app.js";
import { describe, test, expect, vi } from "vitest";

// MOCK del service de posts
vi.mock("../src/posts-service.js", () => ({
  getPosts: vi.fn(() => [
    { id: 1, title: "Post 1", content: "Contenido 1" }
  ]),
  getPostById: vi.fn((id) => ({
    id,
    title: "Post test",
    content: "Contenido test"
  })),
  createPost: vi.fn((data) => ({
    id: 99,
    ...data
  })),
  updatePost: vi.fn((id, data) => ({
    id,
    ...data
  })),
  deletePost: vi.fn(() => ({ message: "Post eliminado" }))
}));

describe("Posts Controller", () => {

  test("GET /api/posts devuelve todos los posts", async () => {
    const res = await request(app).get("/api/posts");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/posts/:id devuelve un post", async () => {
    const res = await request(app).get("/api/posts/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  test("POST /api/posts crea un post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({
        title: "Nuevo post",
        content: "Contenido nuevo"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Nuevo post");
  });

  test("PUT /api/posts/:id actualiza un post", async () => {
    const res = await request(app)
      .put("/api/posts/1")
      .send({
        title: "Editado",
        content: "Editado content"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Editado");
  });

  test("DELETE /api/posts/:id elimina un post", async () => {
    const res = await request(app).delete("/api/posts/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });

});