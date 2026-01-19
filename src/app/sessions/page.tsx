// src/app/sessions/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowLeft, Check, Trash2, X } from 'lucide-react';
import Header from '@/components/Header';
import { StudySession } from '@/types';

export default function SessionsPage() {
  const [isDark, setIsDark] = useState(true);
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'React Avancé',
      topic: 'Hooks personnalisés',
      duration: 25,
      date: new Date().toISOString().split('T')[0],
      completed: true,
      notes: 'Compris useCallback et useMemo'
    },
    {
      id: '2',
      subject: 'TypeScript',
      topic: 'Types génériques',
      duration: 45,
      date: new Date().toISOString().split('T')[0],
      completed: false,
      notes: 'À réviser demain'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    duration: 25,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const bgClass = isDark 
    ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50';
  
  const cardClass = isDark 
    ? 'bg-slate-800/50 border-slate-700' 
    : 'bg-white border-gray-200';
  
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDark ? 'text-gray-300' : 'text-gray-600';

  const addSession = () => {
    if (!formData.subject.trim() || !formData.topic.trim()) return;

    const newSession: StudySession = {
      id: Date.now().toString(),
      ...formData,
      completed: false
    };

    setSessions([newSession, ...sessions]);
    setFormData({
      subject: '',
      topic: '',
      duration: 25,
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowForm(false);
  };

  const toggleSession = (id: string) => {
    setSessions(sessions.map(s => 
      s.id === id ? { ...s, completed: !s.completed } : s
    ));
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const completedCount = sessions.filter(s => s.completed).length;

  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-500`}>
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        

        {/* Header with stats */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl font-bold ${textClass} mb-2`}>
              Mes Sessions
            </h2>
            <p className={`${textSecondaryClass}`}>
              {completedCount} / {sessions.length} complétées
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nouvelle Session
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`${cardClass} border rounded-xl p-4 mb-6`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${textClass}`}>Progression</span>
            <span className={`text-sm ${textSecondaryClass}`}>
              {sessions.length > 0 ? Math.round((completedCount / sessions.length) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${sessions.length > 0 ? (completedCount / sessions.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${cardClass} rounded-2xl p-6 max-w-md w-full shadow-2xl`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold ${textClass}`}>
                  Nouvelle Session
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className={`${textSecondaryClass} hover:${textClass}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Matière (ex: React)"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className={`${cardClass} border px-4 py-2 rounded-lg w-full ${textClass}`}
                />
                <input
                  type="text"
                  placeholder="Sujet (ex: Hooks)"
                  value={formData.topic}
                  onChange={e => setFormData({...formData, topic: e.target.value})}
                  className={`${cardClass} border px-4 py-2 rounded-lg w-full ${textClass}`}
                />
                <input
                  type="number"
                  placeholder="Durée (min)"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: Number(e.target.value)})}
                  className={`${cardClass} border px-4 py-2 rounded-lg w-full ${textClass}`}
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className={`${cardClass} border px-4 py-2 rounded-lg w-full ${textClass}`}
                />
                <textarea
                  placeholder="Notes..."
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className={`${cardClass} border px-4 py-2 rounded-lg w-full ${textClass}`}
                  rows={3}
                />
                
                <button
                  onClick={addSession}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <div className={`${cardClass} border rounded-xl p-12 text-center`}>
              <p className={`${textSecondaryClass} mb-4`}>
                Aucune session pour le moment
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="text-purple-500 hover:text-purple-600 font-medium"
              >
                Créer ma première session
              </button>
            </div>
          ) : (
            sessions.map(session => (
              <div
                key={session.id}
                className={`${cardClass} border rounded-xl p-4 hover:shadow-lg transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => toggleSession(session.id)}
                      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        session.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-400'
                      }`}
                    >
                      {session.completed && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold ${textClass} ${session.completed ? 'line-through opacity-60' : ''}`}>
                        {session.subject} - {session.topic}
                      </h4>
                      <p className={`text-sm ${textSecondaryClass} mt-1`}>
                        {session.duration} min • {new Date(session.date).toLocaleDateString('fr-FR')}
                      </p>
                      {session.notes && (
                        <p className={`text-sm ${textSecondaryClass} mt-2 italic`}>
                          "{session.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="text-red-500 hover:scale-110 transition-transform ml-2 flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
