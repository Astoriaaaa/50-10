import React from 'react';
import { useStats } from "./utility/Hooks"
import { Header } from "./components/Header"
import { useState, useEffect } from "react"
import { Navigation } from "./components/Navigation"
import { PomodoroTimer } from "./components/Pomodoro"
import { AnalyticsPage } from "./components/Analytics"

export const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('timer');
  const { loadStats } = useStats();

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'timer' && <PomodoroTimer />}
        {currentPage === 'analytics' && <AnalyticsPage />}
      </main>
    </div>
  );
};