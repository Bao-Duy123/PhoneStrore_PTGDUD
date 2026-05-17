import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createOrder, updateOrderStatus, setSelectedOrder } from '@/store/slices/ordersSlice';
import { reloadProducts } from '@/store/slices/productsSlice';
import { Order, OrderFormData, OrderStatus } from '@/types';
import { ordersApi } from '@/services/api';

export function useOrders() {
  const dispatch = useAppDispatch();
  const { items, selectedOrder, isLoading } = useAppSelector((state) => state.orders);
  const { user } = useAppSelector((state) => state.auth);

  const handleCreateOrder = useCallback(
    async (data: OrderFormData, orderItems: Order['items'], total: number) => {
      if (!user) throw new Error('Chưa đăng nhập');
      const order = await ordersApi.createOrder({
        userId: user.id,
        items: orderItems,
        total,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        shippingAddress: data.shippingAddress,
        notes: data.notes,
      });

      // Reload products from localStorage to get updated stock
      dispatch(reloadProducts());

      dispatch(createOrder({
        ...order,
        status: 'pending',
      }));
      return order;
    },
    [dispatch, user]
  );

  const handleUpdateOrderStatus = useCallback(
    async (id: number, status: OrderStatus) => {
      await ordersApi.updateOrderStatus(id, status);
      dispatch(updateOrderStatus({ id, status }));
    },
    [dispatch]
  );

  const handleSetSelectedOrder = useCallback(
    (order: Order | null) => {
      dispatch(setSelectedOrder(order));
    },
    [dispatch]
  );

  const userOrders = user ? items.filter(o => o.userId === user.id) : [];
  const adminOrders = items;

  return {
    items,
    selectedOrder,
    userOrders,
    adminOrders,
    isLoading,
    createOrder: handleCreateOrder,
    updateOrderStatus: handleUpdateOrderStatus,
    setSelectedOrder: handleSetSelectedOrder,
  };
}
