'use client';

import { useState } from 'react';
import { Lightbulb, CheckCircle2, XCircle, Clock, DollarSign, Users, Zap, Plus, Filter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialIdeas = [
  {
    id: 1,
    title: 'AI-powered Personal Finance Coach',
    description: 'An app that analyzes spending patterns and provides personalized financial advice using AI.',
    category: 'FinTech',
    stage: 'validation',
    impact: 'high',
    validation: {
      marketSize: true,
      problemValidation: true,
      solutionValidation: false,
      mvpBuilt: false,
      firstUsers: false,
      revenue: false,
    },
    createdAt: '2 days ago',
  },
  {
    id: 2,
    title: 'Micro-Learning Platform for Developers',
    description: '5-minute daily coding challenges that compound into real skills over time.',
    category: 'EdTech',
    stage: 'mvp',
    impact: 'medium',
    validation: {
      marketSize: true,
      problemValidation: true,
      solutionValidation: true,
      mvpBuilt: true,
      firstUsers: true,
      revenue: false,
    },
    createdAt: '1 week ago',
  },
  {
    id: 3,
    title: 'Decentralized Content Monetization',
    description: 'A platform allowing creators to monetize content directly without platform fees.',
    category: 'Web3',
    stage: 'idea',
    impact: 'high',
    validation: {
      marketSize: true,
      problemValidation: false,
      solutionValidation: false,
      mvpBuilt: false,
      firstUsers: false,
      revenue: false,
    },
    createdAt: '3 days ago',
  },
  {
    id: 4,
    title: 'Smart Home Energy Optimizer',
    description: 'IoT device that learns usage patterns and optimizes energy consumption automatically.',
    category: 'IoT',
    stage: 'revenue',
    impact: 'medium',
    validation: {
      marketSize: true,
      problemValidation: true,
      solutionValidation: true,
      mvpBuilt: true,
      firstUsers: true,
      revenue: true,
    },
    createdAt: '1 month ago',
  },
];

const validationSteps = [
  { key: 'marketSize', label: 'Market >$1B', icon: DollarSign },
  { key: 'problemValidation', label: 'Problem Validated', icon: Users },
  { key: 'solutionValidation', label: 'Solution Validated', icon: CheckCircle2 },
  { key: 'mvpBuilt', label: 'MVP Built', icon: Zap },
  { key: 'firstUsers', label: 'First 100 Users', icon: Users },
  { key: 'revenue', label: 'Revenue >$1K', icon: DollarSign },
];

const categories = ['All', 'FinTech', 'EdTech', 'Web3', 'IoT', 'SaaS', 'Mobile'];
const stages = ['All', 'idea', 'validation', 'mvp', 'revenue'];

export function IdeasSection() {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null);

  const toggleValidation = (ideaId: number, stepKey: string) => {
    setIdeas(ideas.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          validation: {
            ...idea.validation,
            [stepKey]: !idea.validation[stepKey as keyof typeof idea.validation],
          },
        };
      }
      return idea;
    }));
  };

  const getValidationProgress = (validation: typeof initialIdeas[0]['validation']) => {
    const steps = Object.values(validation);
    const completed = steps.filter(Boolean).length;
    return Math.round((completed / steps.length) * 100);
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      idea: 'bg-slate-500',
      validation: 'bg-blue-500',
      mvp: 'bg-amber-500',
      revenue: 'bg-emerald-500',
    };
    return colors[stage] || 'bg-slate-500';
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    const matchesStage = selectedStage === 'All' || idea.stage === selectedStage;
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStage && matchesSearch;
  });

  const totalIdeas = ideas.length;
  const validatedIdeas = ideas.filter(i => getValidationProgress(i.validation) >= 50).length;

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
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            New Idea
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
            <span className="text-2xl font-bold text-white">{totalIdeas}</span>
            <span className="text-sm text-slate-400">Total Ideas</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
            <span className="text-2xl font-bold text-emerald-400">{validatedIdeas}</span>
            <span className="text-sm text-slate-400">Validated</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-3 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'All' ? 'All Stages' : stage.charAt(0).toUpperCase() + stage.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {filteredIdeas.map((idea) => {
          const progress = getValidationProgress(idea.validation);
          const isExpanded = expandedIdea === idea.id;

          return (
            <div
              key={idea.id}
              className={cn(
                "rounded-xl border transition-all duration-300",
                isExpanded 
                  ? "bg-white/10 border-violet-500/30" 
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedIdea(isExpanded ? null : idea.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full text-white",
                        getStageColor(idea.stage)
                      )}>
                        {idea.stage.charAt(0).toUpperCase() + idea.stage.slice(1)}
                      </span>
                      <span className="text-xs text-slate-500">{idea.category}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {idea.createdAt}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{idea.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{idea.description}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative w-12 h-12">
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
                          stroke={progress >= 50 ? '#10b981' : '#6366f1'}
                          strokeWidth="3"
                          strokeDasharray={`${progress}, 100`}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                        {progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/10">
                  <p className="text-sm font-medium text-white mb-3 pt-4">Validation Checklist</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {validationSteps.map((step) => {
                      const isChecked = idea.validation[step.key as keyof typeof idea.validation];
                      return (
                        <button
                          key={step.key}
                          onClick={() => toggleValidation(idea.id, step.key)}
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
                    <button className="flex-1 py-2 text-sm font-medium text-white bg-violet-500/20 hover:bg-violet-500/30 rounded-lg transition-colors">
                      Edit Idea
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      Archive
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No ideas found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
