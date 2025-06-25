import PomodoroStat, { StatDTO } from '../models/stats';

export async function addStat(stat: StatDTO) {
  try {
    const newStat = new PomodoroStat(stat);
    return await newStat.save();
  } catch (err) {
    console.error('[StatService][addStat] Error:', err);
    throw new Error('Failed to add stat');
  }
}

export async function getStatsByUser(userId: string) {
  try {
    return await PomodoroStat.find({ user: userId }).sort({ createdAt: -1 });
  } catch (err) {
    console.error('[StatService][getStatsByUser] Error:', err);
    throw new Error('Failed to fetch stats');
  }
}