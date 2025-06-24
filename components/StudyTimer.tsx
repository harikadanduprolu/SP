'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Coffee,
  Brain,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

interface StudyTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudyTimer({ isOpen, onClose }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [settings, setSettings] = useState({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4,
    soundEnabled: true
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (!isBreak) {
      // Work session completed
      setSessions(prev => prev + 1);
      const newSessions = sessions + 1;
      
      if (newSessions % settings.sessionsUntilLongBreak === 0) {
        // Long break
        setTimeLeft(settings.longBreak * 60);
        setIsBreak(true);
      } else {
        // Short break
        setTimeLeft(settings.shortBreak * 60);
        setIsBreak(true);
      }
    } else {
      // Break completed
      setTimeLeft(settings.workTime * 60);
      setIsBreak(false);
    }

    // Play notification sound
    if (settings.soundEnabled) {
      // In a real app, you'd play an actual sound file
      console.log('Timer complete!');
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? settings.shortBreak * 60 : settings.workTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((settings.shortBreak * 60 - timeLeft) / (settings.shortBreak * 60)) * 100
    : ((settings.workTime * 60 - timeLeft) / (settings.workTime * 60)) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-2xl p-8 w-full max-w-md glow-effect">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Study Timer</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="relative w-48 h-48 mx-auto mb-4">
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={isBreak ? "#10B981" : "#8B5CF6"}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
              <div className={`text-sm px-3 py-1 rounded-full ${
                isBreak 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-violet-500/20 text-violet-300'
              }`}>
                {isBreak ? 'Break Time' : 'Focus Time'}
              </div>
            </div>
          </div>

          {/* Session Counter */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-gray-400">
              Session {sessions} of {settings.sessionsUntilLongBreak}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={resetTimer}
            className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleTimer}
            className="p-4 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full hover:scale-105 transition-transform"
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>
          
          <button
            onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Quick Settings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Work Time</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSettings(prev => ({ ...prev, workTime: Math.max(5, prev.workTime - 5) }))}
                className="w-6 h-6 glass rounded hover:bg-white/10 transition-colors text-xs"
              >
                -
              </button>
              <span className="w-12 text-center">{settings.workTime}m</span>
              <button
                onClick={() => setSettings(prev => ({ ...prev, workTime: Math.min(60, prev.workTime + 5) }))}
                className="w-6 h-6 glass rounded hover:bg-white/10 transition-colors text-xs"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Break Time</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSettings(prev => ({ ...prev, shortBreak: Math.max(1, prev.shortBreak - 1) }))}
                className="w-6 h-6 glass rounded hover:bg-white/10 transition-colors text-xs"
              >
                -
              </button>
              <span className="w-12 text-center">{settings.shortBreak}m</span>
              <button
                onClick={() => setSettings(prev => ({ ...prev, shortBreak: Math.min(15, prev.shortBreak + 1) }))}
                className="w-6 h-6 glass rounded hover:bg-white/10 transition-colors text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 p-3 glass rounded-lg text-center">
          <div className="text-xs text-gray-400">
            {isRunning ? 'Timer is running...' : 'Ready to start studying!'}
          </div>
        </div>
      </div>
    </div>
  );
}