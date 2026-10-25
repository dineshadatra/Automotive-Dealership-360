import { describe, it, expect } from 'vitest';
import { buildApp } from '../src/app.js';

describe('GET /api/v1/health', () => {
  it('returns ok with a request id', async () => {
    const app = buildApp();
    const res = await app.inject({ method: 'GET', url: '/api/v1/health' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.status).toBe('ok');
    expect(typeof body.requestId).toBe('string');
    expect(res.headers['x-request-id']).toBe(body.requestId);
  });

  it('uses the standard error shape for unknown routes', async () => {
    const app = buildApp();
    const res = await app.inject({ method: 'GET', url: '/api/v1/nope' });
    expect(res.statusCode).toBe(404);
    expect(res.json().error.code).toBe('NOT_FOUND');
  });
});