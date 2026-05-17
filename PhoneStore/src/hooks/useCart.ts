import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
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
} from '@/store/slices/cartSlice';
import { Product } from '@/types';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);
  const isOpen = useAppSelector((state) => state.cart.isOpen);

  const handleAddToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      dispatch(addToCart({ product, quantity }));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (productId: number) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch]
  );

  const handleUpdateQuantity = useCallback(
    (productId: number, quantity: number) => {
      dispatch(updateQuantity({ productId, quantity }));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleToggleCart = useCallback(() => {
    dispatch(toggleCart());
  }, [dispatch]);

  const handleOpenCart = useCallback(() => {
    dispatch(openCart());
  }, [dispatch]);

  const handleCloseCart = useCallback(() => {
    dispatch(closeCart());
  }, [dispatch]);

  return {
    items,
    total,
    itemCount,
    isOpen,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    toggleCart: handleToggleCart,
    openCart: handleOpenCart,
    closeCart: handleCloseCart,
  };
}
