import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from './UI';
import { Target } from 'lucide-react';


export const GoalProgressCard = ({ currentMinutes, goalMinutes }) => {
  const progress = Math.min((currentMinutes / goalMinutes) * 100, 100);
  const isGoalMet = currentMinutes >= goalMinutes;

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Today's Goal</h3>
          <Target className={`w-6 h-6 ${isGoalMet ? 'text-green-600' : 'text-gray-400'}`} />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{currentMinutes} / {goalMinutes} minutes</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                isGoalMet ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {isGoalMet && (
          <p className="text-green-600 text-sm font-medium">🎉 Goal achieved!</p>
        )}
      </div>
    </Card>
  );
};

export const WeeklyProgressChart = ({ data }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Weekly Study Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="study" fill="#3b82f6" name="Study (minutes)" />
          <Bar dataKey="break" fill="#10b981" name="Break (minutes)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export const StudyTimeChart = ({ data }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Study Time Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="study" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Study Time (minutes)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};