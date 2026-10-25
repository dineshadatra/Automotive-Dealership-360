import { buildApp } from './app.js';

const port = Number(process.env.AD360_API_PORT ?? 3001);
const app = buildApp();

app
  .listen({ port, host: '127.0.0.1' })
  .then(() => console.log(`AD360 API listening on http://127.0.0.1:${port}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });