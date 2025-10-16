export const getHealth = (_req, res) => {
  res.status(200).json({ status: 'ok. This content is not gonna be available since an automatic rollback will go to the previous version' });
};