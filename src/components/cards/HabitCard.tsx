/**
 * Habit Tracker Components
 */

'use client';

import { Check, Flame, Plus, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Habit, AtomicPrinciple, HabitStats, HabitDailyGoal } from '@/types';
import { WEEK_DAYS } from '@/types';
import { ProgressBar } from '@/components/ui/Common';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface HabitRowProps {
  habit: Habit;
  onToggleDay: (dayIndex: number) => void;
}

function HabitRow({ habit, onToggleDay }: HabitRowProps) {
  return (
    <div className="flex items-center justify-between group">
      <div className="w-24">
        <p className="text-sm font-medium text-white truncate">{habit.name}</p>
        <p className="text-xs text-slate-500">{habit.category}</p>
      </div>
      <div className="flex gap-2">
        {habit.completed.map((done, i) => (
          <button
            key={i}
            onClick={() => onToggleDay(i)}
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
  );
}

interface AtomicPrinciplesPanelProps {
  principles: AtomicPrinciple[];
}

function AtomicPrinciplesPanel({ principles }: AtomicPrinciplesPanelProps) {
  return (
    <div className="px-6 py-4 border-b border-white/10 bg-white/5">
      <h3 className="text-sm font-medium text-white mb-3">Atomic Habits Framework</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {principles.map((p, i) => (
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
  );
}

interface HabitStatsDisplayProps {
  stats: HabitStats;
  dailyGoal: HabitDailyGoal;
}

function HabitStatsDisplay({ stats, dailyGoal }: HabitStatsDisplayProps) {
  return (
    <div className="flex items-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.totalStreak}</p>
          <p className="text-xs text-slate-400">Total Days</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.completedToday}/{stats.totalHabits}</p>
          <p className="text-xs text-slate-400">Done Today</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
          <p className="text-xs text-slate-400">Success Rate</p>
        </div>
      </div>
    </div>
  );
}

interface DailyGoalProgressProps {
  dailyGoal: HabitDailyGoal;
}

function DailyGoalProgress({ dailyGoal }: DailyGoalProgressProps) {
  const progress = (dailyGoal.current / dailyGoal.target) * 100;

  return (
    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/20">
          <Target className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">Daily Goal</p>
          <p className="text-xs text-slate-400">Complete {dailyGoal.target} out of {dailyGoal.target} habits today</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white">{dailyGoal.current}/{dailyGoal.target}</p>
        </div>
      </div>
      <ProgressBar progress={progress} color="from-indigo-500 to-purple-500" className="mt-3" />
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface HabitTrackerCardProps {
  habits: Habit[];
  principles: AtomicPrinciple[];
  stats: HabitStats;
  dailyGoal: HabitDailyGoal;
  showPrinciples: boolean;
  onTogglePrinciples: () => void;
  onToggleHabitDay: (habitId: string, dayIndex: number) => void;
  isLoading?: boolean;
}

export function HabitTrackerCard({
  habits,
  principles,
  stats,
  dailyGoal,
  showPrinciples,
  onTogglePrinciples,
  onToggleHabitDay,
  isLoading = false,
}: HabitTrackerCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="h-16 bg-slate-800 rounded"></div>
        </div>
        <div className="p-6">
          <div className="h-48 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

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
              onClick={onTogglePrinciples}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Target className="w-4 h-4" />
              Principles
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        <HabitStatsDisplay stats={stats} dailyGoal={dailyGoal} />
      </div>

      {showPrinciples && <AtomicPrinciplesPanel principles={principles} />}

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
          <span className="w-24">Habit</span>
          <div className="flex gap-2">
            {WEEK_DAYS.map((day) => (
              <span key={day} className="w-8 text-center">{day}</span>
            ))}
          </div>
          <span className="w-12 text-right">🔥</span>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              onToggleDay={(dayIndex) => onToggleHabitDay(habit.id, dayIndex)}
            />
          ))}
        </div>

        <DailyGoalProgress dailyGoal={dailyGoal} />
      </div>
    </div>
  );
}
