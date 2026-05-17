import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '@/types';

const CART_STORAGE_KEY = 'phonestore_cart';

function getCartFromStorage(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Validate and filter valid items only
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is CartItem =>
            item != null &&
            typeof item.product === 'object' &&
            item.product != null &&
            typeof item.product.id === 'number' &&
            typeof item.product.price === 'number'
        );
      }
    }
  } catch {
    // Ignore
  }
  return [];
}

function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore
  }
}

const initialState: CartState = {
  items: getCartFromStorage(),
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      if (!product || typeof product.id !== 'number') return;
      
      const existingItem = state.items.find(item => item.product?.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product?.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product?.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product?.id !== productId);
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

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + (item.product?.price || 0) * (item.quantity || 0), 0);
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + (item.quantity || 0), 0);
