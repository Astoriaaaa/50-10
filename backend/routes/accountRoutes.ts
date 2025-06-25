import express from 'express';
import { updateDailyGoals } from '../services/accountService';

const router = express.Router();

router.patch('/daily-goals', async (req, res) => {
  try {
    const { userId, goals } = req.body;
    const updatedUser = await updateDailyGoals(userId, goals);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
