'use client';

import { MainDashboard } from '../../../components/MainDashboard';

export default function DashboardPage() {
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

  return (
    <div className="p-6">
      <MainDashboard userStats={userStats} />
    </div>
  );
} 