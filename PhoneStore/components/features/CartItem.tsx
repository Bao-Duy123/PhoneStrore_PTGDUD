'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 bg-white rounded-lg p-4 border border-gray-100">
      {/* Product Image */}
      <div className="w-20 h-20 relative flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={product.image || 'https://via.placeholder.com/80'}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-[#ff4d4f] font-bold">
          {formatPrice(product.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="p-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="p-1 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(product.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-900">
          {formatPrice(product.price * quantity)}
        </p>
      </div>
    </div>
  );
}
