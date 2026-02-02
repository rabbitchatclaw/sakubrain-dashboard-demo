/**
 * Entity Unit Tests
 */

import {
  BookEntity,
  SkillEntity,
  HabitEntity,
  IdeaEntity,
  AssetEntity,
  PortfolioEntity,
  AtomicPrincipleEntity,
} from '@/domain/entities';

describe('BookEntity', () => {
  const validBook = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    progress: 50,
    category: 'Technology' as const,
  };

  it('should create a book entity', () => {
    const book = BookEntity.create(validBook);
    expect(book.id).toBe('1');
    expect(book.title).toBe('Test Book');
    expect(book.progress).toBe(50);
  });

  it('should throw error for invalid progress', () => {
    expect(() => BookEntity.create({ ...validBook, progress: 150 })).toThrow();
    expect(() => BookEntity.create({ ...validBook, progress: -10 })).toThrow();
  });

  it('should check if book is completed', () => {
    const incomplete = BookEntity.create(validBook);
    const complete = BookEntity.create({ ...validBook, progress: 100 });
    
    expect(incomplete.isCompleted()).toBe(false);
    expect(complete.isCompleted()).toBe(true);
  });

  it('should update progress', () => {
    const book = BookEntity.create(validBook);
    book.updateProgress(75);
    expect(book.progress).toBe(75);
  });
});

describe('SkillEntity', () => {
  const validSkill = {
    id: '1',
    name: 'TypeScript',
    level: 80,
    category: 'Programming' as const,
  };

  it('should create a skill entity', () => {
    const skill = SkillEntity.create(validSkill);
    expect(skill.name).toBe('TypeScript');
    expect(skill.level).toBe(80);
  });

  it('should throw error for invalid level', () => {
    expect(() => SkillEntity.create({ ...validSkill, level: 150 })).toThrow();
    expect(() => SkillEntity.create({ ...validSkill, level: -10 })).toThrow();
  });

  it('should improve skill level', () => {
    const skill = SkillEntity.create(validSkill);
    skill.improve(10);
    expect(skill.level).toBe(90);
  });

  it('should not exceed 100 when improving', () => {
    const skill = SkillEntity.create(validSkill);
    skill.improve(50);
    expect(skill.level).toBe(100);
  });
});

describe('HabitEntity', () => {
  const validHabit = {
    id: '1',
    name: 'Exercise',
    streak: 5,
    completed: [true, true, false, true, true, false, false],
    color: 'from-blue-500 to-cyan-500',
    category: 'Health' as const,
    createdAt: new Date(),
    targetDaysPerWeek: 5,
  };

  it('should create a habit entity', () => {
    const habit = HabitEntity.create(validHabit);
    expect(habit.name).toBe('Exercise');
    expect(habit.completed.length).toBe(7);
  });

  it('should throw error for invalid completed array', () => {
    expect(() => HabitEntity.create({
      ...validHabit,
      completed: [true, false],
    })).toThrow();
  });

  it('should toggle day completion', () => {
    const habit = HabitEntity.create(validHabit);
    habit.toggleDay(0);
    expect(habit.completed[0]).toBe(false);
    habit.toggleDay(0);
    expect(habit.completed[0]).toBe(true);
  });

  it('should throw error for invalid day index', () => {
    const habit = HabitEntity.create(validHabit);
    expect(() => habit.toggleDay(-1)).toThrow();
    expect(() => habit.toggleDay(7)).toThrow();
  });

  it('should check if completed today', () => {
    const habit = HabitEntity.create({
      ...validHabit,
      completed: [false, false, false, false, false, false, true],
    });
    expect(habit.isCompletedToday()).toBe(true);
  });

  it('should calculate weekly completion rate', () => {
    const habit = HabitEntity.create(validHabit);
    const rate = habit.getWeeklyCompletionRate();
    expect(rate).toBe(57); // 4 out of 7
  });
});

describe('IdeaEntity', () => {
  const validIdea = {
    id: '1',
    title: 'Test Idea',
    description: 'A test idea',
    category: 'SaaS' as const,
    stage: 'idea' as const,
    impact: 'high' as const,
    validation: {
      marketSize: true,
      problemValidation: true,
      solutionValidation: false,
      mvpBuilt: false,
      firstUsers: false,
      revenue: false,
    },
    createdAt: new Date(),
  };

  it('should create an idea entity', () => {
    const idea = IdeaEntity.create(validIdea);
    expect(idea.title).toBe('Test Idea');
    expect(idea.validation.marketSize).toBe(true);
  });

  it('should toggle validation step', () => {
    const idea = IdeaEntity.create(validIdea);
    idea.toggleValidationStep('marketSize');
    expect(idea.validation.marketSize).toBe(false);
  });

  it('should calculate validation progress', () => {
    const idea = IdeaEntity.create(validIdea);
    expect(idea.getValidationProgress()).toBe(33); // 2 out of 6
  });

  it('should check if idea is validated', () => {
    const idea = IdeaEntity.create(validIdea);
    expect(idea.isValidated(50)).toBe(false);
    expect(idea.isValidated(30)).toBe(true);
  });

  it('should archive and unarchive', () => {
    const idea = IdeaEntity.create(validIdea);
    expect(idea.archived).toBe(false);
    idea.archive();
    expect(idea.archived).toBe(true);
    idea.unarchive();
    expect(idea.archived).toBe(false);
  });
});

describe('AssetEntity', () => {
  const validAsset = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 150,
    change: 2.5,
    changePercent: 1.7,
    volume: '50M',
    marketCap: '2.5T',
    alerts: false,
    category: 'Tech' as const,
  };

  it('should create an asset entity', () => {
    const asset = AssetEntity.create(validAsset);
    expect(asset.symbol).toBe('AAPL');
    expect(asset.id).toBe('AAPL');
  });

  it('should check if change is positive', () => {
    const positive = AssetEntity.create(validAsset);
    const negative = AssetEntity.create({ ...validAsset, change: -1 });
    
    expect(positive.isPositive()).toBe(true);
    expect(negative.isPositive()).toBe(false);
  });

  it('should toggle alerts', () => {
    const asset = AssetEntity.create(validAsset);
    expect(asset.alerts).toBe(false);
    asset.toggleAlerts();
    expect(asset.alerts).toBe(true);
  });

  it('should update price', () => {
    const asset = AssetEntity.create(validAsset);
    asset.updatePrice(160, 5, 3.2);
    expect(asset.price).toBe(160);
    expect(asset.change).toBe(5);
    expect(asset.changePercent).toBe(3.2);
  });
});

describe('PortfolioEntity', () => {
  const validPortfolio = {
    totalValue: 100000,
    dayChange: 1000,
    dayChangePercent: 1,
    totalReturn: 20000,
    totalReturnPercent: 20,
  };

  it('should create a portfolio entity', () => {
    const portfolio = PortfolioEntity.create(validPortfolio);
    expect(portfolio.totalValue).toBe(100000);
  });

  it('should check if day change is positive', () => {
    const positive = PortfolioEntity.create(validPortfolio);
    const negative = PortfolioEntity.create({ ...validPortfolio, dayChange: -500 });
    
    expect(positive.isPositive()).toBe(true);
    expect(negative.isPositive()).toBe(false);
  });

  it('should format total value', () => {
    const portfolio = PortfolioEntity.create(validPortfolio);
    expect(portfolio.getFormattedTotalValue()).toContain('100,000');
  });
});

describe('AtomicPrincipleEntity', () => {
  it('should create atomic principle entity', () => {
    const principle = AtomicPrincipleEntity.create({
      order: 1,
      principle: 'Make it Obvious',
      description: 'Stack habits',
    });
    expect(principle.principle).toBe('Make it Obvious');
    expect(principle.order).toBe(1);
  });
});
