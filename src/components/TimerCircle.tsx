// src/components/TimerCircle.tsx
'use client';

import React from 'react';

interface TimerCircleProps {
  progress: number;
  timeDisplay: string;
  pomodoroCount: number;
  isDark: boolean;
}

export default function TimerCircle({ 
  progress, 
  timeDisplay, 
  pomodoroCount,
  isDark 
}: TimerCircleProps) {
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg className="transform -rotate-90 w-64 h-64">
        {/* Cercle de fond */}
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke={isDark ? '#374151' : '#E5E7EB'}
          strokeWidth="8"
          fill="none"
        />
        {/* Cercle de progression */}
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 120}`}
          strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
          className="transition-all duration-1000"
          strokeLinecap="round"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Texte au centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold ${textClass}`}>
          {timeDisplay}
        </span>
        <span className={`text-sm ${textSecondaryClass} mt-2`}>
          {Math.floor(progress)}% complété
        </span>
        <span className={`text-xs ${textSecondaryClass} mt-1`}>
          Pomodoro #{pomodoroCount + 1}
        </span>
      </div>
    </div>
  );
}