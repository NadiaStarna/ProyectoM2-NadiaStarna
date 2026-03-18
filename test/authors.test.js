import request from "supertest";
import app from "../app.js";
import pool from "../db/database.js";

describe("Autores API", () => {
  let newAuthorId;

  test("GET /api/autores - debería devolver todos los autores", async () => {
    const res = await request(app).get("/api/autores");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/autores - debería crear un nuevo autor", async () => {
    const res = await request(app)
      .post("/api/autores")
      .send({
        name: "Test Autor",
        email: "testautor@example.com",
        bio: "Bio de prueba"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Autor");
    newAuthorId = res.body.id;
  });

  test("GET /api/autores/:id - debería devolver el autor recién creado", async () => {
    const res = await request(app).get(`/api/autores/${newAuthorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newAuthorId);
  });

  test("PUT /api/autores/:id - debería actualizar el autor", async () => {
    const res = await request(app)
      .put(`/api/autores/${newAuthorId}`)
      .send({
        name: "Autor Modificado",
        email: "modificado@example.com",
        bio: "Bio modificada"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Autor Modificado");
  });

  test("DELETE /api/autores/:id - debería eliminar el autor", async () => {
    const res = await request(app).delete(`/api/autores/${newAuthorId}`);
    expect(res.statusCode).toBe(204);
  });

  test("GET /api/autores/:id - debería devolver 404 para autor eliminado", async () => {
    const res = await request(app).get(`/api/autores/${newAuthorId}`);
    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await pool.end(); 
});
