'use client';

import { useState } from 'react';
import { 
  Plus, 
  Timer, 
  Brain, 
  FileText, 
  Zap,
  Target,
  Coffee,
  BookOpen
} from 'lucide-react';
import { StudyTimer } from './StudyTimer';

export function QuickActions() {
  const [showTimer, setShowTimer] = useState(false);

  const actions = [
    {
      id: 'timer',
      label: 'Start Timer',
      icon: Timer,
      color: 'violet',
      action: () => setShowTimer(true)
    },
    {
      id: 'note',
      label: 'Quick Note',
      icon: FileText,
      color: 'blue',
      action: () => console.log('Quick note')
    },
    {
      id: 'mindmap',
      label: 'Mind Map',
      icon: Brain,
      color: 'pink',
      action: () => console.log('Mind map')
    },
    {
      id: 'goal',
      label: 'Set Goal',
      icon: Target,
      color: 'green',
      action: () => console.log('Set goal')
    }
  ];

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <div className="flex flex-col gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className={`w-12 h-12 bg-gradient-to-r from-${action.color}-500 to-${action.color}-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform glow-effect group`}
                title={action.label}
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="absolute left-14 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <StudyTimer isOpen={showTimer} onClose={() => setShowTimer(false)} />
    </>
  );
}