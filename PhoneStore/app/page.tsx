'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { CartSidebar, ProductCard } from '@/components/features';
import { products as mockProducts } from '@/lib/data/products';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';
import { toast } from 'sonner';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const featuredProducts = mockProducts.slice(0, 8);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      router.push('/login');
      return;
    }
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleViewDetail = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="mb-8">
          <Link href="/products" className="block rounded-xl overflow-hidden shadow-sm">
            <Image
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/slidingmobanmacneo.png"
              alt="Banner Macbook Neo"
              width={1036}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </Link>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 max-w-6xl py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Điện thoại nổi bật</h2>
            <Link href="/products">
              <button className="px-4 py-2 border border-[#ff4d4f] text-[#ff4d4f] rounded-lg hover:bg-[#ff4d4f] hover:text-white transition-colors text-sm font-medium">
                Xem tất cả
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={() => handleViewDetail(product)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Mua sắm theo thương hiệu
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Google'].map((brand) => (
                <Link
                  key={brand}
                  href={`/products?brand=${brand}`}
                  className="bg-gray-50 hover:bg-[#ff4d4f]/5 border border-gray-200 rounded-xl p-6 text-center transition-colors group"
                >
                  <h3 className="font-bold text-gray-900 group-hover:text-[#ff4d4f] transition-colors">
                    {brand}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Xem sản phẩm
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 max-w-6xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff4d4f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ff4d4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Chính hãng</h3>
              <p className="text-gray-500 text-sm">Cam kết sản phẩm chính hãng với chế độ bảo hành uy tín</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff4d4f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ff4d4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-500 text-sm">Giao hàng trong 24h tại các thành phố lớn</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff4d4f]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ff4d4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Thanh toán an toàn</h3>
              <p className="text-gray-500 text-sm">Nhiều phương thức thanh toán linh hoạt và bảo mật</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartSidebar />
    </>
  );
}
