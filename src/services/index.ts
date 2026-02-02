/**
 * Domain Services
 * Business logic layer - orchestrates entities and repositories
 */

import type { 
  ILearningRepository, 
  IHabitRepository, 
  IIdeaRepository,
  ITradingRepository,
  IStatsRepository,
} from '@/domain/repositories/interfaces';

import type {
  Book,
  Skill,
  Habit,
  Idea,
  Asset,
  MonthlyLearningData,
  StatMetric,
  Portfolio,
  IdeaFilters,
  TradingFilters,
  HabitStats,
  IdeaStats,
  AtomicPrinciple,
} from '@/types';

// ============================================================================
// LEARNING SERVICE
// ============================================================================

export class LearningService {
  constructor(private repository: ILearningRepository) {}

  async getMonthlyData(): Promise<MonthlyLearningData[]> {
    return this.repository.getMonthlyData();
  }

  async getRecentBooks(limit?: number): Promise<Book[]> {
    return this.repository.getRecentBooks(limit);
  }

  async getAllSkills(): Promise<Skill[]> {
    return this.repository.getAllSkills();
  }

  async getLearningSummary() {
    return this.repository.getSummary();
  }

  async updateBookProgress(id: string, progress: number): Promise<Book> {
    if (progress < 0 || progress > 100) {
      throw new Error('Progress must be between 0 and 100');
    }
    return this.repository.updateBookProgress(id, progress);
  }

  async addBook(book: Omit<Book, 'id'>): Promise<Book> {
    return this.repository.saveBook({ ...book, id: crypto.randomUUID() });
  }

  async addSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    return this.repository.saveSkill({ ...skill, id: crypto.randomUUID() });
  }
}

// ============================================================================
// HABIT SERVICE
// ============================================================================

export class HabitService {
  constructor(private repository: IHabitRepository) {}

  async getAllHabits(): Promise<Habit[]> {
    return this.repository.getAllHabits();
  }

  async getHabitById(id: string): Promise<Habit | null> {
    return this.repository.getHabitById(id);
  }

  async toggleHabitDay(id: string, dayIndex: number): Promise<Habit> {
    if (dayIndex < 0 || dayIndex >= 7) {
      throw new Error('Day index must be between 0 and 6');
    }
    return this.repository.updateHabitDay(id, dayIndex);
  }

  async addHabit(habit: Omit<Habit, 'id'>): Promise<Habit> {
    return this.repository.saveHabit({ ...habit, id: crypto.randomUUID() });
  }

  async deleteHabit(id: string): Promise<void> {
    return this.repository.deleteHabit(id);
  }

  async getAtomicPrinciples(): Promise<AtomicPrinciple[]> {
    return this.repository.getAtomicPrinciples();
  }

  async getHabitStats(): Promise<HabitStats> {
    return this.repository.getStats();
  }

  calculateDailyGoal(habits: Habit[], target: number = 5): { target: number; current: number } {
    const todayIndex = 6; // Sunday
    const completedToday = habits.filter(h => h.completed[todayIndex]).length;
    return { target, current: completedToday };
  }
}

// ============================================================================
// IDEAS SERVICE
// ============================================================================

export class IdeaService {
  constructor(private repository: IIdeaRepository) {}

  async getAllIdeas(): Promise<Idea[]> {
    return this.repository.getAllIdeas();
  }

  async getIdeasByFilters(filters: IdeaFilters): Promise<Idea[]> {
    return this.repository.getIdeasByFilters(filters);
  }

  async getIdeaById(id: string): Promise<Idea | null> {
    return this.repository.getIdeaById(id);
  }

  async toggleValidationStep(id: string, stepKey: string): Promise<Idea> {
    return this.repository.toggleValidationStep(id, stepKey);
  }

  async addIdea(idea: Omit<Idea, 'id' | 'createdAt'>): Promise<Idea> {
    return this.repository.saveIdea({
      ...idea,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
  }

  async deleteIdea(id: string): Promise<void> {
    return this.repository.deleteIdea(id);
  }

  async getIdeaStats(): Promise<IdeaStats> {
    return this.repository.getStats();
  }

  calculateValidationProgress(validation: Idea['validation']): number {
    const steps = Object.values(validation);
    const completed = steps.filter(Boolean).length;
    return Math.round((completed / steps.length) * 100);
  }

  getStageColor(stage: Idea['stage']): string {
    const colors: Record<Idea['stage'], string> = {
      idea: 'bg-slate-500',
      validation: 'bg-blue-500',
      mvp: 'bg-amber-500',
      revenue: 'bg-emerald-500',
    };
    return colors[stage];
  }
}

// ============================================================================
// TRADING SERVICE
// ============================================================================

export class TradingService {
  constructor(private repository: ITradingRepository) {}

  async getAllAssets(): Promise<Asset[]> {
    return this.repository.getAllAssets();
  }

  async getAssetsByFilters(filters: TradingFilters): Promise<Asset[]> {
    return this.repository.getAssetsByFilters(filters);
  }

  async getAssetBySymbol(symbol: string): Promise<Asset | null> {
    return this.repository.getAssetBySymbol(symbol);
  }

  async getPortfolio(): Promise<Portfolio> {
    return this.repository.getPortfolio();
  }

  async toggleAlerts(symbol: string): Promise<Asset> {
    return this.repository.toggleAlerts(symbol);
  }

  formatCurrency(value: number): string {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  formatChange(value: number, isPercent: boolean = false): string {
    const sign = value >= 0 ? '+' : '';
    const suffix = isPercent ? '%' : '';
    return `${sign}${value.toFixed(2)}${suffix}`;
  }
}

// ============================================================================
// STATS SERVICE
// ============================================================================

export class StatsService {
  constructor(private repository: IStatsRepository) {}

  async getAllStats(): Promise<StatMetric[]> {
    return this.repository.getAllStats();
  }
}
