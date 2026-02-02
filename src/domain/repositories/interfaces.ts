/**
 * Repository Interfaces
 * Define contracts for data access following Repository Pattern
 */

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

// ============================================================================
// BASE REPOSITORY
// ============================================================================

export interface Repository<T, TId> {
  findAll(): Promise<T[]>;
  findById(id: TId): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: TId): Promise<void>;
}

// ============================================================================
// SPECIFIC REPOSITORIES
// ============================================================================

export interface ILearningRepository {
  getMonthlyData(): Promise<MonthlyLearningData[]>;
  getRecentBooks(limit?: number): Promise<Book[]>;
  getAllSkills(): Promise<Skill[]>;
  getSummary(): Promise<{
    totalBooksRead: number;
    totalStudyHours: number;
    totalSkills: number;
  }>;
  saveBook(book: Book): Promise<Book>;
  updateBookProgress(id: string, progress: number): Promise<Book>;
  saveSkill(skill: Skill): Promise<Skill>;
}

export interface IHabitRepository {
  getAllHabits(): Promise<Habit[]>;
  getHabitById(id: string): Promise<Habit | null>;
  saveHabit(habit: Habit): Promise<Habit>;
  updateHabitDay(id: string, dayIndex: number): Promise<Habit>;
  deleteHabit(id: string): Promise<void>;
  getAtomicPrinciples(): Promise<AtomicPrinciple[]>;
  getStats(): Promise<{
    totalStreak: number;
    completedToday: number;
    totalHabits: number;
    successRate: number;
  }>;
}

export interface IIdeaRepository {
  getAllIdeas(): Promise<Idea[]>;
  getIdeasByFilters(filters: IdeaFilters): Promise<Idea[]>;
  getIdeaById(id: string): Promise<Idea | null>;
  saveIdea(idea: Idea): Promise<Idea>;
  toggleValidationStep(id: string, stepKey: string): Promise<Idea>;
  deleteIdea(id: string): Promise<void>;
  getStats(): Promise<{
    totalIdeas: number;
    validatedIdeas: number;
    ideasByStage: Record<string, number>;
  }>;
}

export interface ITradingRepository {
  getAllAssets(): Promise<Asset[]>;
  getAssetsByFilters(filters: TradingFilters): Promise<Asset[]>;
  getAssetBySymbol(symbol: string): Promise<Asset | null>;
  getPortfolio(): Promise<Portfolio>;
  toggleAlerts(symbol: string): Promise<Asset>;
}

export interface IStatsRepository {
  getAllStats(): Promise<StatMetric[]>;
}
