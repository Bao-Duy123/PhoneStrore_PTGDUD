'use client';

import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { PageLoader } from '@/components/ui';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onViewDetail?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductGrid({ products, isLoading, onViewDetail, onAddToCart }: ProductGridProps) {
  if (isLoading) {
    return <PageLoader />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetail={() => onViewDetail?.(product)}
          onAddToCart={() => onAddToCart?.(product)}
        />
      ))}
    </div>
  );
}
