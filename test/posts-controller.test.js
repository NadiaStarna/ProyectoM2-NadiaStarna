import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
} from '../src/controllers/posts-controller.js';
import * as postsService from '../src/services/posts-service.js';
import * as authorsService from '../src/services/authors-service.js';

vi.mock('../src/services/posts-service.js');
vi.mock('../src/services/authors-service.js');

const mockReq = (params = {}, body = {}, query = {}) => ({ params, body, query });
const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getAllPosts', () => {
  it('retorna lista de posts con status 200', async () => {
    postsService.getAllPosts.mockResolvedValue([{ id: 1, title: 'Post 1' }]);
    const res = mockRes();
    await getAllPosts(mockReq(), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    postsService.getAllPosts.mockRejectedValue(error);
    const next = vi.fn();
    await getAllPosts(mockReq(), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('getPostById', () => {
  it('retorna el post con status 200 si existe', async () => {
    postsService.getPostById.mockResolvedValue({ id: 1, title: 'Post 1' });
    const res = mockRes();
    await getPostById(mockReq({ id: '1' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('retorna 404 si el post no existe', async () => {
    postsService.getPostById.mockResolvedValue(null);
    const res = mockRes();
    await getPostById(mockReq({ id: '9999' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Post no encontrado' });
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    postsService.getPostById.mockRejectedValue(error);
    const next = vi.fn();
    await getPostById(mockReq({ id: '1' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('getPostsByAuthor', () => {
  it('retorna posts del autor con status 200', async () => {
    authorsService.getAuthorById.mockResolvedValue({ id: 1, name: 'Nadia' });
    postsService.getPostsByAuthor.mockResolvedValue([{ id: 1, title: 'Post 1' }]);
    const res = mockRes();
    await getPostsByAuthor(mockReq({ authorId: '1' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('retorna 404 si el autor no existe', async () => {
    authorsService.getAuthorById.mockResolvedValue(null);
    const res = mockRes();
    await getPostsByAuthor(mockReq({ authorId: '9999' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Autor no encontrado' });
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    authorsService.getAuthorById.mockRejectedValue(error);
    const next = vi.fn();
    await getPostsByAuthor(mockReq({ authorId: '1' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('createPost', () => {
  it('crea un post y retorna 201', async () => {
    authorsService.getAuthorById.mockResolvedValue({ id: 1 });
    postsService.createPost.mockResolvedValue({ id: 1, title: 'Post 1' });
    const res = mockRes();
    await createPost(mockReq({}, { author_id: 1, title: 'Post 1', content: 'Contenido' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('retorna 400 si title está vacío', async () => {
    const res = mockRes();
    await createPost(mockReq({}, { author_id: 1, title: '', content: 'Contenido' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El titulo es obligatorio' });
  });

  it('retorna 400 si content está vacío', async () => {
    const res = mockRes();
    await createPost(mockReq({}, { author_id: 1, title: 'Titulo', content: '' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El contenido es obligatorio' });
  });

  it('retorna 400 si author_id no se envía', async () => {
    const res = mockRes();
    await createPost(mockReq({}, { title: 'Titulo', content: 'Contenido' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El author_id es obligatorio' });
  });

  it('retorna 404 si el autor no existe', async () => {
    authorsService.getAuthorById.mockResolvedValue(null);
    const res = mockRes();
    await createPost(mockReq({}, { author_id: 9999, title: 'Titulo', content: 'Contenido' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Autor no encontrado' });
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    authorsService.getAuthorById.mockResolvedValue({ id: 1 });
    postsService.createPost.mockRejectedValue(error);
    const next = vi.fn();
    await createPost(mockReq({}, { author_id: 1, title: 'Titulo', content: 'Contenido' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('updatePost', () => {
  it('actualiza un post y retorna 200', async () => {
    postsService.updatePost.mockResolvedValue({ id: 1, title: 'Titulo actualizado' });
    const res = mockRes();
    await updatePost(mockReq({ id: '1' }, { title: 'Titulo actualizado', content: 'Contenido' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('retorna 404 si el post no existe', async () => {
    postsService.updatePost.mockResolvedValue(null);
    const res = mockRes();
    await updatePost(mockReq({ id: '9999' }, { title: 'Titulo', content: 'Contenido' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Post no encontrado' });
  });

  it('retorna 400 si title está vacío', async () => {
    const res = mockRes();
    await updatePost(mockReq({ id: '1' }, { title: '', content: 'Contenido' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El titulo es obligatorio' });
  });

  it('retorna 400 si content está vacío', async () => {
    const res = mockRes();
    await updatePost(mockReq({ id: '1' }, { title: 'Titulo', content: '' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El contenido es obligatorio' });
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    postsService.updatePost.mockRejectedValue(error);
    const next = vi.fn();
    await updatePost(mockReq({ id: '1' }, { title: 'Titulo', content: 'Contenido' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('deletePost', () => {
  it('elimina un post y retorna 204', async () => {
    postsService.deletePost.mockResolvedValue({ id: 1 });
    const res = mockRes();
    await deletePost(mockReq({ id: '1' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('retorna 404 si el post no existe', async () => {
    postsService.deletePost.mockResolvedValue(null);
    const res = mockRes();
    await deletePost(mockReq({ id: '9999' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Post no encontrado' });
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    postsService.deletePost.mockRejectedValue(error);
    const next = vi.fn();
    await deletePost(mockReq({ id: '1' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});