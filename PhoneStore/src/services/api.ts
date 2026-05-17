/**
 * Mock API Service with localStorage Persistence
 * 
 * This module simulates backend API calls using localStorage for persistence.
 * All functions return Promises to mimic real API behavior.
 * 
 * Data is automatically saved to localStorage when CRUD operations are performed.
 */

import { LoginCredentials, RegisterData, AuthResponse, Product, Order, OrderFormData, User, ProductFormData } from '@/types';
import { users as defaultUsers, userPasswords as defaultPasswords, products as defaultProducts, orders as defaultOrders, brands } from '@/data/mockData';
import { generateId } from '@/lib/utils';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  products: 'phonestore_products',
  users: 'phonestore_users',
  passwords: 'phonestore_passwords',
  orders: 'phonestore_orders',
};

// ============================================================================
// LOCAL STORAGE HELPERS
// ============================================================================

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn(`Error loading ${key} from storage:`, e);
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

function saveObjectToStorage<T>(key: string, data: Record<string, T>): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

function loadObjectFromStorage<T>(key: string, fallback: Record<string, T>): Record<string, T> {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn(`Error loading ${key} from storage:`, e);
  }
  return fallback;
}

// ============================================================================
// INITIALIZE DATA FROM STORAGE (OR USE DEFAULTS)
// ============================================================================

// Deep clone default data to avoid mutation
const defaultProductsClone: Product[] = JSON.parse(JSON.stringify(defaultProducts));
const defaultUsersClone: User[] = JSON.parse(JSON.stringify(defaultUsers));
const defaultOrdersClone: Order[] = JSON.parse(JSON.stringify(defaultOrders));

// Load from localStorage or use defaults
let products: Product[] = loadFromStorage(STORAGE_KEYS.products, defaultProductsClone);
let users: User[] = loadFromStorage(STORAGE_KEYS.users, defaultUsersClone);
let userPasswords: Record<string, string> = loadObjectFromStorage(STORAGE_KEYS.passwords, { ...defaultPasswords });
let orders: Order[] = loadFromStorage(STORAGE_KEYS.orders, defaultOrdersClone);

// ============================================================================
// AUTH API
// ============================================================================

export const authApi = {
  /**
   * Login with phone and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(500);

    const user = users.find(u => u.phone === credentials.phone);
    
    if (!user) {
      throw new Error('Số điện thoại hoặc mật khẩu không đúng');
    }

    const storedPassword = userPasswords[credentials.phone];
    if (storedPassword !== credentials.password) {
      throw new Error('Số điện thoại hoặc mật khẩu không đúng');
    }

    const token = `mock_token_${user.id}_${Date.now()}`;

    return {
      user: { ...user, password: undefined } as User,
      token,
    };
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    await delay(500);

    if (users.find(u => u.phone === data.phone)) {
      throw new Error('Số điện thoại đã được đăng ký');
    }

    const newUser: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    userPasswords[data.phone] = data.password;

    // Save to localStorage
    saveToStorage(STORAGE_KEYS.users, users);
    saveObjectToStorage(STORAGE_KEYS.passwords, userPasswords);

    const token = `mock_token_${newUser.id}_${Date.now()}`;

    return {
      user: newUser,
      token,
    };
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('phonestore_auth');
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    await delay(300);
    const stored = localStorage.getItem('phonestore_auth');
    if (!stored) {
      throw new Error('Chưa đăng nhập');
    }
    const { user } = JSON.parse(stored);
    return user;
  },
};

// ============================================================================
// PRODUCTS API
// ============================================================================

export const productsApi = {
  /**
   * Get all products with optional filters
   */
  async getProducts(params?: {
    search?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: Product[]; total: number; page: number; pageSize: number; totalPages: number }> {
    await delay(300);

    let filtered = [...products];

    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.brand.toLowerCase().includes(search)
      );
    }

    if (params?.brand) {
      filtered = filtered.filter(p => p.brand === params.brand);
    }

    if (params?.minPrice) {
      filtered = filtered.filter(p => p.price >= params.minPrice!);
    }

    if (params?.maxPrice) {
      filtered = filtered.filter(p => p.price <= params.maxPrice!);
    }

    if (params?.sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (params.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          default:
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return params.sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 12;
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const items = filtered.slice(startIndex, startIndex + pageSize);

    return { items, total, page, pageSize, totalPages };
  },

  /**
   * Get single product by ID
   */
  async getProductById(id: number): Promise<Product> {
    await delay(200);
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error('Sản phẩm không tồn tại');
    }
    return product;
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(): Promise<Product[]> {
    await delay(200);
    return products.filter(p => p.featured);
  },

  /**
   * Get products by brand
   */
  async getProductsByBrand(brand: string): Promise<Product[]> {
    await delay(200);
    return products.filter(p => p.brand === brand);
  },

  /**
   * Get all brands
   */
  async getBrands(): Promise<string[]> {
    await delay(100);
    return [...brands];
  },

  /**
   * Create new product (admin only) - SAVES TO LOCALSTORAGE
   */
  async createProduct(data: ProductFormData): Promise<Product> {
    await delay(400);
    const newProduct: Product = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.products, products);
    
    return newProduct;
  },

  /**
   * Update product (admin only) - SAVES TO LOCALSTORAGE
   */
  async updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
    await delay(400);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Sản phẩm không tồn tại');
    }
    products[index] = { ...products[index], ...data };
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.products, products);
    
    return products[index];
  },

  /**
   * Delete product (admin only) - SAVES TO LOCALSTORAGE
   */
  async deleteProduct(id: number): Promise<void> {
    await delay(300);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Sản phẩm không tồn tại');
    }
    products.splice(index, 1);
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.products, products);
  },
};

// ============================================================================
// ORDERS API
// ============================================================================

export const ordersApi = {
  /**
   * Get all orders (admin) or user orders
   */
  async getOrders(userId?: number): Promise<Order[]> {
    await delay(300);
    if (userId) {
      return orders.filter(o => o.userId === userId);
    }
    return [...orders];
  },

  /**
   * Get single order by ID
   */
  async getOrderById(id: number): Promise<Order> {
    await delay(200);
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Đơn hàng không tồn tại');
    }
    return order;
  },

  /**
   * Create new order - SAVES TO LOCALSTORAGE
   * Also deducts product stock
   */
  async createOrder(data: { userId: number; items: Order['items']; total: number } & Omit<OrderFormData, 'notes'>): Promise<Order> {
    await delay(500);

    // Deduct stock for each item - create new objects to avoid mutation issues
    const updatedProducts = products.map(p => {
      const orderItem = data.items.find(item => item.product.id === p.id);
      if (orderItem) {
        return { ...p, stock: Math.max(0, p.stock - orderItem.quantity) };
      }
      return p;
    });
    products = updatedProducts;

    // Save updated stock to localStorage
    saveToStorage(STORAGE_KEYS.products, products);

    const newOrder: Order = {
      id: generateId(),
      userId: data.userId,
      items: data.items,
      total: data.total,
      status: 'pending',
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      shippingAddress: data.shippingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);

    // Save to localStorage
    saveToStorage(STORAGE_KEYS.orders, orders);

    return newOrder;
  },

  /**
   * Update order status (admin only) - SAVES TO LOCALSTORAGE
   */
  async updateOrderStatus(id: number, status: Order['status']): Promise<Order> {
    await delay(300);
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Đơn hàng không tồn tại');
    }
    order.status = status;
    order.updatedAt = new Date().toISOString();
    
    // Save to localStorage
    saveToStorage(STORAGE_KEYS.orders, orders);
    
    return order;
  },

  /**
   * Get order statistics (admin)
   */
  async getOrderStats(): Promise<{
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    await delay(200);
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    };
  },
};

// ============================================================================
// USERS API (Admin)
// ============================================================================

export const usersApi = {
  /**
   * Get all users (admin only)
   */
  async getUsers(): Promise<User[]> {
    await delay(300);
    return users.map(u => ({ ...u })) as User[];
  },

  /**
   * Get user by ID
   */
  async getUserById(id: number): Promise<User> {
    await delay(200);
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }
    return { ...user };
  },

  /**
   * Get user statistics (admin)
   */
  async getUserStats(): Promise<{
    total: number;
    admins: number;
    users: number;
    newThisMonth: number;
  }> {
    await delay(200);
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    return {
      total: users.length,
      admins: users.filter(u => u.role === 'admin').length,
      users: users.filter(u => u.role === 'user').length,
      newThisMonth: users.filter(u => {
        const created = new Date(u.createdAt);
        return created.getMonth() === thisMonth && created.getFullYear() === thisYear;
      }).length,
    };
  },
};

// ============================================================================
// UTILITY: Reset data to defaults (for testing)
// ============================================================================

export function resetToDefaults(): void {
  products = JSON.parse(JSON.stringify(defaultProducts));
  users = JSON.parse(JSON.stringify(defaultUsers));
  userPasswords = { ...defaultPasswords };
  orders = JSON.parse(JSON.stringify(defaultOrders));
  
  saveToStorage(STORAGE_KEYS.products, products);
  saveToStorage(STORAGE_KEYS.users, users);
  saveObjectToStorage(STORAGE_KEYS.passwords, userPasswords);
  saveToStorage(STORAGE_KEYS.orders, orders);
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.products);
  localStorage.removeItem(STORAGE_KEYS.users);
  localStorage.removeItem(STORAGE_KEYS.passwords);
  localStorage.removeItem(STORAGE_KEYS.orders);
  resetToDefaults();
}
