export const createError = (_req, res) => {
  res.status(500).json({ mustRollback: true, message: 'This is a simulated production error.' });
};