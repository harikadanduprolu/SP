'use client';

import { Sidebar } from '../../components/Sidebar';
import { QuickActions } from '../../components/QuickActions';
import { AIAssistant } from '../../components/AIAssistant';

const userStats = {
  level: 5,
  xp: 1250,
  xpToNext: 1500,
  coins: 340,
  streak: 7,
  totalStudyHours: 42,
  completedSubjects: 8,
  totalNotes: 24
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar userStats={userStats} />
      <main className="flex-1 ml-64 overflow-auto">
        {children}
      </main>
      <QuickActions />
      <AIAssistant />
    </div>
  );
} 