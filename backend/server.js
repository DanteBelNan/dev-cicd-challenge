import express from 'express';
const app = express();
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.listen(3001, () => console.log("Running on 3001"));
