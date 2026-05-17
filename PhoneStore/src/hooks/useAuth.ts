import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  setLoading,
} from '@/store/slices/authSlice';
import { LoginCredentials, RegisterData } from '@/types';
import { authApi } from '@/services/api';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.login(credentials);
      dispatch(loginSuccess(response));
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      dispatch(loginFailure(message));
      throw err;
    }
  }, [dispatch]);

  const register = useCallback(async (data: RegisterData) => {
    dispatch(setLoading(true));
    try {
      const response = await authApi.register(data);
      dispatch(loginSuccess(response));
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đăng ký thất bại';
      dispatch(loginFailure(message));
      throw err;
    }
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    authApi.logout();
    dispatch(logout());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    login,
    register,
    logout: logoutUser,
    clearError: clearAuthError,
  };
}
