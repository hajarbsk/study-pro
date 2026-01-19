// src/components/Header.tsx
'use client';

import React from 'react';
import { Brain, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDark, onThemeToggle }: HeaderProps) {
  const cardClass = isDark 
    ? 'bg-slate-800/50 border-slate-700' 
    : 'bg-white border-gray-200';
  
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <header className={`${cardClass} border-b backdrop-blur-lg sticky top-0 z-50 shadow-lg`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et Titre */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${textClass}`}>
                Study<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Hub Pro</span>
              </h1>
             
            </div>
          </div>
          
          {/* Bouton Theme */}
          <button
            onClick={onThemeToggle}
            className={`p-3 rounded-xl ${cardClass} border hover:scale-105 transition-transform`}
          >
            {isDark ? 
              <Sun className="w-5 h-5 text-yellow-400" /> : 
              <Moon className="w-5 h-5 text-purple-600" />
            }
          </button>
        </div>
      </div>
    </header>
  );
}