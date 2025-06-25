import { useEffect, useRef, useState } from "react"
import { authApiClient } from "./ApiClient"
import { AuthError } from "./Types"
import { useAppContext } from "./Context"
import { statsApiClient } from "./ApiClient"
import { SessionType } from "./Types"
import { account, OAuthProvider } from './appwrite'


export const useAuth = () => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useAppContext();

  const loginWithGoogle = async () => {
    try {
      await account.createOAuth2Session(OAuthProvider.Google, "http://localhost:5173/",
        "http://localhost:5173/")
    } catch (error) {
      console.error(error)
    }
  }
  
  const logoutUser = async () => {
    try {
      await account.deleteSession('current')
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error)
    }
  }
  
  const getUser = async () => {
    try {
      return await account.get()
    } catch (error) {
      console.error(error)
    }
  }


  return { user, setUser, isAuthenticated, getUser, loginWithGoogle, logoutUser };
};

export const useTimer = (initialTime = 25 * 60) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState(SessionType.STUDY);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  const switchSession = () => {
    const newType = sessionType === SessionType.STUDY ? SessionType.BREAK : SessionType.STUDY;
    setSessionType(newType);
    setTime(newType === SessionType.STUDY ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  return {
    time,
    isRunning,
    sessionType,
    start,
    pause,
    reset,
    switchSession,
    isCompleted: time === 0
  };
};

export const useStats = () => {
  const { user, stats, setStats } = useAppContext();

  const addStat = async (duration, completed, sessionType) => {
    if (!user) return;

    const statData = {
      user: user._id || 'mock_user_id',
      duration,
      completed,
      isCompleted: completed === duration,
      sessionType
    };

    try {
      const savedStat = await statsApiClient.createStat(statData);
      setStats(prev => [...prev, savedStat]);
      return savedStat;
    } catch (error) {
      console.error('Failed to save stat:', error);
    }
  };

  const loadStats = async () => {
    if (!user) return;

    try {
      const userStats = await statsApiClient.getStatsByUser(user._id);
      setStats(userStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const getWeeklyProgress = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekStats = stats.filter(stat => {
      const statDate = new Date(stat.createdAt || Date.now());
      return statDate >= weekAgo && statDate <= today;
    });

    return weekStats.reduce((acc, stat) => {
      const date = new Date(stat.createdAt || Date.now()).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { study: 0, break: 0 };
      }
      acc[date][stat.sessionType.toLowerCase()] += stat.completed / 60;
      return acc;
    }, {});
  };

  return {
    stats,
    addStat,
    loadStats,
    getWeeklyProgress
  };
};
