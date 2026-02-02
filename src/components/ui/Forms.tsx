/**
 * Form Components for Add Actions
 */

'use client';

import { useState } from 'react';
import { Plus, BookOpen, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from './Toast';
import { useModal } from './Modal';

// ============================================================================
// ADD HABIT FORM
// ============================================================================

interface AddHabitFormProps {
  onAdd?: (habit: any) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const { showToast } = useToast();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Learning',
    targetDays: 7,
    color: 'from-emerald-500 to-teal-500',
  });

  const colors = [
    { name: 'Emerald', value: 'from-emerald-500 to-teal-500' },
    { name: 'Blue', value: 'from-blue-500 to-indigo-500' },
    { name: 'Amber', value: 'from-amber-500 to-orange-500' },
    { name: 'Rose', value: 'from-rose-500 to-pink-500' },
    { name: 'Purple', value: 'from-purple-500 to-violet-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Please enter a habit name', 'error');
      return;
    }
    
    const newHabit = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      streak: 0,
      completed: [false, false, false, false, false, false, false],
      color: formData.color,
      createdAt: new Date(),
      targetDaysPerWeek: formData.targetDays,
    };
    
    onAdd?.(newHabit);
    showToast(`Habit "${formData.name}" created successfully!`, 'success');
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Habit Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Read 30 min"
          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          >
            <option>Learning</option>
            <option>Wellness</option>
            <option>Health</option>
            <option>Productivity</option>
            <option>Mindfulness</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Target Days/Week</label>
          <select
            value={formData.targetDays}
            onChange={(e) => setFormData({ ...formData, targetDays: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
          >
            {[3, 4, 5, 6, 7].map(d => (
              <option key={d} value={d}>{d} days</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Color Theme</label>
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setFormData({ ...formData, color: c.value })}
              className={cn(
                "w-10 h-10 rounded-lg bg-gradient-to-br transition-all",
                c.value,
                formData.color === c.value ? "ring-2 ring-white scale-110" : "opacity-70 hover:opacity-100"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
        >
          Create Habit
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// ADD IDEA FORM
// ============================================================================

interface AddIdeaFormProps {
  onAdd?: (idea: any) => void;
}

export function AddIdeaForm({ onAdd }: AddIdeaFormProps) {
  const { showToast } = useToast();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'FinTech',
    impact: 'high' as const,
  });

  const categories = ['FinTech', 'EdTech', 'Web3', 'IoT', 'SaaS', 'Mobile', 'Health', 'AI'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Please enter an idea title', 'error');
      return;
    }
    
    const newIdea = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      stage: 'idea',
      impact: formData.impact,
      validation: {
        marketSize: false,
        problemValidation: false,
        solutionValidation: false,
        mvpBuilt: false,
        firstUsers: false,
        revenue: false,
      },
      createdAt: new Date(),
    };
    
    onAdd?.(newIdea);
    showToast('New idea added! Start validating it 💡', 'success');
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Idea Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., AI-powered Personal Finance Coach"
          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your idea in detail..."
          rows={3}
          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Impact</label>
          <select
            value={formData.impact}
            onChange={(e) => setFormData({ ...formData, impact: e.target.value as any })}
            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500"
          >
            <option value="high">High 💰</option>
            <option value="medium">Medium 📊</option>
            <option value="low">Low 📝</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 rounded-lg transition-colors"
        >
          Add Idea
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// ADD ASSET FORM
// ============================================================================

interface AddAssetFormProps {
  onAdd?: (asset: any) => void;
}

export function AddAssetForm({ onAdd }: AddAssetFormProps) {
  const { showToast } = useToast();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    symbol: '',
    category: 'Tech',
  });

  const categories = ['Tech', 'Auto', 'E-commerce', 'Crypto', 'Finance', 'Healthcare', 'Energy'];
  const popularAssets = ['GOOGL', 'META', 'NFLX', 'AMD', 'COIN', 'SHOP', 'CRM', 'UBER'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.symbol.trim()) {
      showToast('Please enter a symbol', 'error');
      return;
    }
    
    const symbol = formData.symbol.toUpperCase();
    const newAsset = {
      symbol,
      name: `${symbol} Inc.`,
      price: Math.random() * 500 + 50,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 10,
      volume: `${(Math.random() * 100).toFixed(1)}M`,
      marketCap: `${(Math.random() * 2).toFixed(2)}T`,
      alerts: false,
      category: formData.category,
    };
    
    onAdd?.(newAsset);
    showToast(`Added ${symbol} to watchlist!`, 'success');
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Symbol</label>
        <input
          type="text"
          value={formData.symbol}
          onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
          placeholder="e.g., AAPL"
          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 uppercase"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Popular Assets</label>
        <div className="flex flex-wrap gap-2">
          {popularAssets.map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => setFormData({ ...formData, symbol: sym })}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-full transition-all",
                formData.symbol === sym
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
        >
          Add to Watchlist
        </button>
      </div>
    </form>
  );
}
