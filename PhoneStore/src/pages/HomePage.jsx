import { Link } from 'react-router-dom';
import { Smartphone, Shield, Truck, CreditCard } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { ProductCard } from '@/components/features';
import { useProducts } from '@/hooks';
import { brands } from '@/data/mockData';

export default function HomePage() {
  const { featuredProducts } = useProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-red-400 text-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Điện thoại chính hãng
                  <br />
                  Giá tốt nhất thị trường
                </h1>
                <p className="text-lg text-white/80 mb-6">
                  Khám phá các sản phẩm smartphone mới nhất từ Apple, Samsung, Xiaomi và nhiều hãng khác với giá ưu đãi.
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  Mua sắm ngay
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png"
                  alt="iPhone 15 Pro Max"
                  className="max-w-xs md:max-w-md drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Thương hiệu nổi tiếng</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {brands.map((brand) => (
                <Link
                  key={brand}
                  to={`/products?brand=${brand}`}
                  className="px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition text-gray-700 font-medium"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Sản phẩm chính hãng</h3>
                <p className="text-gray-500 text-sm">100% sản phẩm chính hãng, bảo hành đầy đủ</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Giao hàng nhanh</h3>
                <p className="text-gray-500 text-sm">Giao hàng trong 24h tại các thành phố lớn</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Bảo hành dài hạn</h3>
                <p className="text-gray-500 text-sm">Bảo hành chính hãng lên đến 12 tháng</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Thanh toán an toàn</h3>
                <p className="text-gray-500 text-sm">Hỗ trợ nhiều hình thức thanh toán</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
