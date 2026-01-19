// src/app/timer/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft, Coffee, Target } from 'lucide-react';
import Header from '@/components/Header';
import TimerCircle from '@/components/TimerCircle';
import { useTimer } from '@/hooks/useTimer';

export default function TimerPage() {
  const [isDark, setIsDark] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const timerSettings = {
    focusDuration: 25,
    shortBreak: 5,
    longBreak: 15
  };

  const {
    timeLeft,
    isRunning,
    timerMode,
    pomodoroCount,
    progress,
    start,
    pause,
    reset,
    switchMode,
    formatTime
  } = useTimer(timerSettings);

  const bgClass = isDark 
    ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
  
  const cardClass = isDark 
    ? 'bg-slate-800/50 border-slate-700' 
    : 'bg-white border-gray-200';
  
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-500`}>
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link 
          href="/"
          className={`inline-flex items-center gap-2 ${textSecondaryClass} hover:${textClass} mb-6 transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Main Timer Card */}
        <div className={`${cardClass} border rounded-2xl p-8 shadow-2xl mb-6`}>
          {/* Mode Indicator */}
          <div className="text-center mb-6">
            <span className={`text-sm font-medium px-4 py-2 rounded-full ${
              timerMode === 'focus' 
                ? 'bg-purple-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {timerMode === 'focus' ? '🎯 Focus Time' : '☕ Break Time'}
            </span>
          </div>

          {/* Mode Switch Buttons */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => switchMode('focus')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                timerMode === 'focus'
                  ? 'bg-purple-500 text-white'
                  : `${cardClass} ${textSecondaryClass}`
              }`}
            >
              <Target className="w-4 h-4" />
              Focus (25 min)
            </button>
            <button
              onClick={() => switchMode('break')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                timerMode === 'break'
                  ? 'bg-green-500 text-white'
                  : `${cardClass} ${textSecondaryClass}`
              }`}
            >
              <Coffee className="w-4 h-4" />
              Break (5 min)
            </button>
          </div>

          {/* Timer Circle */}
          <div className="mb-8">
            <TimerCircle 
              progress={progress}
              timeDisplay={formatTime(timeLeft)}
              pomodoroCount={pomodoroCount}
              isDark={isDark}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={isRunning ? pause : start}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-5 rounded-full hover:scale-110 transition-transform shadow-xl"
            >
              {isRunning ? 
                <Pause className="w-7 h-7" /> : 
                <Play className="w-7 h-7 ml-1" />
              }
            </button>
            
            {/* Reset */}
            <button
              onClick={reset}
              className={`${cardClass} border p-4 rounded-full hover:scale-110 transition-transform`}
            >
              <RotateCcw className={`w-6 h-6 ${textClass}`} />
            </button>
            
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`${cardClass} border p-4 rounded-full hover:scale-110 transition-transform`}
            >
              {soundEnabled ? 
                <Volume2 className={`w-6 h-6 ${textClass}`} /> : 
                <VolumeX className={`w-6 h-6 ${textClass}`} />
              }
            </button>
          </div>
        </div>

        {/* Tips Card */}
        <div className={`${cardClass} border rounded-xl p-6`}>
          <h3 className={`font-bold text-lg mb-4 ${textClass}`}>
            💡 Conseils pour une session productive
          </h3>
          <ul className={`space-y-2 ${textSecondaryClass}`}>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>Élimine toutes les distractions avant de commencer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>Définis un objectif clair pour cette session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>Pendant la pause, lève-toi et bouge un peu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span>Après 4 Pomodoros, prends une pause plus longue (15-30 min)</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}