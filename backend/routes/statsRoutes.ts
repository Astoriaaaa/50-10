// routes/statsRoutes.ts
import express from 'express';
import { addStat, getStatsByUser } from '../services/statsService';
import { StatDTO } from '../models/stats';

const router = express.Router();

// POST /api/stats
router.post('/', async (req, res) => {
  try {
    const stat = req.body as StatDTO;
    const saved = await addStat(stat);
    res.status(200).json(saved);
  } catch (err) {
    console.error('[STATS][POST] Error:', err);
    res.status(500).json({ error: 'Failed to save stat' });
  }
});

// GET /api/stats/:userId
router.get('/:userId', async (req, res) => {
  try {
    const stats = await getStatsByUser(req.params.userId);
    res.status(200).json(stats);
  } catch (err) {
    console.error('[STATS][GET] Error:', err);
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});

export default router;
