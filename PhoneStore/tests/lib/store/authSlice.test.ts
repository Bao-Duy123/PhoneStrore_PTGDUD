import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  clearError,
  setUser,
} from '@/lib/store/slices/authSlice';
import { User } from '@/types';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  phone: '0909123456',
  role: 'user',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('authSlice reducers', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer },
    });
  });

  it('should return initial state', () => {
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle clearError', () => {
    store.dispatch(clearError());
    expect(store.getState().auth.error).toBeNull();
  });

  it('should handle setUser', () => {
    store.dispatch(setUser(mockUser));
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });
});
