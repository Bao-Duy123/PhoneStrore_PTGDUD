import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from '@/lib/store/slices/cartSlice';
import { Product } from '@/types';

const createTestStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
  });

const mockProduct: Product = {
  id: 1,
  name: 'iPhone 15 Pro',
  price: 29990000,
  brand: 'Apple',
  image: '/iphone15.jpg',
  specs: { screen: '6.7"', cpu: 'A17', ram: '8GB', rom: '256GB', battery: '4422mAh' },
  highlights: ['Titan frame', '5x zoom'],
  stock: 10,
  rating: 4.8,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 2,
  name: 'Samsung Galaxy S24',
  price: 20990000,
};

describe('cartSlice reducers', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should return initial state', () => {
    const state = store.getState().cart;
    expect(state.items).toEqual([]);
    expect(state.isOpen).toBe(false);
  });

  describe('addToCart', () => {
    it('should add a new item to cart', () => {
      store.dispatch(addToCart({ product: mockProduct, quantity: 1 }));
      const state = store.getState().cart;
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product).toEqual(mockProduct);
      expect(state.items[0].quantity).toBe(1);
    });

    it('should increase quantity if product already in cart', () => {
      store.dispatch(addToCart({ product: mockProduct, quantity: 1 }));
      store.dispatch(addToCart({ product: mockProduct, quantity: 2 }));
      const state = store.getState().cart;
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(3);
    });

    it('should add multiple different products', () => {
      store.dispatch(addToCart({ product: mockProduct, quantity: 1 }));
      store.dispatch(addToCart({ product: mockProduct2, quantity: 1 }));
      const state = store.getState().cart;
      expect(state.items).toHaveLength(2);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      store.dispatch(addToCart({ product: mockProduct, quantity: 1 }));
      store.dispatch(removeFromCart(mockProduct.id));
      expect(store.getState().cart.items).toHaveLength(0);
    });

    it('should not throw when removing non-existent item', () => {
      expect(() => store.dispatch(removeFromCart(999))).not.toThrow();
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity of existing item', () => {
      store.dispatch(addToCart({ product: mockProduct, quantity: 1 }));
      store.dispatch(updateQuantity({ productId: mockProduct.id, quantity: 5 }));
      expect(store.getState().cart.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0 or less', () => {
      store.dispatch(addToCart({ product: mockProduct, quantity: 3 }));
      store.dispatch(updateQuantity({ productId: mockProduct.id, quantity: 0 }));
      expect(store.getState().cart.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items', () => {
      store.dispatch(addToCart({ product: mockProduct, quantity: 1 }));
      store.dispatch(addToCart({ product: mockProduct2, quantity: 2 }));
      store.dispatch(clearCart());
      expect(store.getState().cart.items).toHaveLength(0);
    });
  });

  describe('cart visibility', () => {
    it('should toggle cart visibility', () => {
      expect(store.getState().cart.isOpen).toBe(false);
      store.dispatch(toggleCart());
      expect(store.getState().cart.isOpen).toBe(true);
      store.dispatch(toggleCart());
      expect(store.getState().cart.isOpen).toBe(false);
    });

    it('should open cart', () => {
      store.dispatch(openCart());
      expect(store.getState().cart.isOpen).toBe(true);
    });

    it('should close cart', () => {
      store.dispatch(openCart());
      store.dispatch(closeCart());
      expect(store.getState().cart.isOpen).toBe(false);
    });
  });
});

describe('cartSlice selectors', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it('selectCartItems should return all cart items', () => {
    store.dispatch(addToCart({ product: mockProduct, quantity: 2 }));
    store.dispatch(addToCart({ product: mockProduct2, quantity: 1 }));
    const items = selectCartItems(store.getState());
    expect(items).toHaveLength(2);
  });

  it('selectCartTotal should calculate total correctly', () => {
    store.dispatch(addToCart({ product: mockProduct, quantity: 1 }));
    store.dispatch(addToCart({ product: mockProduct2, quantity: 2 }));
    const total = selectCartTotal(store.getState());
    expect(total).toBe(mockProduct.price + mockProduct2.price * 2);
  });

  it('selectCartItemCount should count total quantities', () => {
    store.dispatch(addToCart({ product: mockProduct, quantity: 3 }));
    store.dispatch(addToCart({ product: mockProduct2, quantity: 2 }));
    const count = selectCartItemCount(store.getState());
    expect(count).toBe(5);
  });
});
