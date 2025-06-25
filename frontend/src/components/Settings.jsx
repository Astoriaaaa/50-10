import { useState } from "react"
import { Button, Input } from "./UI"
import { User, LogOut, Target } from "lucide-react"
import { useAppContext } from "../utility/Context"

export const UserInfo = ({ user, onLogout }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">{user?.name}</h3>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>
      
      <Button
        variant="danger"
        size="small"
        onClick={onLogout}
        className="w-full"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  );
};

export const DailyGoalSetting = () => {
  const { dailyGoal, setDailyGoal } = useAppContext();
  const [tempGoal, setTempGoal] = useState(dailyGoal);

  const handleSave = () => {
    setDailyGoal(tempGoal);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold">Daily Goal</h3>
      </div>
      
      <div className="space-y-2">
        <Input
          type="number"
          value={tempGoal}
          onChange={(e) => setTempGoal(Number(e.target.value))}
          label="Minutes per day"
          min="1"
          max="480"
        />
        <Button
          variant="primary"
          size="small"
          onClick={handleSave}
        >
          Save Goal
        </Button>
      </div>
    </div>
  );
};

export const SettingsDropdown = ({ isOpen, user, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border w-80 p-4 z-50">
      <div className="space-y-6">
        <UserInfo user={user} onLogout={onLogout} />
        <hr />
        <DailyGoalSetting />
      </div>
    </div>
  );
};