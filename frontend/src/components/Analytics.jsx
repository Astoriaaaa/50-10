import { useStats } from "../utility/Hooks"
import { useAppContext } from "../utility/Context"
import { GoalProgressCard, WeeklyProgressChart, StudyTimeChart } from "./StudyAnalytics"

export const AnalyticsPage = () => {
  const { getWeeklyProgress } = useStats();
  const { dailyGoal } = useAppContext();
  
  const weeklyData = getWeeklyProgress();
  const chartData = Object.entries(weeklyData).map(([date, data]) => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    study: Math.round(data.study),
    break: Math.round(data.break)
  }));

  const todayStudyTime = chartData[chartData.length - 1]?.study || 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      
      <GoalProgressCard 
        currentMinutes={todayStudyTime}
        goalMinutes={dailyGoal}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyProgressChart data={chartData} />
        <StudyTimeChart data={chartData} />
      </div>
    </div>
  );
};