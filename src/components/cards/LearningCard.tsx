/**
 * Learning Section Components
 */

'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BookOpen, Trophy, TrendingUp, Calendar, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Book, Skill, MonthlyLearningData, LearningTab } from '@/types';
import { CircularProgress, TabButton } from '@/components/ui/Common';
import { useToast } from '@/components/ui/Toast';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface BookProgressProps {
  book: Book;
}

function BookProgress({ book }: BookProgressProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate">{book.title}</p>
        <p className="text-sm text-slate-400">{book.author}</p>
        <p className="text-xs text-indigo-400 mt-1">{book.category}</p>
      </div>
      <div className="text-right">
        <CircularProgress progress={book.progress} size={48}>
          <span className="text-xs font-medium text-white">{book.progress}%</span>
        </CircularProgress>
      </div>
    </div>
  );
}

interface SkillBarProps {
  skill: Skill;
}

function SkillBar({ skill }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white">{skill.name}</span>
          <span className="text-xs text-slate-500">({skill.category})</span>
        </div>
        <span className="text-sm font-medium text-slate-300">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}

interface OverviewChartProps {
  data: MonthlyLearningData[];
}

function OverviewChart({ data }: OverviewChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBooks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Area 
            type="monotone" 
            dataKey="hours" 
            stroke="#6366f1" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorHours)" 
            name="Study Hours"
          />
          <Area 
            type="monotone" 
            dataKey="books" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorBooks)" 
            name="Books Read"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface SummaryStatsProps {
  totalBooksRead: number;
  totalStudyHours: number;
  totalSkills: number;
}

function SummaryStats({ totalBooksRead, totalStudyHours, totalSkills }: SummaryStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center p-4 rounded-xl bg-white/5">
        <p className="text-2xl font-bold text-white">{totalBooksRead}</p>
        <p className="text-xs text-slate-400">Books Read</p>
      </div>
      <div className="text-center p-4 rounded-xl bg-white/5">
        <p className="text-2xl font-bold text-white">{totalStudyHours}</p>
        <p className="text-xs text-slate-400">Study Hours</p>
      </div>
      <div className="text-center p-4 rounded-xl bg-white/5">
        <p className="text-2xl font-bold text-white">{totalSkills}</p>
        <p className="text-xs text-slate-400">Skills</p>
      </div>
    </div>
  );
}

// ============================================================================
// TAB CONTENT COMPONENTS
// ============================================================================

interface OverviewTabProps {
  monthlyData: MonthlyLearningData[];
  summary: {
    totalBooksRead: number;
    totalStudyHours: number;
    totalSkills: number;
  };
}

function OverviewTab({ monthlyData, summary }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <OverviewChart data={monthlyData} />
      <SummaryStats 
        totalBooksRead={summary.totalBooksRead}
        totalStudyHours={summary.totalStudyHours}
        totalSkills={summary.totalSkills}
      />
    </div>
  );
}

interface BooksTabProps {
  books: Book[];
}

function BooksTab({ books }: BooksTabProps) {
  return (
    <div className="space-y-3">
      {books.map((book) => (
        <BookProgress key={book.id} book={book} />
      ))}
    </div>
  );
}

interface SkillsTabProps {
  skills: Skill[];
}

function SkillsTab({ skills }: SkillsTabProps) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <SkillBar key={skill.id} skill={skill} />
      ))}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface LearningProgressCardProps {
  monthlyData: MonthlyLearningData[];
  recentBooks: Book[];
  skills: Skill[];
  summary: {
    totalBooksRead: number;
    totalStudyHours: number;
    totalSkills: number;
  };
  isLoading?: boolean;
}

export function LearningProgressCard({
  monthlyData,
  recentBooks,
  skills,
  summary,
  isLoading = false,
}: LearningProgressCardProps) {
  const [activeTab, setActiveTab] = useState<LearningTab>('overview');
  const { showToast } = useToast();

  const tabs = [
    { id: 'overview' as LearningTab, label: 'Overview', icon: TrendingUp },
    { id: 'books' as LearningTab, label: 'Books', icon: BookOpen },
    { id: 'skills' as LearningTab, label: 'Skills', icon: Trophy },
  ];

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-slate-800 rounded"></div>
        </div>
        <div className="p-6">
          <div className="h-64 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Learning Progress</h2>
              <p className="text-sm text-slate-400">Track your knowledge journey</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => showToast('Study schedule calendar coming soon! 📅', 'info')}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                showToast(`Switched to ${tab.label} tab`, 'info');
              }}
              icon={<tab.icon className="w-4 h-4" />}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <OverviewTab monthlyData={monthlyData} summary={summary} />
        )}
        {activeTab === 'books' && <BooksTab books={recentBooks} />}
        {activeTab === 'skills' && <SkillsTab skills={skills} />}
      </div>
    </div>
  );
}
