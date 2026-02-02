/**
 * Main Dashboard Page
 * Orchestrates all domain sections using custom hooks
 */

'use client';

import { Header } from '@/components/Header';
import { 
  StatsGrid, 
  LearningProgressCard,
  HabitTrackerCard,
  IdeasSectionCard,
  TradingWatchlistCard,
  LoadingCard,
  ErrorMessage,
} from '@/components';
import { 
  useStats, 
  useLearning, 
  useHabits, 
  useIdeas, 
  useTrading 
} from '@/hooks';
import { createRepositories } from '@/domain/repositories/mockRepositories';

// Create repositories (can be replaced with real API repositories)
const repositories = createRepositories();

// ============================================================================
// LOADING STATES
// ============================================================================

function DashboardSkeleton() {
  return (
    <main className="min-h-screen">
      <div className="h-16 bg-slate-900/50 border-b border-white/10"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <LoadingCard />
          <LoadingCard />
        </div>
      </div>
    </main>
  );
}

// ============================================================================
// ERROR STATE
// ============================================================================

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage 
          message="Failed to load dashboard data. Please try again." 
          onRetry={onRetry}
        />
      </div>
    </main>
  );
}

// ============================================================================
// MAIN DASHBOARD CONTENT
// ============================================================================

function DashboardContent() {
  // Initialize hooks with repositories
  const { stats, refresh: refreshStats } = useStats(repositories.stats);
  const learning = useLearning(repositories.learning);
  const habits = useHabits(repositories.habits);
  const ideas = useIdeas(repositories.ideas);
  const trading = useTrading(repositories.trading);

  // Check if any data is loading initially
  const isInitialLoading = 
    stats.state.status === 'loading' ||
    learning.monthlyData.state.status === 'loading';

  // Check for errors
  const hasError = 
    stats.state.status === 'error' ||
    learning.monthlyData.state.status === 'error';

  if (isInitialLoading) {
    return <DashboardSkeleton />;
  }

  if (hasError) {
    return (
      <DashboardError 
        onRetry={() => {
          refreshStats();
          learning.refresh();;
          habits.refresh();;
          ideas.refresh();;
          trading.refresh();;
        }} 
      />
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <section id="overview">
          {stats.state.data && <StatsGrid stats={stats.state.data} />}
        </section>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          {/* Learning Progress */}
          <section id="learning">
            <LearningProgressCard
              monthlyData={learning.monthlyData.state.data || []}
              recentBooks={learning.recentBooks.state.data || []}
              skills={learning.skills.state.data || []}
              summary={learning.summary.state.data || { totalBooksRead: 0, totalStudyHours: 0, totalSkills: 0 }}
              isLoading={learning.monthlyData.state.status === 'loading'}
            />
          </section>

          {/* Habit Tracker */}
          <section id="habits">
            <HabitTrackerCard
              habits={habits.habits.state.data || []}
              principles={habits.principles.state.data || []}
              stats={habits.stats.state.data || { totalStreak: 0, completedToday: 0, totalHabits: 0, successRate: 0 }}
              dailyGoal={habits.dailyGoal}
              showPrinciples={habits.showPrinciples}
              onTogglePrinciples={() => habits.setShowPrinciples(!habits.showPrinciples)}
              onToggleHabitDay={habits.toggleHabitDay}
              isLoading={habits.habits.state.status === 'loading'}
            />
          </section>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* Ideas Section */}
          <section id="ideas">
            <IdeasSectionCard
              ideas={ideas.ideas.state.data || []}
              stats={ideas.stats.state.data || { totalIdeas: 0, validatedIdeas: 0, ideasByStage: { idea: 0, validation: 0, mvp: 0, revenue: 0 } }}
              filters={ideas.filters}
              expandedIdeaId={ideas.expandedIdeaId}
              onUpdateFilters={ideas.updateFilters}
              onToggleValidation={ideas.toggleValidationStep}
              onToggleExpanded={ideas.toggleExpanded}
              isLoading={ideas.ideas.state.status === 'loading'}
            />
          </section>

          {/* Trading Watchlist */}
          <section id="trading">
            <TradingWatchlistCard
              assets={trading.assets.state.data || []}
              portfolio={trading.portfolio.state.data || { totalValue: 0, dayChange: 0, dayChangePercent: 0, totalReturn: 0, totalReturnPercent: 0 }}
              filters={trading.filters}
              onUpdateFilters={trading.updateFilters}
              onToggleAlerts={trading.toggleAlerts}
              isLoading={trading.assets.state.status === 'loading'}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

// ============================================================================
// PAGE EXPORT
// ============================================================================

export default function DashboardPage() {
  return <DashboardContent />;
}
