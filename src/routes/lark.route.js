// routes/lark.route.js
import express from 'express';
import { sendText } from '../services/larkNotify.service.js';

const router = express.Router();

router.post('/notify', async (req, res, next) => {
  const { chatId, message } = req.body;
  if (!chatId || !message) return res.status(400).json({ error: 'Missing chatId or message' });
  try {
    const result = await sendText(chatId, message);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
