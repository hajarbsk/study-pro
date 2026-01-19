// src/hooks/useTimer.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { TimerMode, TimerSettings } from '@/types';

export function useTimer(settings: TimerSettings) {
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<TimerMode>('focus');
  const [pomodoroCount, setPomodoroCount] = useState(0);

  // Effet principal du timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          console.log('🔔 Timer terminé!');
          
          // Changer de mode
          if (timerMode === 'focus') {
            setPomodoroCount(c => c + 1);
            setTimerMode('break');
            return settings.shortBreak * 60;
          } else {
            setTimerMode('focus');
            return settings.focusDuration * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timerMode, settings]);

  // Fonctions de contrôle
  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(timerMode === 'focus' ? settings.focusDuration * 60 : settings.shortBreak * 60);
  }, [timerMode, settings]);

  const switchMode = useCallback((mode: TimerMode) => {
    setTimerMode(mode);
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? settings.focusDuration * 60 : settings.shortBreak * 60);
  }, [settings]);

  // Formater le temps
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Calculer le progrès
  const progress = timerMode === 'focus'
    ? ((settings.focusDuration * 60 - timeLeft) / (settings.focusDuration * 60)) * 100
    : ((settings.shortBreak * 60 - timeLeft) / (settings.shortBreak * 60)) * 100;

  return {
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
  };
}