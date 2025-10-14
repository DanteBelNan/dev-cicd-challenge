import { describe, it, expect } from '@jest/globals';
import { isCuitValid } from '../validators/cuit.js';

describe('CUIT Validator Logic', () => {
  it('should return true for a valid CUIT', () => {
    expect(isCuitValid('20111111112')).toBe(true);
  });
  it('should return false for an invalid CUIT', () => {
    expect(isCuitValid('20111111113')).toBe(false);
  });
  it('should return false for a CUIT with fewer than 11 digits', () => {
    expect(isCuitValid('2011111111')).toBe(false);
  });
  it('should return false for a CUIT with more than 11 digits', () => {
    expect(isCuitValid('201111111123')).toBe(false);
  });
  it('should return false for a CUIT with non-digit characters', () => {
    expect(isCuitValid('2011111111a')).toBe(false);
  });
});