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
  specs: ProductSpecs;
  highlights: string[];
  stock: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  oldPrice?: number;
  brand: Product['brand'];
  image: string;
  specs: ProductSpecs;
  highlights: string[];
  stock: number;
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

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface Order {
  id: number;
  orderId: string;
  customer: string;
  phone: string;
  email?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
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

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// UI Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export interface UIState {
  isSidebarOpen: boolean;
  toasts: Toast[];
}

// Filter Types
export interface ProductFilters {
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
  user: User;
  token: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  ordersByStatus: Record<OrderStatus, number>;
  revenueByDay: { date: string; revenue: number }[];
  topProducts: { product: Product; quantity: number }[];
}
