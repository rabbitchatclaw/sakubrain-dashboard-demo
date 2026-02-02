/**
 * Domain Layer Exports
 */

// Entities
export {
  Entity,
  BookEntity,
  SkillEntity,
  HabitEntity,
  AtomicPrincipleEntity,
  IdeaEntity,
  AssetEntity,
  PortfolioEntity,
} from './entities';

// Repository Interfaces
export type {
  Repository,
  ILearningRepository,
  IHabitRepository,
  IIdeaRepository,
  ITradingRepository,
  IStatsRepository,
} from './repositories/interfaces';

// Mock Repository Implementations
export {
  MockLearningRepository,
  MockHabitRepository,
  MockIdeaRepository,
  MockTradingRepository,
  MockStatsRepository,
  createRepositories,
} from './repositories/mockRepositories';
