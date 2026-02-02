/**
 * Common UI Components
 */

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export function Card({ children, className, header, footer }: CardProps) {
  return (
    <div className={cn(
      "rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden",
      className
    )}>
      {header && (
        <div className="p-6 border-b border-white/10">{header}</div>
      )}
      <div className={cn(!header && "p-6", header && !footer && "p-6")}>
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t border-white/10">{footer}</div>
      )}
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

export function TabButton({ active, onClick, children, icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
        active
          ? "bg-white/10 text-white"
          : "text-slate-400 hover:text-white"
      )}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

interface BadgeProps {
  children: ReactNode;
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function Badge({ children, color = 'default', className }: BadgeProps) {
  const colorClasses = {
    default: 'bg-slate-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-blue-500',
  };

  return (
    <span
      className={cn(
        "px-2 py-0.5 text-xs font-medium rounded-full text-white",
        colorClasses[color],
        className
      )}
    >
      {children}
    </span>
  );
}

interface ProgressBarProps {
  progress: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ProgressBar({ 
  progress, 
  color = 'from-indigo-500 to-purple-500',
  size = 'md',
  showLabel = false,
}: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="space-y-1">
      <div className={cn("rounded-full bg-slate-800 overflow-hidden", sizeClasses[size])}>
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", color)}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-slate-400">{progress}%</span>
      )}
    </div>
  );
}

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  children?: ReactNode;
}

export function CircularProgress({
  progress,
  size = 48,
  strokeWidth = 3,
  color = '#6366f1',
  bgColor = '#334155',
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
