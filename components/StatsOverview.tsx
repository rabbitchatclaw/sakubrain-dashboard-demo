'use client';

import { BookOpen, Target, Zap, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Books Read',
    value: '47',
    change: '+12',
    changeType: 'positive',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Skills Learned',
    value: '23',
    change: '+5',
    changeType: 'positive',
    icon: Target,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    label: 'Habit Streak',
    value: '89',
    change: '+3 days',
    changeType: 'positive',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
  },
  {
    label: 'Portfolio',
    value: '$124.5K',
    change: '+8.4%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
  },
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="relative group overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 p-5 hover:border-white/20 transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-white to-transparent" />
          
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
              {stat.change}
            </span>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
