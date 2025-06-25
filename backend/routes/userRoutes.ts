import express from 'express';
import {
  loginOrCreateUser,
  deleteUser,
  getUserById,
} from '../services/userService';
import { UserLoginDTO } from "../models/user"

const router = express.Router();

// POST /api/user/login
router.post('/login', async (req, res) => {
  try {
    const { googleId, email, name } = req.body as UserLoginDTO;
    const user = await loginOrCreateUser({ googleId, email, name });
    res.status(200).json(user);
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    res.status(500).json({ error: 'Failed to login or create user' });
  }
});

// GET /api/user/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('[GET USER ERROR]', err);
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// DELETE /api/user/:id
router.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200)
  } catch (err) {
    console.error('[DELETE USER ERROR]', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
