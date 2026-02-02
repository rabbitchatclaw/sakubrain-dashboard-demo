/**
 * Ideas Section Components
 */

'use client';

import { Lightbulb, CheckCircle2, XCircle, Clock, Search, Plus, Edit3, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Idea, IdeaStats, IdeaFilters, IdeaValidationStep } from '@/types';
import { CircularProgress } from '@/components/ui/Common';
import { useToast } from '@/components/ui/Toast';
import { useModal } from '@/components/ui/Modal';
import { AddIdeaForm } from '@/components/ui/Forms';

// ============================================================================
// CONSTANTS
// ============================================================================

const VALIDATION_STEPS: IdeaValidationStep[] = [
  { key: 'marketSize', label: 'Market >$1B', iconName: 'DollarSign' },
  { key: 'problemValidation', label: 'Problem Validated', iconName: 'Users' },
  { key: 'solutionValidation', label: 'Solution Validated', iconName: 'CheckCircle2' },
  { key: 'mvpBuilt', label: 'MVP Built', iconName: 'Zap' },
  { key: 'firstUsers', label: 'First 100 Users', iconName: 'Users' },
  { key: 'revenue', label: 'Revenue >$1K', iconName: 'DollarSign' },
];

const CATEGORIES = ['All', 'FinTech', 'EdTech', 'Web3', 'IoT', 'SaaS', 'Mobile'] as const;
const STAGES = ['All', 'idea', 'validation', 'mvp', 'revenue'] as const;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function getStageColor(stage: Idea['stage']): string {
  const colors: Record<Idea['stage'], string> = {
    idea: 'bg-slate-500',
    validation: 'bg-blue-500',
    mvp: 'bg-amber-500',
    revenue: 'bg-emerald-500',
  };
  return colors[stage];
}

function formatStage(stage: string): string {
  return stage.charAt(0).toUpperCase() + stage.slice(1);
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${diffDays >= 60 ? 's' : ''} ago`;
}

function calculateProgress(validation: Idea['validation']): number {
  const steps = Object.values(validation);
  const completed = steps.filter(Boolean).length;
  return Math.round((completed / steps.length) * 100);
}

interface IdeaCardProps {
  idea: Idea;
  isExpanded: boolean;
  onToggle: () => void;
  onToggleValidation: (stepKey: string) => void;
}

function IdeaCard({ idea, isExpanded, onToggle, onToggleValidation }: IdeaCardProps) {
  const { showToast } = useToast();
  const progress = calculateProgress(idea.validation);
  const progressColor = progress >= 50 ? '#10b981' : '#6366f1';

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-300",
        isExpanded 
          ? "bg-white/10 border-violet-500/30" 
          : "bg-white/5 border-white/10 hover:border-white/20"
      )}
    >
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "px-2 py-0.5 text-xs font-medium rounded-full text-white",
                getStageColor(idea.stage)
              )}>
                {formatStage(idea.stage)}
              </span>
              <span className="text-xs text-slate-500">{idea.category}</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {formatRelativeDate(idea.createdAt)}
              </span>
            </div>
            <h3 className="font-semibold text-white mb-1">{idea.title}</h3>
            <p className="text-sm text-slate-400 line-clamp-2">{idea.description}</p>
          </div>
          
          <div className="text-center">
            <CircularProgress progress={progress} size={48} color={progressColor}>
              <span className="text-xs font-bold text-white">{progress}%</span>
            </CircularProgress>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/10">
          <p className="text-sm font-medium text-white mb-3 pt-4">Validation Checklist</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {VALIDATION_STEPS.map((step) => {
              const isChecked = idea.validation[step.key];
              return (
                <button
                  key={step.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleValidation(step.key);
                  }}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg text-left transition-all duration-200",
                    isChecked
                      ? "bg-emerald-500/10 border border-emerald-500/30"
                      : "bg-slate-800/50 border border-white/5 hover:border-white/10"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    isChecked ? "bg-emerald-500" : "bg-slate-700"
                  )}>
                    {isChecked ? (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    ) : (
                      <XCircle className="w-3 h-3 text-slate-500" />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs",
                    isChecked ? "text-emerald-400" : "text-slate-400"
                  )}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                showToast(`Edit mode for "${idea.title}" - Form coming soon!`, 'info');
              }}
              className="flex items-center justify-center gap-2 flex-1 py-2 text-sm font-medium text-white bg-violet-500/20 hover:bg-violet-500/30 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit Idea
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                showToast(`"${idea.title}" archived successfully`, 'success');
              }}
              className="flex items-center justify-center gap-2 flex-1 py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Archive className="w-4 h-4" />
              Archive
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface IdeasFiltersProps {
  filters: IdeaFilters;
  onUpdateFilters: (filters: Partial<IdeaFilters>) => void;
}

function IdeasFilters({ filters, onUpdateFilters }: IdeasFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search ideas..."
          value={filters.searchQuery}
          onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
          className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={filters.category}
          onChange={(e) => onUpdateFilters({ category: e.target.value as IdeaFilters['category'] })}
          className="px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={filters.stage}
          onChange={(e) => onUpdateFilters({ stage: e.target.value as IdeaFilters['stage'] })}
          className="px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
        >
          {STAGES.map(stage => (
            <option key={stage} value={stage}>
              {stage === 'All' ? 'All Stages' : formatStage(stage)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface IdeasStatsProps {
  stats: IdeaStats;
}

function IdeasStats({ stats }: IdeasStatsProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
        <span className="text-2xl font-bold text-white">{stats.totalIdeas}</span>
        <span className="text-sm text-slate-400">Total Ideas</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
        <span className="text-2xl font-bold text-emerald-400">{stats.validatedIdeas}</span>
        <span className="text-sm text-slate-400">Validated</span>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface IdeasSectionCardProps {
  ideas: Idea[];
  stats: IdeaStats;
  filters: IdeaFilters;
  expandedIdeaId: string | null;
  onUpdateFilters: (filters: Partial<IdeaFilters>) => void;
  onToggleValidation: (ideaId: string, stepKey: string) => void;
  onToggleExpanded: (ideaId: string) => void;
  isLoading?: boolean;
}

export function IdeasSectionCard({
  ideas,
  stats,
  filters,
  expandedIdeaId,
  onUpdateFilters,
  onToggleValidation,
  onToggleExpanded,
  isLoading = false,
}: IdeasSectionCardProps) {
  const { showToast } = useToast();
  const { openModal } = useModal();

  const handleAddIdea = () => {
    openModal(
      <AddIdeaForm onAdd={(newIdea) => {
        showToast(`New idea added: ${newIdea.title} 💡`, 'success');
      }} />,
      'Add New Idea'
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-slate-800 rounded"></div>
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">100M+ Ideas</h2>
              <p className="text-sm text-slate-400">Validate and track your startup ideas</p>
            </div>
          </div>
          <button 
            onClick={handleAddIdea}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Idea
          </button>
        </div>

        <IdeasStats stats={stats} />
        <IdeasFilters filters={filters} onUpdateFilters={onUpdateFilters} />
      </div>

      <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            isExpanded={expandedIdeaId === idea.id}
            onToggle={() => {
              onToggleExpanded(idea.id);
              if (expandedIdeaId !== idea.id) {
                showToast(`Viewing: ${idea.title}`, 'info');
              }
            }}
            onToggleValidation={(stepKey) => {
              onToggleValidation(idea.id, stepKey);
              const step = VALIDATION_STEPS.find(s => s.key === stepKey);
              if (step) {
                showToast(`${step.label} toggled for "${idea.title}"`, 'success');
              }
            }}
          />
        ))}

        {ideas.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No ideas found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
