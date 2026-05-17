import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '@/types';
import { generateId } from '@/lib/utils';

// ============================================================================
// LOAD ORDERS FROM LOCALSTORAGE
// ============================================================================
const STORAGE_KEY = 'phonestore_orders';

interface OrdersState {
  items: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

function loadOrdersFromStorage(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Error loading orders from storage:', e);
  }
  // Default mock orders nếu chưa có data
  return [
    {
      id: 1,
      userId: 2,
      items: [],
      total: 0,
      status: 'pending',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0909123457',
      customerEmail: 'nguyenvana@email.com',
      shippingAddress: {
        street: '123 Đường ABC',
        ward: 'Phường 1',
        district: 'Quận 1',
        city: 'TP Hồ Chí Minh',
      },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-18T14:00:00Z',
    },
  ];
}

const initialState: OrdersState = {
  items: loadOrdersFromStorage(),
  selectedOrder: null,
  isLoading: false,
  error: null,
};

function saveOrdersToStorage(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to storage:', e);
  }
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.unshift(newOrder);
      saveOrdersToStorage(state.items);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: number; status: OrderStatus }>) => {
      const order = state.items.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
        saveOrdersToStorage(state.items);
      }
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(o => o.id !== action.payload);
      saveOrdersToStorage(state.items);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  createOrder,
  updateOrderStatus,
  setSelectedOrder,
  deleteOrder,
  setLoading,
  setError,
} = ordersSlice.actions;

export default ordersSlice.reducer;

// Selectors
export const selectOrdersByUser = (state: { orders: OrdersState }, userId: number) =>
  state.orders.items.filter(o => o.userId === userId);
