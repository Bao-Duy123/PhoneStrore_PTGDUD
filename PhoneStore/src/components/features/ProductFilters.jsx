import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { brands } from '@/data/mockData';

export function ProductFilters({ filters, onFilterChange, onClearFilters }) {
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value) => {
    setLocalSearch(value);
  };

  const handleSearchSubmit = () => {
    onFilterChange({ search: localSearch });
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    onClearFilters();
  };

  const hasActiveFilters = filters.search || filters.brand || filters.minPrice || filters.maxPrice;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      {/* Search */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Tìm kiếm</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tên sản phẩm..."
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleSearchSubmit}>Tìm</Button>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden w-full flex items-center justify-between py-2 text-gray-700"
        onClick={() => setShowFilters(!showFilters)}
      >
        <span className="font-semibold">Bộ lọc</span>
        <span>{showFilters ? '▲' : '▼'}</span>
      </button>

      <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
        {/* Brand Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Thương hiệu</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="brand"
                checked={!filters.brand}
                onChange={() => onFilterChange({ brand: undefined })}
                className="text-primary focus:ring-primary"
              />
              <span className="text-gray-600">Tất cả</span>
            </label>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand}
                  onChange={() => onFilterChange({ brand })}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-gray-600">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Khoảng giá</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Từ"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Đến"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Sắp xếp</h3>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              onFilterChange({ sortBy, sortOrder });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="createdAt-desc">Mới nhất</option>
            <option value="createdAt-asc">Cũ nhất</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" className="w-full" onClick={handleClearFilters}>
            <X className="w-4 h-4 mr-2" />
            Xóa bộ lọc
          </Button>
        )}
      </div>
    </div>
  );
}
