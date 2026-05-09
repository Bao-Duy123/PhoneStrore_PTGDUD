'use client';

import { use, Suspense } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { ChevronLeft, Check, ShoppingCart, Zap } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { CartSidebar } from '@/components/features';
import { Button, Badge, Spinner } from '@/components/ui';
import { getProductById } from '@/lib/data/products';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

function ProductDetailContent({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const product = getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  const discount = product.oldPrice
    ? calculateDiscount(product.oldPrice, product.price)
    : 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      router.push('/login');
      return;
    }
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để mua hàng');
      router.push('/login');
      return;
    }
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <>
      <Header />

      <main className="flex-grow container mx-auto px-4 max-w-6xl py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-[#ff4d4f] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </button>
          <span>/</span>
          <button
            onClick={() => router.push('/products')}
            className="hover:text-[#ff4d4f] transition-colors"
          >
            Sản phẩm
          </button>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative">
              {discount > 0 && (
                <Badge variant="danger" className="absolute top-4 left-4 z-10 text-sm font-bold px-3 py-1">
                  Giảm {discount}%
                </Badge>
              )}
              <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Brand */}
              <span className="text-sm text-gray-500 mb-2 block">{product.brand}</span>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
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
                </div>
                <span className="text-gray-500">({product.rating}/5)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-[#ff4d4f]">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-400 line-through mb-1">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-green-600 text-sm mt-1">
                    Tiết kiệm {formatPrice(product.oldPrice! - product.price)}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-green-600 font-medium">Còn hàng ({product.stock})</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-red-500 font-medium">Hết hàng</span>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  onClick={handleBuyNow}
                  variant="primary"
                  size="lg"
                  className="flex-1 gap-2"
                  disabled={product.stock === 0}
                >
                  <Zap className="w-5 h-5" />
                  Mua ngay
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2 border-2"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ
                </Button>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Điểm nổi bật:</h3>
                <ul className="space-y-2">
                  {product.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 w-24">Màn hình:</span>
                <span className="font-medium text-gray-900">{product.specs.screen}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 w-24">CPU:</span>
                <span className="font-medium text-gray-900">{product.specs.cpu}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 w-24">RAM:</span>
                <span className="font-medium text-gray-900">{product.specs.ram}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 w-24">ROM:</span>
                <span className="font-medium text-gray-900">{product.specs.rom}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 w-24">Pin:</span>
                <span className="font-medium text-gray-900">{product.specs.battery}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar />
    </>
  );
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size="lg" />
        </div>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
