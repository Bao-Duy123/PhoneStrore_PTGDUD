import { User, UserRole } from '@/types';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const token = getToken();
    const response = await fetch('/api/users', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách người dùng');
    }
    
    return response.json();
  },

  async getUser(id: number): Promise<User | undefined> {
    const token = getToken();
    const response = await fetch(`/api/users/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin người dùng');
    }
    
    const data = await response.json();
    return data.user;
  },

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const token = getToken();
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Cập nhật thất bại');
    }
    
    const result = await response.json();
    return result.user;
  },

  async updateUserRole(id: number, role: UserRole): Promise<User> {
    return this.updateUser(id, { role });
  },

  async deleteUser(id: number): Promise<void> {
    const token = getToken();
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Xóa người dùng thất bại');
    }
  },
};
