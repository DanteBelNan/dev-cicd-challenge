import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should respond with a 200 status and the correct API contract', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('POST /cuit/validate', () => {
    it('should return 200 and isValid:true for a valid CUIT', async () => {
      const response = await request(app)
        .post('/cuit/validate')
        .send({ cuit: '20111111112' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isValid: true, cuit: '20111111112' });
    });

    it('should return 400 for a CUIT with invalid format', async () => {
      const response = await request(app)
        .post('/cuit/validate')
        .send({ cuit: '123' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'CUIT must be a string of 11 digits.' });
    });
  });
});