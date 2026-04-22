import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/config.js';

describe('AUTHORS endpoints', () => {

  let authorId;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/authors')
      .send({
        name: 'Autor Test',
        email: `autor${Date.now()}@test.com`,
        bio: 'Bio test'
      });

    authorId = res.body.id;
  });

  describe('GET /api/authors', () => {
    it('debe retornar lista de autores con status 200', async () => {
      const res = await request(app).get('/api/authors');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/authors/:id', () => {
    it('debe retornar un autor existente con status 200', async () => {
      const res = await request(app).get(`/api/authors/${authorId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', authorId);
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app).get('/api/authors/9999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/authors', () => {
    it('debe crear un autor y retornar 201', async () => {
      const res = await request(app)
        .post('/api/authors')
        .send({
          name: 'Test Author',
          email: `test${Date.now()}@example.com`,
          bio: 'Bio de prueba'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Test Author');
    });

    it('debe retornar 400 si name está vacío', async () => {
      const res = await request(app)
        .post('/api/authors')
        .send({ name: '', email: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('debe retornar 400 si email está vacío', async () => {
      const res = await request(app)
        .post('/api/authors')
        .send({ name: 'Test', email: '' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/authors/:id', () => {
    it('debe actualizar un autor y retornar 200', async () => {
      const res = await request(app)
        .put(`/api/authors/${authorId}`)
        .send({
          name: 'Autor Actualizado',
          email: `update${Date.now()}@test.com`,
          bio: 'Bio actualizada'
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Autor Actualizado');
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app)
        .put('/api/authors/9999')
        .send({ name: 'Test', email: 'noexiste@test.com' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/authors/:id', () => {
    it('debe eliminar un autor existente', async () => {
      const res = await request(app).delete(`/api/authors/${authorId}`);
      expect(res.status).toBe(204); // ✅ corregido
    });

    it('no debería encontrar el autor eliminado', async () => {
      const res = await request(app).get(`/api/authors/${authorId}`);
      expect(res.status).toBe(404);
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app).delete('/api/authors/9999');
      expect(res.status).toBe(404);
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});