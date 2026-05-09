'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setToken, setUser, logout } from '@/lib/store/slices/authSlice';

const REFRESH_THRESHOLD = 60 * 1000; // Refresh 1 phút trước khi hết hạn

export function useRefreshToken() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const refreshInProgressRef = useRef(false);

  const refreshToken = useCallback(async () => {
    // Không refresh nếu đang refresh hoặc chưa đăng nhập
    if (refreshInProgressRef.current || !isAuthenticated) {
      return false;
    }

    refreshInProgressRef.current = true;

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Refresh failed');
      }

      const data = await response.json();

      if (data.success && data.token) {
        // Lưu token mới vào localStorage
        localStorage.setItem('token', data.token);
        dispatch(setToken(data.token));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Nếu refresh thất bại, logout user
      dispatch(logout());
      return false;
    } finally {
      refreshInProgressRef.current = false;
    }
  }, [dispatch, isAuthenticated]);

  // Tự động refresh token trước khi hết hạn
  useEffect(() => {
    if (!isAuthenticated) return;

    // Refresh ngay lập tức khi mount (nếu cần)
    refreshToken();

    // Setup interval để refresh định kỳ
    const intervalId = setInterval(() => {
      refreshToken();
    }, 5 * 60 * 1000); // Refresh mỗi 5 phút

    // Setup timeout để refresh trước khi hết hạn
    // (Trong thực tế, bạn nên decode token để lấy exp time)
    const refreshTimeoutId = setTimeout(() => {
      refreshToken();
    }, REFRESH_THRESHOLD);

    return () => {
      clearInterval(intervalId);
      clearTimeout(refreshTimeoutId);
    };
  }, [isAuthenticated, refreshToken, user?.id]);

  return { refreshToken };
}
