import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui';
import { toast } from 'sonner';

export function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCart();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 800);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 p-4 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <Badge variant="danger" className="absolute top-2 left-2">
              -{discountPercent}%
            </Badge>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <span className="text-xs text-gray-500 mb-1 block">{product.brand}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-lg transition-colors duration-200 relative overflow-hidden"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-medium">Thêm vào giỏ</span>
            {showAnimation && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce-in">
                +1
              </span>
            )}
          </button>
          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:border-primary hover:text-primary py-2 px-3 rounded-lg transition-colors duration-200"
            title="Xem chi tiết"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
