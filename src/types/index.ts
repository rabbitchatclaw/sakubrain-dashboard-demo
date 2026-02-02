/**
 * Core domain types for SakuBrain Dashboard
 * Following DDD principles with proper type safety
 */

// ============================================================================
// VALUE OBJECTS
// ============================================================================

export interface Money {
  amount: number;
  currency: string;
}

export interface Percentage {
  value: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

// ============================================================================
// USER & STATS
// ============================================================================

export type StatChangeType = 'positive' | 'negative' | 'neutral';

export interface StatMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: StatChangeType;
  iconName: string;
  color: string;
}

export interface UserStats {
  booksRead: number;
  skillsLearned: number;
  habitStreak: number;
  portfolioValue: Money;
}

// ============================================================================
// LEARNING DOMAIN
// ============================================================================

export type LearningTab = 'overview' | 'books' | 'skills';

export interface MonthlyLearningData {
  month: string;
  books: number;
  hours: number;
  skills: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  progress: number; // 0-100
  category: BookCategory;
  coverImageUrl?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export type BookCategory = 
  | 'Self-Improvement' 
  | 'Finance' 
  | 'Productivity' 
  | 'Psychology' 
  | 'Technology' 
  | 'Business' 
  | 'Other';

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: SkillCategory;
}

export type SkillCategory = 
  | 'Programming' 
  | 'Analytics' 
  | 'Design' 
  | 'Soft Skills' 
  | 'Marketing' 
  | 'Other';

export interface LearningSummary {
  totalBooksRead: number;
  totalStudyHours: number;
  totalSkills: number;
  monthlyData: MonthlyLearningData[];
  recentBooks: Book[];
  skills: Skill[];
}

// ============================================================================
// HABIT DOMAIN
// ============================================================================

export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export const WEEK_DAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean[]; // 7 days, aligned with WEEK_DAYS
  color: string;
  category: HabitCategory;
  createdAt: Date;
  targetDaysPerWeek: number;
}

export type HabitCategory = 
  | 'Learning' 
  | 'Wellness' 
  | 'Health' 
  | 'Mindfulness' 
  | 'Productivity' 
  | 'Other';

export interface AtomicPrinciple {
  id: string;
  order: number;
  principle: string;
  description: string;
}

export interface HabitStats {
  totalStreak: number;
  completedToday: number;
  totalHabits: number;
  successRate: number;
}

export interface HabitDailyGoal {
  target: number;
  current: number;
}

// ============================================================================
// IDEAS DOMAIN
// ============================================================================

export type IdeaStage = 'idea' | 'validation' | 'mvp' | 'revenue';
export type IdeaImpact = 'low' | 'medium' | 'high';
export type IdeaCategory = 
  | 'FinTech' 
  | 'EdTech' 
  | 'Web3' 
  | 'IoT' 
  | 'SaaS' 
  | 'Mobile' 
  | 'Other';

export interface IdeaValidation {
  marketSize: boolean;        // Market >$1B
  problemValidation: boolean; // Problem Validated
  solutionValidation: boolean;// Solution Validated
  mvpBuilt: boolean;          // MVP Built
  firstUsers: boolean;        // First 100 Users
  revenue: boolean;           // Revenue >$1K
}

export interface IdeaValidationStep {
  key: keyof IdeaValidation;
  label: string;
  iconName: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: IdeaCategory;
  stage: IdeaStage;
  impact: IdeaImpact;
  validation: IdeaValidation;
  createdAt: Date;
  archived?: boolean;
}

export interface IdeaStats {
  totalIdeas: number;
  validatedIdeas: number;
  ideasByStage: Record<IdeaStage, number>;
}

export interface IdeaFilters {
  category: IdeaCategory | 'All';
  stage: IdeaStage | 'All';
  searchQuery: string;
}

// ============================================================================
// TRADING DOMAIN
// ============================================================================

export type AssetCategory = 'Tech' | 'Auto' | 'E-commerce' | 'Crypto' | 'Finance' | 'Entertainment' | 'Other';
export type TimeRange = '1H' | '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  alerts: boolean;
  category: AssetCategory;
}

export interface Portfolio {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
}

export interface TradingFilters {
  category: AssetCategory | 'All';
  timeRange: TimeRange;
}

// ============================================================================
// UI TYPES
// ============================================================================

export type ViewMode = 'grid' | 'list';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: Error | null;
}

export type ColorGradient = 
  | 'from-emerald-500 to-teal-500'
  | 'from-blue-500 to-indigo-500'
  | 'from-amber-500 to-orange-500'
  | 'from-purple-500 to-pink-500'
  | 'from-indigo-500 to-purple-600'
  | 'from-rose-500 to-pink-500'
  | 'from-violet-500 to-purple-600'
  | 'from-cyan-500 to-blue-500'
  | string;
