'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { CartSidebar, ProductFilters, Pagination } from '@/components/features';
import { ProductCard } from '@/components/features';
import { PageLoader } from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';
import { products as mockProducts, filterProducts } from '@/lib/data/products';
import { Product } from '@/types';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [brand, setBrand] = useState<string | null>(searchParams.get('brand') || null);
  const [minPrice, setMinPrice] = useState<number | null>(
    searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : null
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : null
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  // Fetch products
  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedSearch, brand, minPrice, maxPrice, sortBy, sortOrder, page]);

  const { items, total, totalPages } = filterProducts({
    search: debouncedSearch,
    brand: brand || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    sortBy,
    sortOrder,
    page,
    limit: 12,
  });

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (brand) params.set('brand', brand);
    if (minPrice) params.set('minPrice', minPrice.toString());
    if (maxPrice) params.set('maxPrice', maxPrice.toString());
    if (sortBy !== 'createdAt') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    if (page > 1) params.set('page', page.toString());

    const queryString = params.toString();
    router.replace(queryString ? `/products?${queryString}` : '/products', { scroll: false });
  }, [debouncedSearch, brand, minPrice, maxPrice, sortBy, sortOrder, page, router]);

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

      <main className="flex-grow container mx-auto px-4 max-w-6xl py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {brand ? `${brand} Smartphones` : 'Tất cả sản phẩm'}
          </h1>
          <p className="text-gray-500 mt-1">Có {total} sản phẩm</p>
        </div>

        {/* Filters */}
        <ProductFilters
          onSearch={setSearch}
          onBrandChange={setBrand}
          onPriceRangeChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
            setPage(1);
          }}
          onSortChange={(by, order) => {
            setSortBy(by);
            setSortOrder(order);
            setPage(1);
          }}
          selectedBrand={brand}
          minPrice={minPrice || undefined}
          maxPrice={maxPrice || undefined}
        />

        {/* Products Grid */}
        <div className="mt-6">
          {isLoading ? (
            <PageLoader />
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500 text-lg mb-4">Không tìm thấy sản phẩm nào</p>
              <button
                onClick={() => {
                  setSearch('');
                  setBrand(null);
                  setMinPrice(null);
                  setMaxPrice(null);
                  setPage(1);
                }}
                className="text-[#ff4d4f] hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={() => handleViewDetail(product)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </main>

      <Footer />
      <CartSidebar />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ProductsPageContent />
    </Suspense>
  );
}
