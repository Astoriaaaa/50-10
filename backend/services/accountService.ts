import User from '../models/user';

export async function updateDailyGoals(userId: string, goals: [number, Date, Date][]) {
  return await User.findByIdAndUpdate(
    userId,
    { $push: { historicalDailyGoals: { $each: goals } } },
    { new: true }
  );
}