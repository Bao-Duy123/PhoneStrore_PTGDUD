// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'user';

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
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Product Types
export interface ProductSpecs {
  screen: string;
  cpu: string;
  ram: string;
  storage: string;
  camera: string;
  battery: string;
  os: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  description: string;
  specs: ProductSpecs;
  stock: number;
  featured: boolean;
  createdAt: string;
}

export interface ProductFilters {
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFormData {
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  specs: ProductSpecs;
  stock: number;
  featured: boolean;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: ShippingAddress;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderFormData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: ShippingAddress;
  notes?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Filter Types
export interface BrandFilter {
  brand: string;
  count: number;
}
