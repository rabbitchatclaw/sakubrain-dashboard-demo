/**
 * Mock Data Layer
 * Can be easily replaced with real API data later
 */

import type { 
  MonthlyLearningData, 
  Book, 
  Skill, 
  Habit, 
  AtomicPrinciple,
  Idea,
  Asset,
  StatMetric,
} from '@/types';

// ============================================================================
// STATS DATA
// ============================================================================

export const mockStats: StatMetric[] = [
  {
    id: '1',
    label: 'Books Read',
    value: '47',
    change: '+12',
    changeType: 'positive',
    iconName: 'BookOpen',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: '2',
    label: 'Skills Learned',
    value: '23',
    change: '+5',
    changeType: 'positive',
    iconName: 'Target',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: '3',
    label: 'Habit Streak',
    value: '89',
    change: '+3 days',
    changeType: 'positive',
    iconName: 'Zap',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: '4',
    label: 'Portfolio',
    value: '$124.5K',
    change: '+8.4%',
    changeType: 'positive',
    iconName: 'TrendingUp',
    color: 'from-purple-500 to-pink-500',
  },
];

// ============================================================================
// LEARNING DATA
// ============================================================================

export const mockMonthlyData: MonthlyLearningData[] = [
  { month: 'Jan', books: 2, hours: 45, skills: 3 },
  { month: 'Feb', books: 3, hours: 52, skills: 4 },
  { month: 'Mar', books: 4, hours: 68, skills: 5 },
  { month: 'Apr', books: 2, hours: 38, skills: 2 },
  { month: 'May', books: 5, hours: 75, skills: 6 },
  { month: 'Jun', books: 6, hours: 82, skills: 7 },
  { month: 'Jul', books: 4, hours: 65, skills: 4 },
  { month: 'Aug', books: 7, hours: 95, skills: 8 },
  { month: 'Sep', books: 5, hours: 70, skills: 5 },
  { month: 'Oct', books: 6, hours: 88, skills: 6 },
  { month: 'Nov', books: 8, hours: 102, skills: 9 },
  { month: 'Dec', books: 5, hours: 78, skills: 6 },
];

export const mockBooks: Book[] = [
  { 
    id: '1', 
    title: 'Atomic Habits', 
    author: 'James Clear', 
    progress: 100, 
    category: 'Self-Improvement',
    completedAt: new Date('2024-01-15'),
  },
  { 
    id: '2', 
    title: 'The Psychology of Money', 
    author: 'Morgan Housel', 
    progress: 85, 
    category: 'Finance',
  },
  { 
    id: '3', 
    title: 'Deep Work', 
    author: 'Cal Newport', 
    progress: 60, 
    category: 'Productivity',
  },
  { 
    id: '4', 
    title: 'Thinking, Fast and Slow', 
    author: 'Daniel Kahneman', 
    progress: 30, 
    category: 'Psychology',
  },
];

export const mockSkills: Skill[] = [
  { id: '1', name: 'TypeScript', level: 85, category: 'Programming' },
  { id: '2', name: 'React', level: 90, category: 'Programming' },
  { id: '3', name: 'Data Analysis', level: 70, category: 'Analytics' },
  { id: '4', name: 'UI/UX Design', level: 75, category: 'Design' },
  { id: '5', name: 'Public Speaking', level: 60, category: 'Soft Skills' },
];

// ============================================================================
// HABIT DATA
// ============================================================================

export const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Read 30 min',
    streak: 23,
    completed: [true, true, true, true, true, false, false],
    color: 'from-emerald-500 to-teal-500',
    category: 'Learning',
    createdAt: new Date('2024-01-01'),
    targetDaysPerWeek: 7,
  },
  {
    id: '2',
    name: 'Meditate',
    streak: 45,
    completed: [true, true, true, false, true, true, false],
    color: 'from-indigo-500 to-purple-500',
    category: 'Wellness',
    createdAt: new Date('2023-12-01'),
    targetDaysPerWeek: 7,
  },
  {
    id: '3',
    name: 'Exercise',
    streak: 12,
    completed: [true, false, true, true, false, true, false],
    color: 'from-amber-500 to-orange-500',
    category: 'Health',
    createdAt: new Date('2024-02-01'),
    targetDaysPerWeek: 5,
  },
  {
    id: '4',
    name: 'Journal',
    streak: 89,
    completed: [true, true, true, true, true, true, true],
    color: 'from-rose-500 to-pink-500',
    category: 'Mindfulness',
    createdAt: new Date('2023-09-01'),
    targetDaysPerWeek: 7,
  },
  {
    id: '5',
    name: 'Deep Work',
    streak: 7,
    completed: [true, true, true, true, false, false, false],
    color: 'from-blue-500 to-cyan-500',
    category: 'Productivity',
    createdAt: new Date('2024-02-20'),
    targetDaysPerWeek: 5,
  },
];

export const mockAtomicPrinciples: AtomicPrinciple[] = [
  { id: '1', order: 1, principle: 'Make it Obvious', description: 'Stack habits with existing routines' },
  { id: '2', order: 2, principle: 'Make it Attractive', description: 'Pair with activities you enjoy' },
  { id: '3', order: 3, principle: 'Make it Easy', description: 'Reduce friction, start small' },
  { id: '4', order: 4, principle: 'Make it Satisfying', description: 'Track progress, celebrate wins' },
];

// ============================================================================
// IDEAS DATA
// ============================================================================

export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-powered Personal Finance Coach',
    description: 'An app that analyzes spending patterns and provides personalized financial advice using AI.',
    category: 'FinTech',
    stage: 'validation',
    impact: 'high',
    validation: {
      marketSize: true,
      problemValidation: true,
      solutionValidation: false,
      mvpBuilt: false,
      firstUsers: false,
      revenue: false,
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '2',
    title: 'Micro-Learning Platform for Developers',
    description: '5-minute daily coding challenges that compound into real skills over time.',
    category: 'EdTech',
    stage: 'mvp',
    impact: 'medium',
    validation: {
      marketSize: true,
      problemValidation: true,
      solutionValidation: true,
      mvpBuilt: true,
      firstUsers: true,
      revenue: false,
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
  {
    id: '3',
    title: 'Decentralized Content Monetization',
    description: 'A platform allowing creators to monetize content directly without platform fees.',
    category: 'Web3',
    stage: 'idea',
    impact: 'high',
    validation: {
      marketSize: true,
      problemValidation: false,
      solutionValidation: false,
      mvpBuilt: false,
      firstUsers: false,
      revenue: false,
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: '4',
    title: 'Smart Home Energy Optimizer',
    description: 'IoT device that learns usage patterns and optimizes energy consumption automatically.',
    category: 'IoT',
    stage: 'revenue',
    impact: 'medium',
    validation: {
      marketSize: true,
      problemValidation: true,
      solutionValidation: true,
      mvpBuilt: true,
      firstUsers: true,
      revenue: true,
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
  },
];

// ============================================================================
// TRADING DATA
// ============================================================================

export const mockAssets: Asset[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.56,
    change: 2.34,
    changePercent: 1.25,
    volume: '52.3M',
    marketCap: '2.95T',
    alerts: true,
    category: 'Tech',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 238.45,
    change: -5.67,
    changePercent: -2.32,
    volume: '98.1M',
    marketCap: '756B',
    alerts: false,
    category: 'Auto',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: 495.22,
    change: 12.89,
    changePercent: 2.67,
    volume: '45.7M',
    marketCap: '1.22T',
    alerts: true,
    category: 'Tech',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    price: 378.91,
    change: 1.23,
    changePercent: 0.33,
    volume: '28.4M',
    marketCap: '2.81T',
    alerts: false,
    category: 'Tech',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com',
    price: 155.33,
    change: -2.11,
    changePercent: -1.34,
    volume: '41.2M',
    marketCap: '1.61T',
    alerts: true,
    category: 'E-commerce',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.00,
    change: 850.00,
    changePercent: 2.00,
    volume: '28.5B',
    marketCap: '847B',
    alerts: true,
    category: 'Crypto',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2280.50,
    change: -45.25,
    changePercent: -1.95,
    volume: '12.8B',
    marketCap: '274B',
    alerts: false,
    category: 'Crypto',
  },
];

export const mockPortfolio = {
  totalValue: 124567.89,
  dayChange: 2345.67,
  dayChangePercent: 1.92,
  totalReturn: 18567.89,
  totalReturnPercent: 17.53,
};
