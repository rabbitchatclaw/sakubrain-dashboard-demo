/**
 * Mock Repository Implementations
 * These can be replaced with real API implementations later
 */

import { 
  mockMonthlyData, 
  mockBooks, 
  mockSkills, 
  mockHabits, 
  mockAtomicPrinciples,
  mockIdeas,
  mockAssets,
  mockPortfolio,
  mockStats,
} from '@/mocks/data';

import type {
  ILearningRepository,
  IHabitRepository,
  IIdeaRepository,
  ITradingRepository,
  IStatsRepository,
} from './interfaces';

import type {
  Book,
  Skill,
  Habit,
  Idea,
  Asset,
  AtomicPrinciple,
  MonthlyLearningData,
  StatMetric,
  Portfolio,
  IdeaFilters,
  TradingFilters,
} from '@/types';

import {
  BookEntity,
  SkillEntity,
  HabitEntity,
  IdeaEntity,
  AssetEntity,
  PortfolioEntity,
} from '@/domain/entities';

// ============================================================================
// LEARNING REPOSITORY
// ============================================================================

export class MockLearningRepository implements ILearningRepository {
  private books: BookEntity[] = mockBooks.map(b => BookEntity.create(b));
  private skills: SkillEntity[] = mockSkills.map(s => SkillEntity.create(s));

  async getMonthlyData(): Promise<MonthlyLearningData[]> {
    // Simulate network delay
    await delay(300);
    return mockMonthlyData;
  }

  async getRecentBooks(limit: number = 4): Promise<Book[]> {
    await delay(200);
    return this.books.slice(0, limit).map(b => ({ ...b }));
  }

  async getAllSkills(): Promise<Skill[]> {
    await delay(200);
    return this.skills.map(s => ({ ...s }));
  }

  async getSummary(): Promise<{
    totalBooksRead: number;
    totalStudyHours: number;
    totalSkills: number;
  }> {
    await delay(300);
    return {
      totalBooksRead: 57,
      totalStudyHours: 853,
      totalSkills: 65,
    };
  }

  async saveBook(book: Book): Promise<Book> {
    await delay(500);
    const entity = BookEntity.create(book);
    const existingIndex = this.books.findIndex(b => b.id === entity.id);
    if (existingIndex >= 0) {
      this.books[existingIndex] = entity;
    } else {
      this.books.push(entity);
    }
    return { ...entity };
  }

  async updateBookProgress(id: string, progress: number): Promise<Book> {
    await delay(300);
    const book = this.books.find(b => b.id === id);
    if (!book) throw new Error(`Book with id ${id} not found`);
    book.updateProgress(progress);
    return { ...book };
  }

  async saveSkill(skill: Skill): Promise<Skill> {
    await delay(500);
    const entity = SkillEntity.create(skill);
    const existingIndex = this.skills.findIndex(s => s.id === entity.id);
    if (existingIndex >= 0) {
      this.skills[existingIndex] = entity;
    } else {
      this.skills.push(entity);
    }
    return { ...entity };
  }
}

// ============================================================================
// HABIT REPOSITORY
// ============================================================================

export class MockHabitRepository implements IHabitRepository {
  private habits: HabitEntity[] = mockHabits.map(h => HabitEntity.create(h));

  async getAllHabits(): Promise<Habit[]> {
    await delay(300);
    return this.habits.map(h => ({ ...h }));
  }

  async getHabitById(id: string): Promise<Habit | null> {
    await delay(200);
    const habit = this.habits.find(h => h.id === id);
    return habit ? { ...habit } : null;
  }

  async saveHabit(habit: Habit): Promise<Habit> {
    await delay(500);
    const entity = HabitEntity.create(habit);
    const existingIndex = this.habits.findIndex(h => h.id === entity.id);
    if (existingIndex >= 0) {
      this.habits[existingIndex] = entity;
    } else {
      this.habits.push(entity);
    }
    return { ...entity };
  }

  async updateHabitDay(id: string, dayIndex: number): Promise<Habit> {
    await delay(300);
    const habit = this.habits.find(h => h.id === id);
    if (!habit) throw new Error(`Habit with id ${id} not found`);
    habit.toggleDay(dayIndex);
    return { ...habit };
  }

  async deleteHabit(id: string): Promise<void> {
    await delay(400);
    const index = this.habits.findIndex(h => h.id === id);
    if (index >= 0) {
      this.habits.splice(index, 1);
    }
  }

  async getAtomicPrinciples(): Promise<AtomicPrinciple[]> {
    await delay(200);
    return mockAtomicPrinciples;
  }

  async getStats(): Promise<{
    totalStreak: number;
    completedToday: number;
    totalHabits: number;
    successRate: number;
  }> {
    await delay(300);
    const habits = this.habits;
    const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);
    const completedToday = habits.filter(h => h.isCompletedToday()).length;
    const totalHabits = habits.length;
    const successRate = 89; // Calculated from historical data
    return { totalStreak, completedToday, totalHabits, successRate };
  }
}

// ============================================================================
// IDEAS REPOSITORY
// ============================================================================

export class MockIdeaRepository implements IIdeaRepository {
  private ideas: IdeaEntity[] = mockIdeas.map(i => IdeaEntity.create(i));

  async getAllIdeas(): Promise<Idea[]> {
    await delay(300);
    return this.ideas.filter(i => !i.archived).map(i => ({ ...i }));
  }

  async getIdeasByFilters(filters: IdeaFilters): Promise<Idea[]> {
    await delay(300);
    return this.ideas
      .filter(i => !i.archived)
      .filter(i => filters.category === 'All' || i.category === filters.category)
      .filter(i => filters.stage === 'All' || i.stage === filters.stage)
      .filter(i => {
        if (!filters.searchQuery) return true;
        const q = filters.searchQuery.toLowerCase();
        return i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
      })
      .map(i => ({ ...i }));
  }

  async getIdeaById(id: string): Promise<Idea | null> {
    await delay(200);
    const idea = this.ideas.find(i => i.id === id);
    return idea ? { ...idea } : null;
  }

  async saveIdea(idea: Idea): Promise<Idea> {
    await delay(500);
    const entity = IdeaEntity.create(idea);
    const existingIndex = this.ideas.findIndex(i => i.id === entity.id);
    if (existingIndex >= 0) {
      this.ideas[existingIndex] = entity;
    } else {
      this.ideas.push(entity);
    }
    return { ...entity };
  }

  async toggleValidationStep(id: string, stepKey: string): Promise<Idea> {
    await delay(300);
    const idea = this.ideas.find(i => i.id === id);
    if (!idea) throw new Error(`Idea with id ${id} not found`);
    idea.toggleValidationStep(stepKey as keyof Idea['validation']);
    return { ...idea };
  }

  async deleteIdea(id: string): Promise<void> {
    await delay(400);
    const index = this.ideas.findIndex(i => i.id === id);
    if (index >= 0) {
      this.ideas.splice(index, 1);
    }
  }

  async getStats(): Promise<{
    totalIdeas: number;
    validatedIdeas: number;
    ideasByStage: Record<string, number>;
  }> {
    await delay(300);
    const activeIdeas = this.ideas.filter(i => !i.archived);
    const totalIdeas = activeIdeas.length;
    const validatedIdeas = activeIdeas.filter(i => i.isValidated()).length;
    const ideasByStage = activeIdeas.reduce((acc, idea) => {
      acc[idea.stage] = (acc[idea.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return { totalIdeas, validatedIdeas, ideasByStage };
  }
}

// ============================================================================
// TRADING REPOSITORY
// ============================================================================

export class MockTradingRepository implements ITradingRepository {
  private assets: AssetEntity[] = mockAssets.map(a => AssetEntity.create(a));
  private portfolio: PortfolioEntity = PortfolioEntity.create(mockPortfolio);

  async getAllAssets(): Promise<Asset[]> {
    await delay(300);
    return this.assets.map(a => ({ ...a }));
  }

  async getAssetsByFilters(filters: TradingFilters): Promise<Asset[]> {
    await delay(300);
    return this.assets
      .filter(a => filters.category === 'All' || a.category === filters.category)
      .map(a => ({ ...a }));
  }

  async getAssetBySymbol(symbol: string): Promise<Asset | null> {
    await delay(200);
    const asset = this.assets.find(a => a.symbol === symbol);
    return asset ? { ...asset } : null;
  }

  async getPortfolio(): Promise<Portfolio> {
    await delay(300);
    return { ...this.portfolio };
  }

  async toggleAlerts(symbol: string): Promise<Asset> {
    await delay(300);
    const asset = this.assets.find(a => a.symbol === symbol);
    if (!asset) throw new Error(`Asset with symbol ${symbol} not found`);
    asset.toggleAlerts();
    return { ...asset };
  }
}

// ============================================================================
// STATS REPOSITORY
// ============================================================================

export class MockStatsRepository implements IStatsRepository {
  async getAllStats(): Promise<StatMetric[]> {
    await delay(200);
    return mockStats;
  }
}

// ============================================================================
// FACTORY
// ============================================================================

export function createRepositories() {
  return {
    learning: new MockLearningRepository(),
    habits: new MockHabitRepository(),
    ideas: new MockIdeaRepository(),
    trading: new MockTradingRepository(),
    stats: new MockStatsRepository(),
  };
}

// ============================================================================
// UTILITIES
// ============================================================================

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
