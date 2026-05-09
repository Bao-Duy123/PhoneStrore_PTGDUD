import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '@/types';

const CART_STORAGE_KEY = 'phonestore_cart';

function getCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

const initialState: CartState = {
  items: typeof window !== 'undefined' ? getCartFromStorage() : [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    loadCart: (state) => {
      state.items = getCartFromStorage();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }): CartItem[] => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }): number =>
  state.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
export const selectCartItemCount = (state: { cart: CartState }): number =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
