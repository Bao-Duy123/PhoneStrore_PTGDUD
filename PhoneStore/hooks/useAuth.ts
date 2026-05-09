'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { login, logout, register, checkAuth, clearError } from '@/lib/store/slices/authSlice';
import { loadCart } from '@/lib/store/slices/cartSlice';
import { LoginCredentials, RegisterData } from '@/types';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    dispatch(checkAuth()).finally(() => setIsInitialized(true));
  }, [dispatch]);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      const result = await dispatch(login(credentials)).unwrap();
      dispatch(loadCart());
      return result;
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (data: RegisterData) => {
      const result = await dispatch(register(data)).unwrap();
      dispatch(loadCart());
      return result;
    },
    [dispatch]
  );

  const handleLogout = useCallback(async () => {
    return dispatch(logout()).unwrap();
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || !isInitialized,
    error,
    isAdmin,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError: handleClearError,
  };
}
