'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';

interface ProductFiltersProps {
  onSearch: (search: string) => void;
  onBrandChange: (brand: string | null) => void;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
  onSortChange: (sortBy: string, sortOrder: string) => void;
  onRAMChange?: (ram: string | null) => void;
  onROMChange?: (rom: string | null) => void;
  selectedBrand?: string | null;
  selectedRAM?: string | null;
  selectedROM?: string | null;
  minPrice?: number;
  maxPrice?: number;
  className?: string;
}

export function ProductFilters({
  onSearch,
  onBrandChange,
  onPriceRangeChange,
  onSortChange,
  onRAMChange,
  onROMChange,
  selectedBrand,
  selectedRAM,
  selectedROM,
  minPrice,
  maxPrice,
  className,
}: ProductFiltersProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState<string>(minPrice?.toString() || '');
  const [localMaxPrice, setLocalMaxPrice] = useState<string>(maxPrice?.toString() || '');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const brands = useMemo(() => ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Google'], []);

  const ramOptions = useMemo(() => [
    { value: '4GB', label: '4GB' },
    { value: '6GB', label: '6GB' },
    { value: '8GB', label: '8GB' },
    { value: '12GB', label: '12GB' },
    { value: '16GB', label: '16GB' },
  ], []);

  const romOptions = useMemo(() => [
    { value: '64GB', label: '64GB' },
    { value: '128GB', label: '128GB' },
    { value: '256GB', label: '256GB' },
    { value: '512GB', label: '512GB' },
    { value: '1TB', label: '1TB' },
  ], []);

  const sortOptions = useMemo(() => [
    { value: 'createdAt-desc', label: 'Mới nhất' },
    { value: 'createdAt-asc', label: 'Cũ nhất' },
    { value: 'price-asc', label: 'Giá thấp đến cao' },
    { value: 'price-desc', label: 'Giá cao đến thấp' },
    { value: 'name-asc', label: 'Tên A-Z' },
    { value: 'name-desc', label: 'Tên Z-A' },
  ], []);

  const handleSortChange = (value: string) => {
    const [by, order] = value.split('-');
    setSortBy(by);
    setSortOrder(order);
    onSortChange(by, order);
  };

  const handleApplyPriceFilter = () => {
    const min = localMinPrice ? parseInt(localMinPrice) : null;
    const max = localMaxPrice ? parseInt(localMaxPrice) : null;
    onPriceRangeChange(min, max);
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setSortBy('createdAt');
    setSortOrder('desc');
    onSearch('');
    onBrandChange(null);
    onPriceRangeChange(null, null);
    if (onRAMChange) onRAMChange(null);
    if (onROMChange) onROMChange(null);
    onSortChange('createdAt', 'desc');
  };

  const hasActiveFilters = selectedBrand || minPrice || maxPrice || searchValue || selectedRAM || selectedROM;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f] focus:border-transparent"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f] focus:border-transparent bg-white min-w-[160px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Panel - Only Brand and Price */}
      {showFilters && (
        <div className="bg-white rounded-lg p-4 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap gap-6">
            {/* Brand Filter */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Thương hiệu</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onBrandChange(null)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm transition-colors',
                    !selectedBrand
                      ? 'bg-[#ff4d4f] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  Tất cả
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => onBrandChange(brand)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm transition-colors',
                      selectedBrand === brand
                        ? 'bg-[#ff4d4f] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Khoảng giá</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Từ"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  className="w-28 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f]"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  className="w-28 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f]"
                />
                <Button size="sm" onClick={handleApplyPriceFilter}>
                  Áp dụng
                </Button>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex items-end">
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Toggle Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Bộ lọc
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-[#ff4d4f] rounded-full" />
          )}
        </Button>

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {selectedBrand && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff4d4f]/10 text-[#ff4d4f] rounded-full text-sm">
                {selectedBrand}
                <button onClick={() => onBrandChange(null)}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {minPrice && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff4d4f]/10 text-[#ff4d4f] rounded-full text-sm">
                Từ {formatPrice(minPrice)}
                <button onClick={() => onPriceRangeChange(null, maxPrice || null)}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {maxPrice && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff4d4f]/10 text-[#ff4d4f] rounded-full text-sm">
                Đến {formatPrice(maxPrice)}
                <button onClick={() => onPriceRangeChange(minPrice || null, null)}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
