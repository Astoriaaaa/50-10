import { SessionType } from "../utility/Types"
import { useEffect } from "react"
import { useTimer } from "../utility/Hooks"
import { useStats } from "../utility/Hooks"
import { Card, Button } from "./UI"
import { Pause, Play, RotateCcw } from "lucide-react"

const TimerDisplay = ({ time, sessionType }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-center space-y-4">
      <div className="text-6xl font-bold text-gray-800 font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="text-lg font-medium text-gray-600">
        {sessionType === SessionType.STUDY ? '📚 Study Session' : '☕ Break Time'}
      </div>
    </div>
  );
};

const TimerControls = ({ isRunning, onStart, onPause, onReset, onSwitch }) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant={isRunning ? "secondary" : "primary"}
        size="large"
        onClick={isRunning ? onPause : onStart}
      >
        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      
      <Button
        variant="ghost"
        size="large"
        onClick={onReset}
      >
        <RotateCcw className="w-5 h-5" />
        Reset
      </Button>
      
      <Button
        variant="secondary"
        size="large"
        onClick={onSwitch}
      >
        Switch Mode
      </Button>
    </div>
  );
};

export const PomodoroTimer = () => {
  const timer = useTimer();
  const { addStat } = useStats();

  useEffect(() => {
    if (timer.isCompleted) {
      addStat(
        timer.sessionType === SessionType.STUDY ? 25 : 5,
        timer.sessionType === SessionType.STUDY ? 25 : 5,
        timer.sessionType
      );
    }
  }, [timer.isCompleted]);

  return (
    <Card className="max-w-lg mx-auto">
      <div className="space-y-8">
        <TimerDisplay time={timer.time} sessionType={timer.sessionType} />
        <TimerControls
          isRunning={timer.isRunning}
          onStart={timer.start}
          onPause={timer.pause}
          onReset={timer.reset}
          onSwitch={timer.switchSession}
        />
        
        {timer.isCompleted && (
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 font-medium">
              🎉 {timer.sessionType === SessionType.STUDY ? 'Study' : 'Break'} session completed!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};