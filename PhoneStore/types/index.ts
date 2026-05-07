// Product Types
export interface ProductSpecs {
  screen: string;
  cpu: string;
  ram: string;
  rom: string;
  battery: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  brand: 'Apple' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Google';
  image: string;
  specs?: ProductSpecs;
  highlights?: string[];
  stock: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  discountLabel?: string | null;
}

// User Types
export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth Types
export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
