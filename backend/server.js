import express from 'express';
import { getHealth } from './handlers/health.js';
import { validateCuitHandler } from './handlers/cuit.js';
import { getRollback } from './handlers/rollback.js';

const app = express();
app.use(express.json());
const PORT = 3001;

app.get('/health', getHealth);
app.post('/cuit/validate', validateCuitHandler);
app.get('/rollback', getRollback);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Running on ${PORT}`));
}

export default app;