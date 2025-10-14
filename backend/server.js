import express from 'express';
import { getHealth } from './handlers/health.handler.js';

const app = express();

app.get('/health', getHealth);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3001, () => console.log(`Running on 3001`));
}

export default app;

