/**
 * Domain Entities
 * Core business objects with identity and behavior
 */

import type { 
  Book, 
  Skill, 
  Habit, 
  Idea, 
  Asset, 
  IdeaValidation,
  AtomicPrinciple,
  MonthlyLearningData,
} from '@/types';

// ============================================================================
// Base Entity
// ============================================================================

export abstract class Entity<TId> {
  constructor(public readonly id: TId) {}

  equals(other: Entity<TId>): boolean {
    return this.id === other.id;
  }
}

// ============================================================================
// Learning Domain Entities
// ============================================================================

export class BookEntity extends Entity<string> implements Book {
  constructor(
    id: string,
    public title: string,
    public author: string,
    public progress: number,
    public category: Book['category'],
    public coverImageUrl?: string,
    public startedAt?: Date,
    public completedAt?: Date
  ) {
    super(id);
    this.validateProgress();
  }

  private validateProgress(): void {
    if (this.progress < 0 || this.progress > 100) {
      throw new Error('Progress must be between 0 and 100');
    }
  }

  isCompleted(): boolean {
    return this.progress === 100;
  }

  updateProgress(newProgress: number): void {
    if (newProgress < 0 || newProgress > 100) {
      throw new Error('Progress must be between 0 and 100');
    }
    (this as any).progress = newProgress;
    if (newProgress === 100 && !this.completedAt) {
      (this as any).completedAt = new Date();
    }
  }

  static create(props: Omit<Book, 'id'> & { id?: string }): BookEntity {
    return new BookEntity(
      props.id || crypto.randomUUID(),
      props.title,
      props.author,
      props.progress,
      props.category,
      props.coverImageUrl,
      props.startedAt,
      props.completedAt
    );
  }
}

export class SkillEntity extends Entity<string> implements Skill {
  constructor(
    id: string,
    public name: string,
    public level: number,
    public category: Skill['category']
  ) {
    super(id);
    this.validateLevel();
  }

  private validateLevel(): void {
    if (this.level < 0 || this.level > 100) {
      throw new Error('Skill level must be between 0 and 100');
    }
  }

  improve(amount: number): void {
    const newLevel = Math.min(100, this.level + amount);
    (this as any).level = newLevel;
  }

  static create(props: Omit<Skill, 'id'> & { id?: string }): SkillEntity {
    return new SkillEntity(
      props.id || crypto.randomUUID(),
      props.name,
      props.level,
      props.category
    );
  }
}

// ============================================================================
// Habit Domain Entities
// ============================================================================

export class HabitEntity extends Entity<string> implements Habit {
  constructor(
    id: string,
    public name: string,
    public streak: number,
    public completed: boolean[],
    public color: string,
    public category: Habit['category'],
    public createdAt: Date,
    public targetDaysPerWeek: number = 7
  ) {
    super(id);
    this.validateCompleted();
  }

  private validateCompleted(): void {
    if (this.completed.length !== 7) {
      throw new Error('Completed array must have exactly 7 days');
    }
  }

  toggleDay(dayIndex: number): void {
    if (dayIndex < 0 || dayIndex >= 7) {
      throw new Error('Day index must be between 0 and 6');
    }
    const newCompleted = [...this.completed];
    newCompleted[dayIndex] = !newCompleted[dayIndex];
    (this as any).completed = newCompleted;
    this.recalculateStreak();
  }

  private recalculateStreak(): void {
    let streak = 0;
    for (let i = this.completed.length - 1; i >= 0; i--) {
      if (this.completed[i]) {
        streak++;
      } else {
        break;
      }
    }
    (this as any).streak = streak;
  }

  isCompletedToday(): boolean {
    return this.completed[6]; // Sunday/last day
  }

  getWeeklyCompletionRate(): number {
    const completed = this.completed.filter(Boolean).length;
    return Math.round((completed / 7) * 100);
  }

  static create(props: Omit<Habit, 'id'> & { id?: string }): HabitEntity {
    return new HabitEntity(
      props.id || crypto.randomUUID(),
      props.name,
      props.streak,
      props.completed,
      props.color,
      props.category,
      props.createdAt,
      props.targetDaysPerWeek
    );
  }
}

export class AtomicPrincipleEntity extends Entity<string> implements AtomicPrinciple {
  constructor(
    id: string,
    public order: number,
    public principle: string,
    public description: string
  ) {
    super(id);
  }

  static create(props: Omit<AtomicPrinciple, 'id'> & { id?: string }): AtomicPrincipleEntity {
    return new AtomicPrincipleEntity(
      props.id || crypto.randomUUID(),
      props.order,
      props.principle,
      props.description
    );
  }
}

// ============================================================================
// Ideas Domain Entities
// ============================================================================

export class IdeaEntity extends Entity<string> implements Idea {
  constructor(
    id: string,
    public title: string,
    public description: string,
    public category: Idea['category'],
    public stage: Idea['stage'],
    public impact: Idea['impact'],
    public validation: IdeaValidation,
    public createdAt: Date,
    public archived: boolean = false
  ) {
    super(id);
  }

  toggleValidationStep(stepKey: keyof IdeaValidation): void {
    (this as any).validation = {
      ...this.validation,
      [stepKey]: !this.validation[stepKey],
    };
    this.updateStageBasedOnValidation();
  }

  private updateStageBasedOnValidation(): void {
    const v = this.validation;
    const completed = Object.values(v).filter(Boolean).length;
    const total = Object.values(v).length;
    const percentage = (completed / total) * 100;

    if (percentage === 0) {
      (this as any).stage = 'idea';
    } else if (percentage < 50) {
      (this as any).stage = 'validation';
    } else if (percentage < 83) { // 5/6
      (this as any).stage = 'mvp';
    } else {
      (this as any).stage = 'revenue';
    }
  }

  getValidationProgress(): number {
    const steps = Object.values(this.validation);
    const completed = steps.filter(Boolean).length;
    return Math.round((completed / steps.length) * 100);
  }

  isValidated(threshold: number = 50): boolean {
    return this.getValidationProgress() >= threshold;
  }

  archive(): void {
    (this as any).archived = true;
  }

  unarchive(): void {
    (this as any).archived = false;
  }

  static create(props: Omit<Idea, 'id'> & { id?: string }): IdeaEntity {
    return new IdeaEntity(
      props.id || crypto.randomUUID(),
      props.title,
      props.description,
      props.category,
      props.stage,
      props.impact,
      props.validation,
      props.createdAt,
      props.archived
    );
  }
}

// ============================================================================
// Trading Domain Entities
// ============================================================================

export class AssetEntity extends Entity<string> implements Asset {
  constructor(
    id: string, // symbol as id
    public symbol: string,
    public name: string,
    public price: number,
    public change: number,
    public changePercent: number,
    public volume: string,
    public marketCap: string,
    public alerts: boolean,
    public category: Asset['category']
  ) {
    super(id);
  }

  isPositive(): boolean {
    return this.change >= 0;
  }

  toggleAlerts(): void {
    (this as any).alerts = !this.alerts;
  }

  updatePrice(newPrice: number, newChange: number, newChangePercent: number): void {
    (this as any).price = newPrice;
    (this as any).change = newChange;
    (this as any).changePercent = newChangePercent;
  }

  static create(props: Omit<Asset, 'id'> & { id?: string }): AssetEntity {
    return new AssetEntity(
      props.id || props.symbol,
      props.symbol,
      props.name,
      props.price,
      props.change,
      props.changePercent,
      props.volume,
      props.marketCap,
      props.alerts,
      props.category
    );
  }
}

export class PortfolioEntity {
  constructor(
    public totalValue: number,
    public dayChange: number,
    public dayChangePercent: number,
    public totalReturn: number,
    public totalReturnPercent: number
  ) {}

  isPositive(): boolean {
    return this.dayChange >= 0;
  }

  getFormattedTotalValue(): string {
    return `$${this.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  getFormattedDayChange(): string {
    const sign = this.dayChange >= 0 ? '+' : '';
    return `${sign}$${this.dayChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  getFormattedTotalReturn(): string {
    const sign = this.totalReturn >= 0 ? '+' : '';
    return `${sign}$${this.totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  static create(props: Omit<PortfolioEntity, 'isPositive' | 'getFormattedTotalValue' | 'getFormattedDayChange' | 'getFormattedTotalReturn'>): PortfolioEntity {
    return new PortfolioEntity(
      props.totalValue,
      props.dayChange,
      props.dayChangePercent,
      props.totalReturn,
      props.totalReturnPercent
    );
  }
}
