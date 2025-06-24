'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Flame, 
  Target, 
  BookOpen, 
  Clock, 
  Award,
  Zap,
  Crown,
  Medal,
  Shield,
  Gem
} from 'lucide-react';

export function AchievementsView() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: Trophy },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'streak', label: 'Streaks', icon: Flame },
    { id: 'level', label: 'Levels', icon: Crown },
    { id: 'special', label: 'Special', icon: Gem }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first study session',
      icon: Target,
      category: 'study',
      unlocked: true,
      unlockedAt: '2 days ago',
      xp: 50,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Study Streak Master',
      description: 'Maintain a 7-day study streak',
      icon: Flame,
      category: 'streak',
      unlocked: true,
      unlockedAt: '1 day ago',
      xp: 100,
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Note Taker',
      description: 'Create 50 notes',
      icon: BookOpen,
      category: 'study',
      unlocked: true,
      unlockedAt: '3 hours ago',
      xp: 75,
      rarity: 'uncommon'
    },
    {
      id: 4,
      title: 'Level Up Champion',
      description: 'Reach Level 5',
      icon: Crown,
      category: 'level',
      unlocked: true,
      unlockedAt: '1 week ago',
      xp: 200,
      rarity: 'epic'
    },
    {
      id: 5,
      title: 'Time Master',
      description: 'Study for 100 hours total',
      icon: Clock,
      category: 'study',
      unlocked: false,
      progress: 89,
      target: 100,
      xp: 300,
      rarity: 'legendary'
    },
    {
      id: 6,
      title: 'Consistency King',
      description: 'Maintain a 30-day streak',
      icon: Shield,
      category: 'streak',
      unlocked: false,
      progress: 12,
      target: 30,
      xp: 500,
      rarity: 'legendary'
    },
    {
      id: 7,
      title: 'Mind Map Master',
      description: 'Create 25 mind maps',
      icon: Zap,
      category: 'study',
      unlocked: false,
      progress: 8,
      target: 25,
      xp: 150,
      rarity: 'rare'
    },
    {
      id: 8,
      title: 'Perfect Week',
      description: 'Complete all daily goals for a week',
      icon: Medal,
      category: 'special',
      unlocked: false,
      progress: 4,
      target: 7,
      xp: 250,
      rarity: 'epic'
    }
  ];

  const rarityColors = {
    common: 'gray',
    uncommon: 'green',
    rare: 'blue',
    epic: 'purple',
    legendary: 'yellow'
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Achievements</h1>
          <p className="text-gray-400 mt-1">Track your study milestones and earn rewards</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-400">{unlockedCount}/{achievements.length}</div>
          <div className="text-sm text-gray-400">Unlocked</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 text-center">
          <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{unlockedCount}</div>
          <div className="text-sm text-gray-400">Achievements Unlocked</div>
        </div>
        
        <div className="glass rounded-2xl p-6 text-center">
          <Star className="w-8 h-8 text-violet-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">{totalXP}</div>
          <div className="text-sm text-gray-400">Total XP Earned</div>
        </div>
        
        <div className="glass rounded-2xl p-6 text-center">
          <Gem className="w-8 h-8 text-pink-400 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {achievements.filter(a => a.unlocked && a.rarity === 'legendary').length}
          </div>
          <div className="text-sm text-gray-400">Legendary Unlocked</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30'
                  : 'glass hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${selectedCategory === category.id ? 'text-violet-400' : 'text-gray-400'}`} />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon;
          const rarityColor = rarityColors[achievement.rarity as keyof typeof rarityColors];
          
          return (
            <div
              key={achievement.id}
              className={`glass rounded-2xl p-6 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'glow-effect card-hover' 
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  achievement.unlocked 
                    ? `bg-gradient-to-r from-${rarityColor}-500/20 to-${rarityColor}-400/20` 
                    : 'bg-gray-700'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    achievement.unlocked 
                      ? `text-${rarityColor}-400` 
                      : 'text-gray-500'
                  }`} />
                </div>
                
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 rounded-full capitalize ${
                    achievement.unlocked
                      ? `bg-${rarityColor}-500/20 text-${rarityColor}-300`
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {achievement.rarity}
                  </div>
                  {achievement.unlocked && (
                    <div className="text-xs text-green-400 mt-1">UNLOCKED</div>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className={`font-bold mb-2 ${
                achievement.unlocked ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h3>
              
              <p className="text-sm text-gray-400 mb-4">
                {achievement.description}
              </p>

              {/* Progress or Unlock Info */}
              {achievement.unlocked ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Unlocked {achievement.unlockedAt}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-medium">+{achievement.xp} XP</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div 
                      className={`bg-gradient-to-r from-${rarityColor}-400 to-${rarityColor}-300 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${((achievement.progress || 0) / (achievement.target || 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {Math.round(((achievement.progress || 0) / (achievement.target || 1)) * 100)}% complete
                    </span>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Star className="w-3 h-3" />
                      <span className="text-xs">+{achievement.xp} XP</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}