import { describe, it, expect, vi } from 'vitest';
import { errorHandler } from '../src/middleware/errorHandler.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('errorHandler middleware', () => {
  it('responde con el status del error si tiene uno definido', () => {
    const err = { status: 422, message: 'Entidad no procesable' };
    const req = {};
    const res = mockRes();
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ error: 'Entidad no procesable' });
  });

  it('responde con 500 si el error no tiene status', () => {
    const err = new Error('Error inesperado');
    const req = {};
    const res = mockRes();
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error inesperado' });
  });

  it('responde con mensaje genérico si el error no tiene message', () => {
    const err = {};
    const req = {};
    const res = mockRes();
    const next = vi.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
  });
});