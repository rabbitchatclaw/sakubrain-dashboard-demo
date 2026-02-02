import { Header } from '@/components/Header';
import { LearningProgress } from '@/components/LearningProgress';
import { IdeasSection } from '@/components/IdeasSection';
import { HabitTracker } from '@/components/HabitTracker';
import { TradingWatchlist } from '@/components/TradingWatchlist';
import { StatsOverview } from '@/components/StatsOverview';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <StatsOverview />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          <LearningProgress />
          <HabitTracker />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <IdeasSection />
          <TradingWatchlist />
        </div>
      </div>
    </main>
  );
}
