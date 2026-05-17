import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { ProductCard, ProductFilters, Pagination } from '@/components/features';
import { useProducts } from '@/hooks';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredItems, filters, pagination, setFilters, clearFilters, setPage } = useProducts();

  // Sync URL params with filters
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const brand = searchParams.get('brand') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const sortBy = (searchParams.get('sortBy') as typeof filters.sortBy) || 'createdAt';
    const sortOrder = (searchParams.get('sortOrder') as typeof filters.sortOrder) || 'desc';

    setFilters({ search, brand, minPrice, maxPrice, sortBy, sortOrder });
  }, [searchParams, setFilters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams(searchParams);
    
    if (newFilters.search !== undefined) {
      if (newFilters.search) params.set('search', newFilters.search);
      else params.delete('search');
    }
    if (newFilters.brand !== undefined) {
      if (newFilters.brand) params.set('brand', newFilters.brand);
      else params.delete('brand');
    }
    if (newFilters.minPrice !== undefined) {
      if (newFilters.minPrice) params.set('minPrice', String(newFilters.minPrice));
      else params.delete('minPrice');
    }
    if (newFilters.maxPrice !== undefined) {
      if (newFilters.maxPrice) params.set('maxPrice', String(newFilters.maxPrice));
      else params.delete('maxPrice');
    }
    if (newFilters.sortBy !== undefined) params.set('sortBy', newFilters.sortBy);
    if (newFilters.sortOrder !== undefined) params.set('sortOrder', newFilters.sortOrder);

    setSearchParams(params);
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
    clearFilters();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 max-w-6xl py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {filters.brand ? `${filters.brand} Smartphones` : 'Tất cả sản phẩm'}
                </h1>
                <p className="text-gray-500 mt-1">Có {pagination.total} sản phẩm</p>
              </div>
            </div>

            {/* Products */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm nào</p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary hover:underline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
