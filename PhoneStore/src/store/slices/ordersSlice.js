import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'phonestore_orders';

function loadOrdersFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Error loading orders from storage:', e);
  }
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

function saveOrdersToStorage(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to storage:', e);
  }
}

let orderIdCounter = loadOrdersFromStorage().length + 1;
function generateOrderId() {
  return orderIdCounter++;
}

const initialState = {
  items: loadOrdersFromStorage(),
  selectedOrder: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.unshift(newOrder);
      saveOrdersToStorage(state.items);
    },
    updateOrderStatus: (state, action) => {
      const order = state.items.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
        saveOrdersToStorage(state.items);
      }
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    deleteOrder: (state, action) => {
      state.items = state.items.filter(o => o.id !== action.payload);
      saveOrdersToStorage(state.items);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
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

export const selectOrdersByUser = (state, userId) =>
  state.orders.items.filter(o => o.userId === userId);
