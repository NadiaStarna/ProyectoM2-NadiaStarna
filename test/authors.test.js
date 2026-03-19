import request from "supertest";
import app from "../app.js";
import pool from "../db/database.js";

// Función para generar un email aleatorio y evitar duplicados
const randomEmail = () => `testautor_${Date.now()}@example.com`;

describe("Autores API", () => {
  let newAuthorId;

  test("GET /authors - debería devolver todos los autores", async () => {
    const res = await request(app).get("/authors");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /authors - debería crear un nuevo autor", async () => {
    const res = await request(app)
      .post("/authors")
      .send({
        name: "Test Autor",
        email: randomEmail(),
        bio: "Bio de prueba"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Autor");
    newAuthorId = res.body.id;
  });

  test("GET /authors/:id - debería devolver el autor recién creado", async () => {
    const res = await request(app).get(`/authors/${newAuthorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newAuthorId);
  });

  test("PUT /authors/:id - debería actualizar el autor", async () => {
    const res = await request(app)
      .put(`/authors/${newAuthorId}`)
      .send({
        name: "Autor Modificado",
        email: randomEmail(),
        bio: "Bio modificada"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Autor Modificado");
  });

  test("DELETE /authors/:id - debería eliminar el autor", async () => {
    const res = await request(app).delete(`/authors/${newAuthorId}`);
    expect(res.statusCode).toBe(204);
  });

  test("GET /authors/:id - debería devolver 404 para autor eliminado", async () => {
    const res = await request(app).get(`/authors/${newAuthorId}`);
    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  try {
    await pool.end();
    console.log("Conexión a la DB cerrada correctamente");
  } catch (err) {
    console.error("Error cerrando la conexión a la DB:", err);
  }
});