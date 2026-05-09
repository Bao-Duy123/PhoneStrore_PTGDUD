'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { Badge } from '@/components/ui';
import { Button } from '@/components/ui';

interface ProductCardProps {
  product: Product;
  onViewDetail?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onViewDetail, onAddToCart }: ProductCardProps) {
  const discount = useMemo(() => {
    return product.oldPrice ? calculateDiscount(product.oldPrice, product.price) : 0;
  }, [product.oldPrice, product.price]);

  const handleViewDetail = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetail?.();
  }, [onViewDetail]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.();
  }, [onAddToCart]);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col h-full border border-gray-100 group">
      {/* Discount Badge */}
      {discount > 0 && (
        <Badge variant="danger" className="absolute top-3 left-3 z-10">
          Giảm {discount}%
        </Badge>
      )}

      {/* Product Image */}
      <Link
        href={`/products/${product.id}`}
        className="block w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 mt-4 overflow-hidden relative"
      >
        <Image
          src={product.image || 'https://via.placeholder.com/300x375'}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* Brand */}
          <span className="text-xs text-gray-500 mb-1 block">{product.brand}</span>

          {/* Name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-gray-800 text-sm mb-2 leading-snug hover:text-[#ff4d4f] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-end gap-2 mb-2">
            <span className="text-[#ff4d4f] font-bold text-base">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 text-xs line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating || 0})</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button
            onClick={handleViewDetail}
            variant="secondary"
            size="sm"
          >
            Chi tiết
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="danger"
            size="sm"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
}
