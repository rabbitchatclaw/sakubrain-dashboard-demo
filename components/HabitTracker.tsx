'use client';

import { useState } from 'react';
import { Check, Flame, Plus, RotateCcw, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const initialHabits = [
  {
    id: 1,
    name: 'Read 30 min',
    streak: 23,
    completed: [true, true, true, true, true, false, false],
    color: 'from-emerald-500 to-teal-500',
    category: 'Learning',
  },
  {
    id: 2,
    name: 'Meditate',
    streak: 45,
    completed: [true, true, true, false, true, true, false],
    color: 'from-indigo-500 to-purple-500',
    category: 'Wellness',
  },
  {
    id: 3,
    name: 'Exercise',
    streak: 12,
    completed: [true, false, true, true, false, true, false],
    color: 'from-amber-500 to-orange-500',
    category: 'Health',
  },
  {
    id: 4,
    name: 'Journal',
    streak: 89,
    completed: [true, true, true, true, true, true, true],
    color: 'from-rose-500 to-pink-500',
    category: 'Mindfulness',
  },
  {
    id: 5,
    name: 'Deep Work',
    streak: 7,
    completed: [true, true, true, true, false, false, false],
    color: 'from-blue-500 to-cyan-500',
    category: 'Productivity',
  },
];

const atomicPrinciples = [
  { id: 1, principle: 'Make it Obvious', description: 'Stack habits with existing routines' },
  { id: 2, principle: 'Make it Attractive', description: 'Pair with activities you enjoy' },
  { id: 3, principle: 'Make it Easy', description: 'Reduce friction, start small' },
  { id: 4, principle: 'Make it Satisfying', description: 'Track progress, celebrate wins' },
];

export function HabitTracker() {
  const [habits, setHabits] = useState(initialHabits);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPrinciples, setShowPrinciples] = useState(false);

  const toggleHabit = (habitId: number, dayIndex: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = [...habit.completed];
        newCompleted[dayIndex] = !newCompleted[dayIndex];
        return { ...habit, completed: newCompleted };
      }
      return habit;
    }));
  };

  const completedToday = habits.filter(h => h.completed[4]).length;
  const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);

  return (
    <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Daily Habits</h2>
              <p className="text-sm text-slate-400">Based on Atomic Habits principles</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrinciples(!showPrinciples)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Target className="w-4 h-4" />
              Principles
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalStreak}</p>
              <p className="text-xs text-slate-400">Total Days</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{completedToday}/{habits.length}</p>
              <p className="text-xs text-slate-400">Done Today</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">89%</p>
              <p className="text-xs text-slate-400">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {showPrinciples && (
        <div className="px-6 py-4 border-b border-white/10 bg-white/5">
          <h3 className="text-sm font-medium text-white mb-3">Atomic Habits Framework</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {atomicPrinciples.map((p, i) => (
              <div key={p.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-indigo-400">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{p.principle}</p>
                  <p className="text-xs text-slate-400">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
          <span className="w-24">Habit</span>
          <div className="flex gap-2">
            {weekDays.map((day) => (
              <span key={day} className="w-8 text-center">{day}</span>
            ))}
          </div>
          <span className="w-12 text-right">🔥</span>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="flex items-center justify-between group">
              <div className="w-24">
                <p className="text-sm font-medium text-white truncate">{habit.name}</p>
                <p className="text-xs text-slate-500">{habit.category}</p>
              </div>
              <div className="flex gap-2">
                {habit.completed.map((done, i) => (
                  <button
                    key={i}
                    onClick={() => toggleHabit(habit.id, i)}
                    className={cn(
                      "w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center",
                      done
                        ? `bg-gradient-to-br ${habit.color} text-white shadow-lg shadow-indigo-500/25`
                        : "bg-slate-800 hover:bg-slate-700 border border-white/5"
                    )}
                  >
                    {done && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
              <div className="w-12 text-right">
                <span className={cn(
                  "text-sm font-bold",
                  habit.streak >= 30 ? "text-amber-400" : "text-slate-400"
                )}>
                  {habit.streak}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20">
              <Target className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Daily Goal</p>
              <p className="text-xs text-slate-400">Complete 4 out of 5 habits today</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">{completedToday}/5</p>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(completedToday / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
