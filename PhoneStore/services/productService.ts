import { Product, ProductFilters, PaginatedResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    
    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
    }
    
    const response = await fetch(`${API_URL}/api/products?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách sản phẩm');
    }
    
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin sản phẩm');
    }
    
    return response.json();
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Tạo sản phẩm thất bại');
    }
    
    return response.json();
  },

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Cập nhật sản phẩm thất bại');
    }
    
    return response.json();
  },

  async deleteProduct(id: number): Promise<void> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Xóa sản phẩm thất bại');
    }
  },
};
