// src/app/stats/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Target, Award, TrendingUp, Calendar, Zap } from 'lucide-react';
import Header from '@/components/Header';

export default function StatsPage() {
  const [isDark, setIsDark] = useState(true);

  // Données fictives pour démonstration
  const stats = {
    totalMinutes: 750,
    completedSessions: 24,
    totalSessions: 30,
    streak: 7,
    averageRating: 4.2,
    todaySessions: 3,
    weeklyGoal: 10,
    weeklyCompleted: 7
  };

  const bgClass = isDark 
    ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
  
  const cardClass = isDark 
    ? 'bg-slate-800/50 border-slate-700' 
    : 'bg-white border-gray-200';
  
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  const mainStats = [
    {
      label: 'Heures d\'Étude',
      value: Math.floor(stats.totalMinutes / 60),
      unit: 'h',
      subValue: `${stats.totalMinutes % 60} min`,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      bgColor: isDark ? 'bg-blue-500/10' : 'bg-blue-50'
    },
    {
      label: 'Sessions Complétées',
      value: stats.completedSessions,
      unit: '',
      subValue: `sur ${stats.totalSessions} total`,
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      bgColor: isDark ? 'bg-purple-500/10' : 'bg-purple-50'
    },
    {
      label: 'Streak Actuel',
      value: stats.streak,
      unit: 'jours',
      subValue: 'Continue comme ça! 🔥',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      bgColor: isDark ? 'bg-orange-500/10' : 'bg-orange-50'
    }
  ];

  const weeklyProgress = [
    { day: 'Lun', sessions: 2, goal: 2 },
    { day: 'Mar', sessions: 1, goal: 2 },
    { day: 'Mer', sessions: 2, goal: 2 },
    { day: 'Jeu', sessions: 1, goal: 2 },
    { day: 'Ven', sessions: 1, goal: 2 },
    { day: 'Sam', sessions: 0, goal: 1 },
    { day: 'Dim', sessions: 0, goal: 1 }
  ];

  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-500`}>
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        

        {/* Header */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${textClass} mb-2`}>
            Tes Statistiques
          </h2>
          <p className={`${textSecondaryClass}`}>
            Analyse ta progression et reste motivé(e)
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainStats.map((stat) => (
            <div 
              key={stat.label}
              className={`${cardClass} border rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform`}
            >
              <div className={`${stat.bgColor} p-3 rounded-xl w-fit mb-4`}>
                <stat.icon className="w-6 h-6 text-current" style={{ 
                  color: isDark ? '#fff' : stat.color.includes('blue') ? '#3B82F6' : 
                         stat.color.includes('purple') ? '#A855F7' : '#F97316'
                }} />
              </div>
              <p className={`text-sm ${textSecondaryClass} mb-2`}>{stat.label}</p>
              <p className={`text-4xl font-bold ${textClass}`}>
                {stat.value}
                <span className="text-xl ml-1">{stat.unit}</span>
              </p>
              <p className={`text-xs ${textSecondaryClass} mt-2`}>{stat.subValue}</p>
            </div>
          ))}
        </div>

        {/* Weekly Progress */}
        <div className={`${cardClass} border rounded-2xl p-6 shadow-lg mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${textClass}`}>
              Progression Hebdomadaire
            </h3>
            <div className={`${isDark ? 'bg-slate-700' : 'bg-gray-100'} px-4 py-2 rounded-lg`}>
              <span className={`text-sm ${textSecondaryClass}`}>
                {stats.weeklyCompleted} / {stats.weeklyGoal} objectif
              </span>
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-4 h-48">
            {weeklyProgress.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end h-full">
                  {/* Bar */}
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        day.sessions >= day.goal 
                          ? 'bg-gradient-to-t from-green-500 to-green-400' 
                          : 'bg-gradient-to-t from-purple-500 to-pink-500'
                      }`}
                      style={{ height: `${(day.sessions / stats.weeklyGoal) * 100}%` }}
                    >
                      {day.sessions > 0 && (
                        <div className={`text-xs font-bold text-white text-center pt-2`}>
                          {day.sessions}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Day label */}
                <span className={`text-xs ${textSecondaryClass} mt-2`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Aujourd\'hui', value: stats.todaySessions, icon: Calendar },
            { label: 'Taux Complétion', value: `${Math.round((stats.completedSessions / stats.totalSessions) * 100)}%`, icon: TrendingUp },
            { label: 'Moyenne / Jour', value: '3.4', icon: Zap },
            { label: 'Plus Long Streak', value: '12 j', icon: Award }
          ].map((item) => (
            <div 
              key={item.label}
              className={`${cardClass} border rounded-xl p-4 text-center hover:scale-105 transition-transform`}
            >
              <item.icon className={`w-5 h-5 ${textClass} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${textClass} mb-1`}>{item.value}</p>
              <p className={`text-xs ${textSecondaryClass}`}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Motivational Card */}
        <div className={`${cardClass} border rounded-2xl p-6 mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10`}>
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎯</div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${textClass} mb-1`}>
                Continue comme ça!
              </h3>
              <p className={`text-sm ${textSecondaryClass}`}>
                Tu es sur la bonne voie. {stats.weeklyGoal - stats.weeklyCompleted} sessions pour atteindre ton objectif hebdomadaire.
              </p>
            </div>
            <div className={`${isDark ? 'bg-purple-500/20' : 'bg-purple-100'} px-6 py-3 rounded-lg`}>
              <p className={`text-3xl font-bold text-purple-500`}>
                {Math.round((stats.weeklyCompleted / stats.weeklyGoal) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}