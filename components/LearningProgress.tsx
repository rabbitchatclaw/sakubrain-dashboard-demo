'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';
import { BookOpen, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const monthlyData = [
  { month: 'Jan', books: 2, hours: 45, skills: 3 },
  { month: 'Feb', books: 3, hours: 52, skills: 4 },
  { month: 'Mar', books: 4, hours: 68, skills: 5 },
  { month: 'Apr', books: 2, hours: 38, skills: 2 },
  { month: 'May', books: 5, hours: 75, skills: 6 },
  { month: 'Jun', books: 6, hours: 82, skills: 7 },
  { month: 'Jul', books: 4, hours: 65, skills: 4 },
  { month: 'Aug', books: 7, hours: 95, skills: 8 },
  { month: 'Sep', books: 5, hours: 70, skills: 5 },
  { month: 'Oct', books: 6, hours: 88, skills: 6 },
  { month: 'Nov', books: 8, hours: 102, skills: 9 },
  { month: 'Dec', books: 5, hours: 78, skills: 6 },
];

const recentBooks = [
  { title: 'Atomic Habits', author: 'James Clear', progress: 100, category: 'Self-Improvement' },
  { title: 'The Psychology of Money', author: 'Morgan Housel', progress: 85, category: 'Finance' },
  { title: 'Deep Work', author: 'Cal Newport', progress: 60, category: 'Productivity' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', progress: 30, category: 'Psychology' },
];

const skills = [
  { name: 'TypeScript', level: 85, category: 'Programming' },
  { name: 'React', level: 90, category: 'Programming' },
  { name: 'Data Analysis', level: 70, category: 'Analytics' },
  { name: 'UI/UX Design', level: 75, category: 'Design' },
  { name: 'Public Speaking', level: 60, category: 'Soft Skills' },
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'skills', label: 'Skills', icon: Trophy },
];

export function LearningProgress() {
  const [activeTab, setActiveTab] = useState('overview');

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
          <button className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
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

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <p className="text-2xl font-bold text-white">57</p>
                <p className="text-xs text-slate-400">Books Read</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <p className="text-2xl font-bold text-white">853</p>
                <p className="text-xs text-slate-400">Study Hours</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5">
                <p className="text-2xl font-bold text-white">65</p>
                <p className="text-xs text-slate-400">Skills</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="space-y-3">
            {recentBooks.map((book, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{book.title}</p>
                  <p className="text-sm text-slate-400">{book.author}</p>
                  <p className="text-xs text-indigo-400 mt-1">{book.category}</p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 relative">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeDasharray={`${book.progress}, 100`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {book.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
