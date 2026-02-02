/**
 * Component Unit Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  StatCard, 
  StatsGrid,
  CircularProgress,
  ProgressBar,
  Badge,
  TabButton,
} from '@/components';
import type { StatMetric } from '@/types';

describe('StatCard', () => {
  const mockStat: StatMetric = {
    id: '1',
    label: 'Test Stat',
    value: '100',
    change: '+10',
    changeType: 'positive',
    iconName: 'BookOpen',
    color: 'from-emerald-500 to-teal-500',
  };

  it('should render stat card with correct data', () => {
    render(<StatCard stat={mockStat} />);
    
    expect(screen.getByText('Test Stat')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('+10')).toBeInTheDocument();
  });

  it('should render all stat cards in grid', () => {
    const stats: StatMetric[] = [
      mockStat,
      { ...mockStat, id: '2', label: 'Stat 2' },
    ];
    
    render(<StatsGrid stats={stats} />);
    
    expect(screen.getByText('Test Stat')).toBeInTheDocument();
    expect(screen.getByText('Stat 2')).toBeInTheDocument();
  });
});

describe('CircularProgress', () => {
  it('should render with progress', () => {
    render(<CircularProgress progress={75} />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render with children', () => {
    render(
      <CircularProgress progress={50}>
        <span>50%</span>
      </CircularProgress>
    );
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});

describe('ProgressBar', () => {
  it('should render progress bar', () => {
    render(<ProgressBar progress={60} />);
    
    const bar = document.querySelector('.h-full');
    expect(bar).toBeInTheDocument();
  });

  it('should show label when requested', () => {
    render(<ProgressBar progress={45} showLabel />);
    
    expect(screen.getByText('45%')).toBeInTheDocument();
  });
});

describe('Badge', () => {
  it('should render badge with text', () => {
    render(<Badge>Test Badge</Badge>);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('should apply different colors', () => {
    const { rerender } = render(<Badge color="success">Success</Badge>);
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    rerender(<Badge color="error">Error</Badge>);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});

describe('TabButton', () => {
  it('should render tab button', () => {
    render(
      <TabButton active={false} onClick={() => {}}>
        Tab 1
      </TabButton>
    );
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <TabButton active={false} onClick={onClick}>
        Click Me
      </TabButton>
    );
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should show active state', () => {
    const { rerender } = render(
      <TabButton active={false} onClick={() => {}}>
        Tab
      </TabButton>
    );
    
    rerender(
      <TabButton active={true} onClick={() => {}}>
        Tab
      </TabButton>
    );
    
    expect(screen.getByText('Tab')).toBeInTheDocument();
  });
});
