// src/types/index.ts

export interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  date: string;
  completed: boolean;
  notes: string;
}

export interface TimerSettings {
  focusDuration: number;
  shortBreak: number;
  longBreak: number;
}

export type TimerMode = 'focus' | 'break';
export type ThemeMode = 'light' | 'dark';
