import { createContext, useContext, useState } from "react"

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(25);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    stats,
    setStats,
    dailyGoal,
    setDailyGoal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};