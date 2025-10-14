import request from 'supertest';
import app from '../server.js'; 

describe('GET /health endpoint', () => {
  it('should respond with a 200 status and the correct API contract', async () => {
    const response = await request(app)
      .get('/health')
      .expect('Content-Type', /json/) 
      .expect(200); 

    expect(response.body).toEqual({ status: 'ok' });
  });
});