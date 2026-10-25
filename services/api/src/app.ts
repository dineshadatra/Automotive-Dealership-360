import Fastify from 'fastify';
import { randomUUID } from 'node:crypto';

export function buildApp() {
  const app = Fastify({
    logger: process.env.NODE_ENV !== 'test',
    genReqId: () => randomUUID(),
  });

  app.addHook('onSend', async (request, reply) => {
    reply.header('x-request-id', request.id);
  });

  app.get('/api/v1/health', async (request) => {
    return { status: 'ok', service: 'ad360-api', requestId: request.id };
  });

  app.setNotFoundHandler(async (request, reply) => {
    reply.status(404);
    return {
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found',
        requestId: request.id,
      },
    };
  });

  return app;
}