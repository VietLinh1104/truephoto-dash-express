if (!req.user || !req.user.role) {
  return res.status(403).json({ error: 'User information is missing or unauthorized' });
}