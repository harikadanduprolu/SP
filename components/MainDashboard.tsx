'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Play,
  CheckCircle,
  Award,
  Flame,
  Zap
} from 'lucide-react';

interface MainDashboardProps {
  userStats: {
    level: number;
    xp: number;
    coins: number;
    streak: number;
    totalStudyHours: number;
    completedSubjects: number;
    totalNotes: number;
  };
}

export function MainDashboard({ userStats }: MainDashboardProps) {
  const [dailyGoal] = useState({ target: 4, completed: 2.5 });
  
  const recentWorkspaces = [
    { name: 'Data Structures', progress: 75, lastStudied: '2 hours ago', color: 'violet' },
    { name: 'Machine Learning', progress: 60, lastStudied: '1 day ago', color: 'blue' },
    { name: 'System Design', progress: 40, lastStudied: '2 days ago', color: 'pink' },
  ];

  const dailyMissions = [
    { task: 'Study for 2 hours', progress: 100, xp: 50, completed: true },
    { task: 'Complete 3 practice problems', progress: 67, xp: 30, completed: false },
    { task: 'Review yesterday\'s notes', progress: 0, xp: 20, completed: false },
  ];

  const achievements = [
    { title: 'Study Streak Master', description: '10+ day streak', icon: Flame, unlocked: true },
    { title: 'Note Taker', description: '100+ notes created', icon: BookOpen, unlocked: true },
    { title: 'Level Up Champion', description: 'Reach Level 5', icon: Award, unlocked: true },
    { title: 'Consistency King', description: '30 day streak', icon: Target, unlocked: false },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="glass rounded-2xl p-6 glow-effect">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="gradient-text">Studier</span>! 👋
            </h1>
            <p className="text-gray-400">Ready to crush your study goals today?</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold gradient-text">{userStats.streak} 🔥</div>
            <div className="text-sm text-gray-400">day streak</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Clock className="w-6 h-6 text-violet-400" />
            </div>
            <span className="text-2xl font-bold">{userStats.totalStudyHours}h</span>
          </div>
          <h3 className="font-semibold text-gray-300">Total Study Time</h3>
          <p className="text-sm text-gray-500">This month</p>
        </div>

        <div className="glass rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-2xl font-bold">{userStats.completedSubjects}/8</span>
          </div>
          <h3 className="font-semibold text-gray-300">Subjects Progress</h3>
          <p className="text-sm text-gray-500">50% complete</p>
        </div>

        <div className="glass rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-pink-500/20">
              <Target className="w-6 h-6 text-pink-400" />
            </div>
            <span className="text-2xl font-bold">{userStats.totalNotes}</span>
          </div>
          <h3 className="font-semibold text-gray-300">Notes Created</h3>
          <p className="text-sm text-gray-500">+12 this week</p>
        </div>

        <div className="glass rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-2xl font-bold">Level {userStats.level}</span>
          </div>
          <h3 className="font-semibold text-gray-300">Current Level</h3>
          <p className="text-sm text-gray-500">{userStats.xp} XP total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Goal Progress */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today's Goal</h2>
            <span className="text-sm text-gray-400">{dailyGoal.completed}/{dailyGoal.target} hours</span>
          </div>
          
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-violet-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(dailyGoal.completed / dailyGoal.target) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>You're {Math.round((dailyGoal.completed / dailyGoal.target) * 100)}% towards your daily goal</span>
          </div>
        </div>

        {/* Recent Workspaces */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Workspaces</h2>
          <div className="space-y-3">
            {recentWorkspaces.map((workspace, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${workspace.color}-400`}></div>
                  <div>
                    <h3 className="font-medium">{workspace.name}</h3>
                    <p className="text-xs text-gray-400">{workspace.lastStudied}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{workspace.progress}%</div>
                  <Play className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Missions */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Daily Missions</h2>
            <Zap className="w-5 h-5 text-yellow-400" />
          </div>
          
          <div className="space-y-3">
            {dailyMissions.map((mission, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${mission.completed ? 'text-green-400' : 'text-gray-500'}`} />
                  <div>
                    <h3 className={`font-medium ${mission.completed ? 'line-through text-gray-500' : ''}`}>
                      {mission.task}
                    </h3>
                    {!mission.completed && (
                      <div className="w-20 bg-gray-700 rounded-full h-1 mt-1">
                        <div 
                          className="bg-gradient-to-r from-violet-400 to-blue-400 h-1 rounded-full"
                          style={{ width: `${mission.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-yellow-400">+{mission.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.unlocked ? 'bg-gradient-to-r from-violet-500/10 to-blue-500/10' : 'bg-white/5'}`}>
                  <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20' : 'bg-gray-700'}`}>
                    <Icon className={`w-5 h-5 ${achievement.unlocked ? 'text-violet-400' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-xs text-gray-400">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <div className="ml-auto text-xs text-violet-400 font-medium">UNLOCKED</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}