/**
 * Loading Components
 */

import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="animate-spin text-indigo-500" size={size} />
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-slate-700 rounded w-1/3"></div>
        <div className="h-32 bg-slate-800 rounded"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-700 rounded"></div>
          <div className="h-3 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

export function ErrorMessage({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl bg-rose-900/20 border border-rose-500/30 p-6 text-center">
      <p className="text-rose-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}
