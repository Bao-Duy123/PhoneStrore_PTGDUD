import { LoginCredentials, RegisterData, AuthResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Quan trọng: gửi cookies
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Đăng nhập thất bại');
    }
    
    return response.json();
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Đăng ký thất bại');
    }
    
    return response.json();
  },

  async logout(): Promise<void> {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getProfile(): Promise<AuthResponse['user']> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin người dùng');
    }
    
    return response.json();
  },

  async updateProfile(data: Partial<RegisterData>): Promise<AuthResponse['user']> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Cập nhật thất bại');
    }
    
    return response.json();
  },
};
