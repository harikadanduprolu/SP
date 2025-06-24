'use client';

import { useState } from 'react';
import { 
  Home, 
  FolderOpen, 
  StickyNote, 
  Brain, 
  Trophy, 
  Settings,
  Zap,
  Star,
  Timer
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  userStats: {
    level: number;
    xp: number;
    xpToNext: number;
    coins: number;
    streak: number;
  };
}

export function Sidebar({ activeView, setActiveView, userStats }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'workspaces', label: 'Workspaces', icon: FolderOpen },
    { id: 'notes', label: 'Notes', icon: StickyNote },
    { id: 'mindmap', label: 'Mind Maps', icon: Brain },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10 p-6 z-50">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">🥧 Studypie</h1>
        <p className="text-sm text-gray-400 mt-1">Smart Study Companion</p>
      </div>

      {/* User Stats Card */}
      <div className="glass rounded-2xl p-4 mb-6 glow-effect">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 flex items-center justify-center text-sm font-bold">
              L{userStats.level}
            </div>
            <span className="font-semibold">Level {userStats.level}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{userStats.coins}</span>
          </div>
        </div>
        
        {/* XP Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>XP: {userStats.xp}</span>
            <span>{userStats.xpToNext} to next level</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-violet-400 to-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-orange-400" />
          <span className="text-sm">{userStats.streak} day streak! 🔥</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30 glow-effect' 
                  : 'hover:bg-white/5 hover:scale-105'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-gray-400'}`} />
              <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="mt-8 glass rounded-2xl p-4">
        <h3 className="font-semibold mb-3 text-sm text-gray-300">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Zap className="w-4 h-4" />
            Daily Challenge
          </button>
          <button className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Brain className="w-4 h-4" />
            Generate Mind Map
          </button>
        </div>
      </div>
    </div>
  );
}