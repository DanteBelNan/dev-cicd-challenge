import { describe, it, expect, jest } from '@jest/globals';
import { getHealth } from '../handlers/health.js';

describe('Unit Test for Health Handler', () => {
  it('should call res.status with 200 and res.json with the correct payload', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req = {};

    getHealth(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 'ok' });
  });
});