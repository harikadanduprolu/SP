'use client';

import { useState, useEffect } from 'react';
import { MainDashboard } from '@/components/MainDashboard';
import { Sidebar } from '@/components/Sidebar';
import { WorkspaceView } from '@/components/WorkspaceView';
import { NotesView } from '@/components/NotesView';
import { MindMapView } from '@/components/MindMapView';
import { AchievementsView } from '@/components/AchievementsView';
import { SettingsView } from '@/components/SettingsView';
import { AIAssistant } from '@/components/AIAssistant';
import { QuickActions } from '@/components/QuickActions';

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [userStats, setUserStats] = useState({
    level: 7,
    xp: 2340,
    xpToNext: 660,
    coins: 1250,
    streak: 12,
    totalStudyHours: 89,
    completedSubjects: 4,
    totalNotes: 234
  });

  // Simulate XP gain and level progression
  useEffect(() => {
    const interval = setInterval(() => {
      setUserStats(prev => {
        const newXP = prev.xp + Math.floor(Math.random() * 5);
        const newLevel = newXP >= (prev.xp + prev.xpToNext) ? prev.level + 1 : prev.level;
        const newXPToNext = newLevel > prev.level ? 1000 : prev.xpToNext - (newXP - prev.xp);
        
        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          xpToNext: newXPToNext,
          coins: prev.coins + (newLevel > prev.level ? 100 : 0)
        };
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <MainDashboard userStats={userStats} />;
      case 'workspaces':
        return <WorkspaceView />;
      case 'notes':
        return <NotesView />;
      case 'mindmap':
        return <MindMapView />;
      case 'achievements':
        return <AchievementsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <MainDashboard userStats={userStats} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        userStats={userStats} 
      />
      
      <main className="flex-1 ml-64 p-6">
        {renderActiveView()}
      </main>

      <AIAssistant />
      <QuickActions />
    </div>
  );
}