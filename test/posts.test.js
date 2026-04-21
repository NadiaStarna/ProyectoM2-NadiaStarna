import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/config.js';

describe('POSTS endpoints', () => {

  describe('GET /api/posts', () => {
    it('debe retornar lista de posts con status 200', async () => {
      const res = await request(app).get('/api/posts');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('debe retornar un post existente con status 200', async () => {
      const res = await request(app).get('/api/posts/1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('debe retornar 404 si el post no existe', async () => {
      const res = await request(app).get('/api/posts/9999');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/posts/author/:authorId', () => {
    it('debe retornar posts de un autor con status 200', async () => {
      const res = await request(app).get('/api/posts/author/1');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app).get('/api/posts/author/9999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/posts', () => {
    it('debe crear un post y retornar 201', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({
          author_id: 1,
          title: 'Post de prueba',
          content: 'Contenido de prueba',
          published: false
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
    });

    it('debe retornar 400 si title está vacío', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ author_id: 1, title: '', content: 'Contenido' });
      expect(res.status).toBe(400);
    });

    it('debe retornar 400 si content está vacío', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ author_id: 1, title: 'Titulo', content: '' });
      expect(res.status).toBe(400);
    });

    it('debe retornar 400 si author_id no se envía', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ title: 'Titulo', content: 'Contenido' });
      expect(res.status).toBe(400);
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ author_id: 9999, title: 'Titulo', content: 'Contenido' });
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('debe actualizar un post y retornar 200', async () => {
      const res = await request(app)
        .put('/api/posts/1')
        .send({
          title: 'Titulo actualizado',
          content: 'Contenido actualizado',
          published: true
        });
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Titulo actualizado');
    });

    it('debe retornar 404 si el post no existe', async () => {
      const res = await request(app)
        .put('/api/posts/9999')
        .send({ title: 'Titulo', content: 'Contenido' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('debe retornar 404 si el post no existe', async () => {
      const res = await request(app).delete('/api/posts/9999');
      expect(res.status).toBe(404);
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});