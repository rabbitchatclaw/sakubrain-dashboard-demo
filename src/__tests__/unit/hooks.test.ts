/**
 * Hook Unit Tests
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsyncState } from '@/hooks';

describe('useAsyncState', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAsyncState());
    
    expect(result.current.state.data).toBeNull();
    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.error).toBeNull();
  });

  it('should initialize with initial data', () => {
    const { result } = renderHook(() => useAsyncState('initial'));
    
    expect(result.current.state.data).toBe('initial');
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useAsyncState());
    
    act(() => {
      result.current.setLoading();
    });
    
    expect(result.current.state.status).toBe('loading');
    expect(result.current.state.data).toBeNull();
  });

  it('should set success state', () => {
    const { result } = renderHook(() => useAsyncState());
    
    act(() => {
      result.current.setSuccess('data');
    });
    
    expect(result.current.state.status).toBe('success');
    expect(result.current.state.data).toBe('data');
    expect(result.current.state.error).toBeNull();
  });

  it('should set error state', () => {
    const { result } = renderHook(() => useAsyncState());
    const error = new Error('Test error');
    
    act(() => {
      result.current.setError(error);
    });
    
    expect(result.current.state.status).toBe('error');
    expect(result.current.state.error).toBe(error);
    expect(result.current.state.data).toBeNull();
  });

  it('should reset state', () => {
    const { result } = renderHook(() => useAsyncState('initial'));
    
    act(() => {
      result.current.setSuccess('new data');
    });
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.state.data).toBe('initial');
    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.error).toBeNull();
  });
});
