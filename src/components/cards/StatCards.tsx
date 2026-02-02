/**
 * Stat Card Components
 */

'use client';

import type { StatMetric } from '@/types';
import { DynamicIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

interface StatCardProps {
  stat: StatMetric;
  index?: number;
}

export function StatCard({ stat, index = 0 }: StatCardProps) {
  return (
    <div
      className="relative group overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 p-5 hover:border-white/20 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-white to-transparent" />
      
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color}`}>
          <DynamicIcon name={stat.iconName} className="w-5 h-5 text-white" />
        </div>
        <span className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          stat.changeType === 'positive' && "bg-emerald-500/10 text-emerald-400",
          stat.changeType === 'negative' && "bg-rose-500/10 text-rose-400",
          stat.changeType === 'neutral' && "bg-slate-500/10 text-slate-400",
        )}>
          {stat.change}
        </span>
      </div>
      
      <div>
        <p className="text-2xl font-bold text-white">{stat.value}</p>
        <p className="text-sm text-slate-400">{stat.label}</p>
      </div>
    </div>
  );
}

interface StatsGridProps {
  stats: StatMetric[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.id} stat={stat} index={index} />
      ))}
    </div>
  );
}
