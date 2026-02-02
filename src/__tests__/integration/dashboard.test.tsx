/**
 * Integration Tests
 */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createRepositories } from '@/domain/repositories/mockRepositories';
import { useStats, useLearning, useHabits, useIdeas, useTrading } from '@/hooks';

// Test component that uses hooks
function TestDashboard() {
  const repositories = createRepositories();
  const stats = useStats(repositories.stats);
  const learning = useLearning(repositories.learning);
  
  if (stats.stats.state.status === 'loading') {
    return <div>Loading.../div>;
  }
  
  if (stats.stats.state.status === 'error') {
    return <div>Error!</div>;
  }
  
  return (
    <div>
      <div data-testid="stats-count">{stats.stats.state.data?.length || 0}</div>
      <div data-testid="books-count">{learning.recentBooks.state.data?.length || 0}</div>
    </div>
  );
}

describe('Dashboard Integration', () => {
  it('should load and display stats', async () => {
    render(<TestDashboard />);
    
    // Initially loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByTestId('stats-count')).toHaveTextContent('4');
    }, { timeout: 3000 });
    
    expect(screen.getByTestId('books-count')).toHaveTextContent('4');
  });
});

describe('Repository Integration', () => {
  it('should create all repositories', () => {
    const repos = createRepositories();
    
    expect(repos.learning).toBeDefined();
    expect(repos.habits).toBeDefined();
    expect(repos.ideas).toBeDefined();
    expect(repos.trading).toBeDefined();
    expect(repos.stats).toBeDefined();
  });
});
