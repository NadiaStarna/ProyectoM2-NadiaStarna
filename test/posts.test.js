import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/db/config.js';

describe('POSTS endpoints', () => {

  let authorId;
  let postId;

  // 🔥 Creamos un autor real para usar en los posts
  beforeAll(async () => {
    const authorRes = await request(app)
      .post('/api/authors')
      .send({
        name: 'Autor para posts',
        email: `autor${Date.now()}@test.com`,
        bio: 'Bio test'
      });

    authorId = authorRes.body.id;
  });

  describe('GET /api/posts', () => {
    it('debe retornar lista de posts con status 200', async () => {
      const res = await request(app).get('/api/posts');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/posts', () => {
    it('debe crear un post y retornar 201', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({
          author_id: authorId,
          title: 'Post de prueba',
          content: 'Contenido de prueba',
          published: false
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');

      postId = res.body.id;
    });

    it('debe retornar 400 si title está vacío', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ author_id: authorId, title: '', content: 'Contenido' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('debe retornar 400 si content está vacío', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ author_id: authorId, title: 'Titulo', content: '' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('debe retornar 400 si author_id no se envía', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ title: 'Titulo', content: 'Contenido' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send({ author_id: 9999, title: 'Titulo', content: 'Contenido' });

      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('debe retornar un post existente con status 200', async () => {
      const res = await request(app).get(`/api/posts/${postId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', postId);
    });

    it('debe retornar 404 si el post no existe', async () => {
      const res = await request(app).get('/api/posts/9999');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/posts/author/:authorId', () => {
    it('debe retornar posts de un autor con status 200', async () => {
      const res = await request(app).get(`/api/posts/author/${authorId}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('debe retornar 404 si el autor no existe', async () => {
      const res = await request(app).get('/api/posts/author/9999');
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('debe actualizar un post y retornar 200', async () => {
      const res = await request(app)
        .put(`/api/posts/${postId}`)
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
    it('debe eliminar un post existente', async () => {
      const res = await request(app).delete(`/api/posts/${postId}`);
      expect(res.status).toBe(204);
    });

    it('no debería encontrar el post eliminado', async () => {
      const res = await request(app).get(`/api/posts/${postId}`);
      expect(res.status).toBe(404);
    });

    it('debe retornar 404 si el post no existe', async () => {
      const res = await request(app).delete('/api/posts/9999');
      expect(res.status).toBe(404);
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});