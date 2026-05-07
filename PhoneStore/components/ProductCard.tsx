'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onViewDetail?: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const discountLabel = product.discountLabel;

  return (
    <div
      onClick={() => onViewDetail?.(product)}
      className="bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow p-3 relative flex flex-col h-full border border-gray-100 group"
    >
      {discountLabel && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          {discountLabel}
        </span>
      )}

      <div className="w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 flex items-center justify-center p-2 mt-4 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={375}
          className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-[1.2]"
          unoptimized
        />
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-1 leading-snug line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-red-500 font-bold text-base">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 text-xs line-through mb-0.5">
                {product.oldPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto relative z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail?.(product);
            }}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Xem chi tiết
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#ff4d4f] text-white hover:bg-red-500 transition-colors"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
