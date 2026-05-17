/**
 * Mock API Service with localStorage Persistence
 */

import { users as defaultUsers, userPasswords as defaultPasswords, products as defaultProducts, orders as defaultOrders, brands } from '@/data/mockData';
import { generateId } from '@/lib/utils';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEYS = {
  products: 'phonestore_products',
  users: 'phonestore_users',
  passwords: 'phonestore_passwords',
  orders: 'phonestore_orders',
};

function loadFromStorage(key, fallback) {
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

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

function saveObjectToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

function loadObjectFromStorage(key, fallback) {
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

const defaultProductsClone = JSON.parse(JSON.stringify(defaultProducts));
const defaultUsersClone = JSON.parse(JSON.stringify(defaultUsers));
const defaultOrdersClone = JSON.parse(JSON.stringify(defaultOrders));

let products = loadFromStorage(STORAGE_KEYS.products, defaultProductsClone);
let users = loadFromStorage(STORAGE_KEYS.users, defaultUsersClone);
let userPasswords = loadObjectFromStorage(STORAGE_KEYS.passwords, { ...defaultPasswords });
let orders = loadFromStorage(STORAGE_KEYS.orders, defaultOrdersClone);

export const authApi = {
  async login(credentials) {
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
      user: { ...user, password: undefined },
      token,
    };
  },

  async register(data) {
    await delay(500);

    if (users.find(u => u.phone === data.phone)) {
      throw new Error('Số điện thoại đã được đăng ký');
    }

    const newUser = {
      id: generateId(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    userPasswords[data.phone] = data.password;

    saveToStorage(STORAGE_KEYS.users, users);
    saveObjectToStorage(STORAGE_KEYS.passwords, userPasswords);

    const token = `mock_token_${newUser.id}_${Date.now()}`;

    return {
      user: newUser,
      token,
    };
  },

  async logout() {
    await delay(200);
    localStorage.removeItem('phonestore_auth');
  },

  async getProfile() {
    await delay(300);
    const stored = localStorage.getItem('phonestore_auth');
    if (!stored) {
      throw new Error('Chưa đăng nhập');
    }
    const { user } = JSON.parse(stored);
    return user;
  },
};

export const productsApi = {
  async getProducts(params) {
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
      filtered = filtered.filter(p => p.price >= params.minPrice);
    }

    if (params?.maxPrice) {
      filtered = filtered.filter(p => p.price <= params.maxPrice);
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

  async getProductById(id) {
    await delay(200);
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error('Sản phẩm không tồn tại');
    }
    return product;
  },

  async getFeaturedProducts() {
    await delay(200);
    return products.filter(p => p.featured);
  },

  async getProductsByBrand(brand) {
    await delay(200);
    return products.filter(p => p.brand === brand);
  },

  async getBrands() {
    await delay(100);
    return [...brands];
  },

  async createProduct(data) {
    await delay(400);
    const newProduct = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);

    saveToStorage(STORAGE_KEYS.products, products);

    return newProduct;
  },

  async updateProduct(id, data) {
    await delay(400);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Sản phẩm không tồn tại');
    }
    products[index] = { ...products[index], ...data };

    saveToStorage(STORAGE_KEYS.products, products);

    return products[index];
  },

  async deleteProduct(id) {
    await delay(300);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Sản phẩm không tồn tại');
    }
    products.splice(index, 1);

    saveToStorage(STORAGE_KEYS.products, products);
  },
};

export const ordersApi = {
  async getOrders(userId) {
    await delay(300);
    if (userId) {
      return orders.filter(o => o.userId === userId);
    }
    return [...orders];
  },

  async getOrderById(id) {
    await delay(200);
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Đơn hàng không tồn tại');
    }
    return order;
  },

  async createOrder(data) {
    await delay(500);

    const updatedProducts = products.map(p => {
      const orderItem = data.items.find(item => item.product.id === p.id);
      if (orderItem) {
        return { ...p, stock: Math.max(0, p.stock - orderItem.quantity) };
      }
      return p;
    });
    products = updatedProducts;

    saveToStorage(STORAGE_KEYS.products, products);

    const newOrder = {
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

    saveToStorage(STORAGE_KEYS.orders, orders);

    return newOrder;
  },

  async updateOrderStatus(id, status) {
    await delay(300);
    const order = orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Đơn hàng không tồn tại');
    }
    order.status = status;
    order.updatedAt = new Date().toISOString();

    saveToStorage(STORAGE_KEYS.orders, orders);

    return order;
  },

  async getOrderStats() {
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

export const usersApi = {
  async getUsers() {
    await delay(300);
    return users.map(u => ({ ...u }));
  },

  async getUserById(id) {
    await delay(200);
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }
    return { ...user };
  },

  async getUserStats() {
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

export function resetToDefaults() {
  products = JSON.parse(JSON.stringify(defaultProducts));
  users = JSON.parse(JSON.stringify(defaultUsers));
  userPasswords = { ...defaultPasswords };
  orders = JSON.parse(JSON.stringify(defaultOrders));

  saveToStorage(STORAGE_KEYS.products, products);
  saveToStorage(STORAGE_KEYS.users, users);
  saveObjectToStorage(STORAGE_KEYS.passwords, userPasswords);
  saveToStorage(STORAGE_KEYS.orders, orders);
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.products);
  localStorage.removeItem(STORAGE_KEYS.users);
  localStorage.removeItem(STORAGE_KEYS.passwords);
  localStorage.removeItem(STORAGE_KEYS.orders);
  resetToDefaults();
}
