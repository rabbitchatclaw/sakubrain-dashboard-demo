/**
 * Custom Hooks
 * Data fetching and state management hooks
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { 
  AsyncState, 
  LoadingState,
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
  LearningTab,
} from '@/types';
import type { 
  ILearningRepository, 
  IHabitRepository, 
  IIdeaRepository,
  ITradingRepository,
  IStatsRepository,
} from '@/domain/repositories/interfaces';

// ============================================================================
// UTILITY HOOKS
// ============================================================================

export function useAsyncState<T>(initialData: T | null = null): {
  state: AsyncState<T>;
  setLoading: () => void;
  setSuccess: (data: T) => void;
  setError: (error: Error) => void;
  reset: () => void;
} {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    status: 'idle',
    error: null,
  });

  const setLoading = useCallback(() => {
    setState({ data: null, status: 'loading', error: null });
  }, []);

  const setSuccess = useCallback((data: T) => {
    setState({ data, status: 'success', error: null });
  }, []);

  const setError = useCallback((error: Error) => {
    setState({ data: null, status: 'error', error });
  }, []);

  const reset = useCallback(() => {
    setState({ data: initialData, status: 'idle', error: null });
  }, [initialData]);

  return { state, setLoading, setSuccess, setError, reset };
}

// ============================================================================
// LEARNING HOOKS
// ============================================================================

export function useLearning(repository: ILearningRepository) {
  const monthlyData = useAsyncState<MonthlyLearningData[]>([]);
  const recentBooks = useAsyncState<Book[]>([]);
  const skills = useAsyncState<Skill[]>([]);
  const summary = useAsyncState<{
    totalBooksRead: number;
    totalStudyHours: number;
    totalSkills: number;
  }>({ totalBooksRead: 0, totalStudyHours: 0, totalSkills: 0 });
  const [activeTab, setActiveTab] = useState<LearningTab>('overview');

  const fetchAll = useCallback(async () => {
    monthlyData.setLoading();
    recentBooks.setLoading();
    skills.setLoading();
    summary.setLoading();

    try {
      const [mData, books, skillList, sum] = await Promise.all([
        repository.getMonthlyData(),
        repository.getRecentBooks(4),
        repository.getAllSkills(),
        repository.getSummary(),
      ]);
      monthlyData.setSuccess(mData);
      recentBooks.setSuccess(books);
      skills.setSuccess(skillList);
      summary.setSuccess(sum);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch learning data');
      monthlyData.setError(error);
      recentBooks.setError(error);
      skills.setError(error);
      summary.setError(error);
    }
  }, [repository]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const updateBookProgress = useCallback(async (id: string, progress: number) => {
    try {
      await repository.updateBookProgress(id, progress);
      await fetchAll();
    } catch (err) {
      console.error('Failed to update book progress:', err);
      throw err;
    }
  }, [repository, fetchAll]);

  return {
    monthlyData,
    recentBooks,
    skills,
    summary,
    activeTab,
    setActiveTab,
    refresh: fetchAll,
    updateBookProgress,
  };
}

// ============================================================================
// HABIT HOOKS
// ============================================================================

export function useHabits(repository: IHabitRepository) {
  const habitsState = useAsyncState<Habit[]>([]);
  const stats = useAsyncState<HabitStats>({
    totalStreak: 0,
    completedToday: 0,
    totalHabits: 0,
    successRate: 0,
  });
  const principles = useAsyncState<AtomicPrinciple[]>([]);
  const [showPrinciples, setShowPrinciples] = useState(false);

  const fetchAll = useCallback(async () => {
    habitsState.setLoading();
    stats.setLoading();
    principles.setLoading();

    try {
      const [habitList, statData, principleList] = await Promise.all([
        repository.getAllHabits(),
        repository.getStats(),
        repository.getAtomicPrinciples(),
      ]);
      habitsState.setSuccess(habitList);
      stats.setSuccess(statData);
      principles.setSuccess(principleList);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch habits');
      habitsState.setError(error);
      stats.setError(error);
      principles.setError(error);
    }
  }, [repository]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const toggleHabitDay = useCallback(async (habitId: string, dayIndex: number) => {
    try {
      await repository.updateHabitDay(habitId, dayIndex);
      await fetchAll();
    } catch (err) {
      console.error('Failed to toggle habit day:', err);
      throw err;
    }
  }, [repository, fetchAll]);

  const dailyGoal = useMemo(() => {
    if (!habitsState.state.data) return { target: 5, current: 0 };
    const todayIndex = 4; // Friday as "today"
    const completedToday = habitsState.state.data.filter(h => h.completed[todayIndex]).length;
    return { target: 5, current: completedToday };
  }, [habitsState.state.data]);

  return {
    habits: habitsState,
    stats,
    principles,
    showPrinciples,
    setShowPrinciples,
    dailyGoal,
    refresh: fetchAll,
    toggleHabitDay,
  };
}

// ============================================================================
// IDEAS HOOKS
// ============================================================================

export function useIdeas(repository: IIdeaRepository) {
  const ideasState = useAsyncState<Idea[]>([]);
  const stats = useAsyncState<IdeaStats>({ totalIdeas: 0, validatedIdeas: 0, ideasByStage: {} });
  const [filters, setFilters] = useState<IdeaFilters>({
    category: 'All',
    stage: 'All',
    searchQuery: '',
  });
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    ideasState.setLoading();
    stats.setLoading();

    try {
      const [ideaList, statData] = await Promise.all([
        repository.getIdeasByFilters(filters),
        repository.getStats(),
      ]);
      ideasState.setSuccess(ideaList);
      stats.setSuccess(statData);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch ideas');
      ideasState.setError(error);
      stats.setError(error);
    }
  }, [repository, filters]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const toggleValidationStep = useCallback(async (ideaId: string, stepKey: string) => {
    try {
      await repository.toggleValidationStep(ideaId, stepKey);
      await fetchAll();
    } catch (err) {
      console.error('Failed to toggle validation step:', err);
      throw err;
    }
  }, [repository, fetchAll]);

  const updateFilters = useCallback((newFilters: Partial<IdeaFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const toggleExpanded = useCallback((ideaId: string) => {
    setExpandedIdeaId(prev => prev === ideaId ? null : ideaId);
  }, []);

  return {
    ideas: ideasState,
    stats,
    filters,
    expandedIdeaId,
    updateFilters,
    toggleValidationStep,
    toggleExpanded,
    refresh: fetchAll,
  };
}

// ============================================================================
// TRADING HOOKS
// ============================================================================

export function useTrading(repository: ITradingRepository) {
  const assetsState = useAsyncState<Asset[]>([]);
  const portfolio = useAsyncState<Portfolio>({
    totalValue: 0,
    dayChange: 0,
    dayChangePercent: 0,
    totalReturn: 0,
    totalReturnPercent: 0,
  });
  const [filters, setFilters] = useState<TradingFilters>({
    category: 'All',
    timeRange: '1D',
  });

  const fetchAll = useCallback(async () => {
    assetsState.setLoading();
    portfolio.setLoading();

    try {
      const [assetList, port] = await Promise.all([
        repository.getAssetsByFilters(filters),
        repository.getPortfolio(),
      ]);
      assetsState.setSuccess(assetList);
      portfolio.setSuccess(port);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch trading data');
      assetsState.setError(error);
      portfolio.setError(error);
    }
  }, [repository, filters]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const toggleAlerts = useCallback(async (symbol: string) => {
    try {
      await repository.toggleAlerts(symbol);
      await fetchAll();
    } catch (err) {
      console.error('Failed to toggle alerts:', err);
      throw err;
    }
  }, [repository, fetchAll]);

  const updateFilters = useCallback((newFilters: Partial<TradingFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    assets: assetsState,
    portfolio,
    filters,
    updateFilters,
    toggleAlerts,
    refresh: fetchAll,
  };
}

// ============================================================================
// STATS HOOKS
// ============================================================================

export function useStats(repository: IStatsRepository) {
  const stats = useAsyncState<StatMetric[]>([]);

  const fetchAll = useCallback(async () => {
    stats.setLoading();
    try {
      const data = await repository.getAllStats();
      stats.setSuccess(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch stats');
      stats.setError(error);
    }
  }, [repository]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    stats,
    refresh: fetchAll,
  };
}
