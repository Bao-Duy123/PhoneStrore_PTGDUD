'use client';

import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui';
import { formatPrice } from '@/lib/utils';

export function CartSidebar() {
  const { items, total, isOpen, closeCart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Giỏ hàng ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Giỏ hàng trống</p>
              <Button onClick={closeCart} variant="outline">
                Tiếp tục mua sắm
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Giảm giá</span>
                <span className="text-green-600">- 0đ</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full" size="lg">
                  Thanh toán
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={closeCart}
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
