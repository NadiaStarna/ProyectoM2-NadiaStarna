import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/config.js';

describe('AUTHORS endpoints', () => {

  // GET /api/authors
  describe('GET /api/authors', () => {
    it('debe retornar lista de autores con status 200', async () => {
      const res = await request(app).get('/api/authors');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // GET /api/authors/:id
  describe('GET /api/authors/:id', () => {
    it('debe retornar un autor existente con status 200', async () => {
      const res = await request(app).get('/api/authors/1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app).get('/api/authors/9999');
      expect(res.status).toBe(404);
    });
  });

  // POST /api/authors
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
    });

    it('debe retornar 400 si email está vacío', async () => {
      const res = await request(app)
        .post('/api/authors')
        .send({ name: 'Test', email: '' });
      expect(res.status).toBe(400);
    });

    it('debe retornar 400 si el email ya existe', async () => {
      const res = await request(app)
        .post('/api/authors')
        .send({ name: 'Test', email: 'ana@example.com' });
      expect(res.status).toBe(400);
    });
  });

  // PUT /api/authors/:id
  describe('PUT /api/authors/:id', () => {
    it('debe actualizar un autor y retornar 200', async () => {
      const res = await request(app)
        .put('/api/authors/1')
        .send({
          name: 'Ana Actualizada',
          email: 'ana@example.com',
          bio: 'Bio actualizada'
        });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Ana Actualizada');
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app)
        .put('/api/authors/9999')
        .send({ name: 'Test', email: 'noexiste@example.com' });
      expect(res.status).toBe(404);
    });
  });

  // DELETE /api/authors/:id
  describe('DELETE /api/authors/:id', () => {
    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app).delete('/api/authors/9999');
      expect(res.status).toBe(404);
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});