'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FolderOpen, 
  StickyNote, 
  Brain, 
  Trophy, 
  Settings,
  Zap,
  Star,
  Timer,
  Flame
} from 'lucide-react';

interface SidebarProps {
  userStats: {
    level: number;
    xp: number;
    xpToNext: number;
    coins: number;
    streak: number;
  };
}

export function Sidebar({ userStats }: SidebarProps) {
  const pathname = usePathname();
  
  const menuItems = [
    { id: '/', label: 'Dashboard', icon: Home },
    { id: '/workspaces', label: 'Workspaces', icon: FolderOpen },
    { id: '/notes', label: 'Notes', icon: StickyNote },
    { id: '/mindmap', label: 'Mind Maps', icon: Brain },
    { id: '/achievements', label: 'Achievements', icon: Trophy },
    { id: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10 p-6 z-50">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">🥧 Studypie</h1>
        <p className="text-sm text-gray-400 mt-1">Smart Study Companion</p>
      </div>

      {/* User Stats Card */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">L{userStats.level}</span>
            </div>
            <div>
              <div className="text-sm font-medium">Level {userStats.level}</div>
              <div className="text-xs text-gray-400">{userStats.xp} XP</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{userStats.coins}</div>
            <div className="text-xs text-gray-400">coins</div>
          </div>
        </div>
        
        {/* XP Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{userStats.xp}/{userStats.xp + userStats.xpToNext}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-violet-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2 text-sm">
          <Flame className="w-4 h-4 text-orange-400" />
          <span>{userStats.streak} day streak</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.id;
          
          return (
            <Link
              key={item.id}
              href={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30 text-violet-300' 
                  : 'hover:bg-white/5 text-gray-300 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all">
            <Timer className="w-5 h-5 text-green-400" />
            <span className="font-medium">Start Timer</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">Quick Note</span>
          </button>
        </div>
      </div>
    </div>
  );
}