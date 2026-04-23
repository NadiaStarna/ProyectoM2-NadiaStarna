import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} from '../src/controllers/authors-controller.js';
import * as authorsService from '../src/services/authors-service.js';

vi.mock('../src/services/authors-service.js');

const mockReq = (params = {}, body = {}) => ({ params, body });
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

describe('getAllAuthors', () => {
  it('retorna lista de autores con status 200', async () => {
    authorsService.getAllAuthors.mockResolvedValue([{ id: 1, name: 'Nadia' }]);
    const res = mockRes();
    await getAllAuthors(mockReq(), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    authorsService.getAllAuthors.mockRejectedValue(error);
    const next = vi.fn();
    await getAllAuthors(mockReq(), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('getAuthorById', () => {
  it('retorna el autor con status 200 si existe', async () => {
    authorsService.getAuthorById.mockResolvedValue({ id: 1, name: 'Nadia' });
    const res = mockRes();
    await getAuthorById(mockReq({ id: '1' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('retorna 404 si el autor no existe', async () => {
    authorsService.getAuthorById.mockResolvedValue(null);
    const res = mockRes();
    await getAuthorById(mockReq({ id: '9999' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    authorsService.getAuthorById.mockRejectedValue(error);
    const next = vi.fn();
    await getAuthorById(mockReq({ id: '1' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('createAuthor', () => {
  it('crea un autor y retorna 201', async () => {
    authorsService.createAuthor.mockResolvedValue({ id: 1, name: 'Nadia', email: 'nadia@test.com' });
    const res = mockRes();
    await createAuthor(mockReq({}, { name: 'Nadia', email: 'nadia@test.com', bio: 'Bio' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('retorna 400 si name está vacío', async () => {
    const res = mockRes();
    await createAuthor(mockReq({}, { name: '', email: 'nadia@test.com' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El nombre es obligatorio' });
  });

  it('retorna 400 si email está vacío', async () => {
    const res = mockRes();
    await createAuthor(mockReq({}, { name: 'Nadia', email: '' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El email es obligatorio' });
  });

  it('retorna 400 si el email ya está registrado (error 23505)', async () => {
    const error = new Error('unique violation');
    error.code = '23505';
    authorsService.createAuthor.mockRejectedValue(error);
    const res = mockRes();
    await createAuthor(mockReq({}, { name: 'Nadia', email: 'nadia@test.com' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El email ya está registrado' });
  });

  it('llama a next si el servicio falla con otro error', async () => {
    const error = new Error('DB error');
    authorsService.createAuthor.mockRejectedValue(error);
    const next = vi.fn();
    await createAuthor(mockReq({}, { name: 'Nadia', email: 'nadia@test.com' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('updateAuthor', () => {
  it('actualiza un autor y retorna 200', async () => {
    authorsService.updateAuthor.mockResolvedValue({ id: 1, name: 'Nadia Updated' });
    const res = mockRes();
    await updateAuthor(mockReq({ id: '1' }, { name: 'Nadia Updated', email: 'nadia@test.com' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('retorna 404 si el autor no existe', async () => {
    authorsService.updateAuthor.mockResolvedValue(null);
    const res = mockRes();
    await updateAuthor(mockReq({ id: '9999' }, { name: 'Nadia', email: 'nadia@test.com' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('retorna 400 si name está vacío', async () => {
    const res = mockRes();
    await updateAuthor(mockReq({ id: '1' }, { name: '', email: 'nadia@test.com' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('retorna 400 si email está vacío', async () => {
    const res = mockRes();
    await updateAuthor(mockReq({ id: '1' }, { name: 'Nadia', email: '' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('retorna 400 si el email ya está registrado (error 23505)', async () => {
    const error = new Error('unique violation');
    error.code = '23505';
    authorsService.updateAuthor.mockRejectedValue(error);
    const res = mockRes();
    await updateAuthor(mockReq({ id: '1' }, { name: 'Nadia', email: 'nadia@test.com' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El email ya está registrado' });
  });

  it('llama a next si el servicio falla con otro error', async () => {
    const error = new Error('DB error');
    authorsService.updateAuthor.mockRejectedValue(error);
    const next = vi.fn();
    await updateAuthor(mockReq({ id: '1' }, { name: 'Nadia', email: 'nadia@test.com' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('deleteAuthor', () => {
  it('elimina un autor y retorna 204', async () => {
    authorsService.deleteAuthor.mockResolvedValue({ id: 1 });
    const res = mockRes();
    await deleteAuthor(mockReq({ id: '1' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('retorna 404 si el autor no existe', async () => {
    authorsService.deleteAuthor.mockResolvedValue(null);
    const res = mockRes();
    await deleteAuthor(mockReq({ id: '9999' }), res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('llama a next si el servicio falla', async () => {
    const error = new Error('DB error');
    authorsService.deleteAuthor.mockRejectedValue(error);
    const next = vi.fn();
    await deleteAuthor(mockReq({ id: '1' }), mockRes(), next);
    expect(next).toHaveBeenCalledWith(error);
  });
});