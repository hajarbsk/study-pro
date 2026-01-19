// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings, Brain, Watch, Workflow, Timer, Book, BarChart } from 'lucide-react';

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'watch'>('work');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          // Notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Timer terminé!', {
              body: 'Beau travail! Prends une pause.',
            });
          }
          return mode === 'work' ? 5 * 60 : 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 50 * 60);
  };

  const switchMode = (newMode: 'work' | 'watch') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 50 * 60);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Vidéo Background */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/videos/studyHub.mp4" type="video/mp4" />
        {/* Fallback si pas de vidéo */}
      </video>

      {/* Gradient Overlay */}

      {/* Logo */}
      <div className="absolute top-10 left-10 z-10 flex items-center gap-3 text-white">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
          <Brain className="w-5 h-5" />
        </div>
        <span className="text-2xl font-bold">StudyHub Pro</span>
      </div>

      {/* Settings Button */}
     

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Mode Tabs */}
        <div className="flex gap-4 mb-10">
         <button
            onClick={() => switchMode('work')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${
              mode === 'work'
                ? 'bg-white text-purple-600'
                : 'bg-white/10 border-2 border-white/30 backdrop-blur-lg hover:bg-white/20'
            }`}
          >
            <Workflow className="w-5 h-5" />
            Work
         </button>

          <button
            onClick={() => switchMode('watch')}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${
              mode === 'watch'
                ? 'bg-white text-purple-600'
                : 'bg-white/10 border-2 border-white/30 backdrop-blur-lg hover:bg-white/20'
            }`}
          >
            <Watch className="w-5 h-5" /> Watch
          </button>
        </div>

        {/* Timer Display */}
        <div 
          className={`text-9xl font-bold mb-10 tracking-tighter ${
            isRunning ? 'animate-pulse' : ''
          }`}
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Start Button */}
       <div className="flex items-center gap-4 mb-35">
        <button
          onClick={handleStart}
          className={`px-16 py-5 rounded-full text-xl font-semibold transition-all transform hover:scale-105 hover:shadow-2xl ${
            isRunning
              ? 'bg-red-500 text-white'
              : 'bg-white text-purple-600'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={handleReset}
          className="w-12 h-12 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      </div>

      {/* Navigation Links */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex gap-5">
        
        <Link
          href="/sessions"
          className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold font-semibold hover:bg-white/20 transition-all hover:scale-105"
        >
          <Book className="w-5 h-5" />Sessions
        </Link>
        <Link
          href="/stats"
          className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold font-semibold hover:bg-white/20 transition-all hover:scale-105"
        >
          <BarChart className="w-5 h-5" /> Stats
        </Link>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}