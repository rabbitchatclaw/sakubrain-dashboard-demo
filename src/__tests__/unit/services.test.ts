/**
 * Service Layer Unit Tests
 */

import {
  LearningService,
  HabitService,
  IdeaService,
  TradingService,
} from '@/services';

import {
  MockLearningRepository,
  MockHabitRepository,
  MockIdeaRepository,
  MockTradingRepository,
} from '@/domain/repositories/mockRepositories';

describe('LearningService', () => {
  const service = new LearningService(new MockLearningRepository());

  it('should fetch monthly data', async () => {
    const data = await service.getMonthlyData();
    expect(data).toHaveLength(12);
    expect(data[0]).toHaveProperty('month');
    expect(data[0]).toHaveProperty('books');
    expect(data[0]).toHaveProperty('hours');
  });

  it('should fetch recent books', async () => {
    const books = await service.getRecentBooks();
    expect(books.length).toBeGreaterThan(0);
    expect(books[0]).toHaveProperty('title');
    expect(books[0]).toHaveProperty('author');
  });

  it('should fetch all skills', async () => {
    const skills = await service.getAllSkills();
    expect(skills.length).toBeGreaterThan(0);
    expect(skills[0]).toHaveProperty('name');
    expect(skills[0]).toHaveProperty('level');
  });

  it('should fetch learning summary', async () => {
    const summary = await service.getLearningSummary();
    expect(summary).toHaveProperty('totalBooksRead');
    expect(summary).toHaveProperty('totalStudyHours');
    expect(summary).toHaveProperty('totalSkills');
  });

  it('should throw error for invalid progress update', async () => {
    await expect(service.updateBookProgress('1', 150)).rejects.toThrow();
    await expect(service.updateBookProgress('1', -10)).rejects.toThrow();
  });
});

describe('HabitService', () => {
  const service = new HabitService(new MockHabitRepository());

  it('should fetch all habits', async () => {
    const habits = await service.getAllHabits();
    expect(habits.length).toBeGreaterThan(0);
    expect(habits[0]).toHaveProperty('name');
    expect(habits[0]).toHaveProperty('streak');
    expect(habits[0]).toHaveProperty('completed');
  });

  it('should fetch habit stats', async () => {
    const stats = await service.getHabitStats();
    expect(stats).toHaveProperty('totalStreak');
    expect(stats).toHaveProperty('completedToday');
    expect(stats).toHaveProperty('totalHabits');
    expect(stats).toHaveProperty('successRate');
  });

  it('should fetch atomic principles', async () => {
    const principles = await service.getAtomicPrinciples();
    expect(principles.length).toBeGreaterThan(0);
    expect(principles[0]).toHaveProperty('principle');
  });

  it('should throw error for invalid day index', async () => {
    await expect(service.toggleHabitDay('1', -1)).rejects.toThrow();
    await expect(service.toggleHabitDay('1', 7)).rejects.toThrow();
  });

  it('should calculate daily goal', () => {
    const habits = [
      { completed: [false, false, false, false, true, false, false] },
      { completed: [false, false, false, false, false, false, false] },
    ] as any[];
    
    const goal = service.calculateDailyGoal(habits, 5);
    expect(goal.target).toBe(5);
    expect(goal.current).toBe(1);
  });
});

describe('IdeaService', () => {
  const service = new IdeaService(new MockIdeaRepository());

  it('should fetch all ideas', async () => {
    const ideas = await service.getAllIdeas();
    expect(ideas.length).toBeGreaterThan(0);
    expect(ideas[0]).toHaveProperty('title');
    expect(ideas[0]).toHaveProperty('validation');
  });

  it('should fetch ideas by filters', async () => {
    const ideas = await service.getIdeasByFilters({
      category: 'FinTech',
      stage: 'All',
      searchQuery: '',
    });
    expect(ideas.every(i => i.category === 'FinTech')).toBe(true);
  });

  it('should fetch idea stats', async () => {
    const stats = await service.getIdeaStats();
    expect(stats).toHaveProperty('totalIdeas');
    expect(stats).toHaveProperty('validatedIdeas');
    expect(stats).toHaveProperty('ideasByStage');
  });

  it('should calculate validation progress', () => {
    const validation = {
      marketSize: true,
      problemValidation: true,
      solutionValidation: false,
      mvpBuilt: false,
      firstUsers: false,
      revenue: false,
    };
    
    const progress = service.calculateValidationProgress(validation);
    expect(progress).toBe(33);
  });

  it('should return correct stage colors', () => {
    expect(service.getStageColor('idea')).toBe('bg-slate-500');
    expect(service.getStageColor('validation')).toBe('bg-blue-500');
    expect(service.getStageColor('mvp')).toBe('bg-amber-500');
    expect(service.getStageColor('revenue')).toBe('bg-emerald-500');
  });
});

describe('TradingService', () => {
  const service = new TradingService(new MockTradingRepository());

  it('should fetch all assets', async () => {
    const assets = await service.getAllAssets();
    expect(assets.length).toBeGreaterThan(0);
    expect(assets[0]).toHaveProperty('symbol');
    expect(assets[0]).toHaveProperty('price');
  });

  it('should fetch portfolio', async () => {
    const portfolio = await service.getPortfolio();
    expect(portfolio).toHaveProperty('totalValue');
    expect(portfolio).toHaveProperty('dayChange');
    expect(portfolio).toHaveProperty('totalReturn');
  });

  it('should format currency', () => {
    expect(service.formatCurrency(1234.56)).toContain('1,234');
  });

  it('should format change with sign', () => {
    expect(service.formatChange(5.5)).toBe('+5.50');
    expect(service.formatChange(-3.2)).toBe('-3.20');
  });

  it('should format percentage change', () => {
    expect(service.formatChange(5.5, true)).toBe('+5.50%');
  });
});
