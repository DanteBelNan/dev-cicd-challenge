import { isCuitValid } from '../validators/cuit.js';

export const validateCuitHandler = (req, res) => {
  const { cuit } = req.body;
  if (!cuit || typeof cuit !== 'string' || !/^\d{11}$/.test(cuit)) {
    return res.status(400).json({ error: 'CUIT must be a string of 11 digits.' });
  }
  const isValid = isCuitValid(cuit);
  return res.status(200).json({ isValid, cuit });
};