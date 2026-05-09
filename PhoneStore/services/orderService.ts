import { Order, OrderStatus } from '@/types';

function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DH${timestamp}${random}`;
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const token = getToken();
    const response = await fetch('/api/orders', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách đơn hàng');
    }
    
    const data = await response.json();
    return data;
  },

  async getOrder(id: number): Promise<Order | undefined> {
    const token = getToken();
    const response = await fetch(`/api/orders/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin đơn hàng');
    }
    
    const data = await response.json();
    return data.order;
  },

  async createOrder(data: {
    items: { productId: number; productName: string; productImage: string; price: number; quantity: number }[];
    total: number;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    shippingAddress: {
      street: string;
      ward: string;
      district: string;
      city: string;
    };
    notes?: string;
  }): Promise<Order> {
    const token = getToken();
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        ...data,
        orderId: generateOrderId(),
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Không thể tạo đơn hàng');
    }
    
    const result = await response.json();
    return result.order;
  },

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const token = getToken();
    const response = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Không thể cập nhật trạng thái đơn hàng');
    }
    
    const data = await response.json();
    return data.order;
  },

  async cancelOrder(id: number): Promise<Order | undefined> {
    return this.updateOrderStatus(id, 'cancelled');
  },
};
