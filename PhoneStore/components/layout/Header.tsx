'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';
import { products } from '@/lib/data/products';
import { Product } from '@/types';

const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Google'] as const;

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { itemCount, openCart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  // Search logic
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = products
        .filter((p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
        )
        .slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (product: Product) => {
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/products/${product.id}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setSearchResults([]);
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-[#ff4d4f] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          PhoneStore
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Category Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition"
            >
              Danh mục
              <svg
                className={cn('w-4 h-4 transition-transform', isDropdownOpen && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <ul className="py-2">
                  {BRANDS.map((brand) => (
                    <li key={brand}>
                      <Link
                        href={`/products?brand=${brand}`}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-[#ff4d4f] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search Bar with Dropdown */}
          <div className="relative" ref={searchRef}>
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Bạn muốn mua gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-64 pl-10 pr-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            </div>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl overflow-hidden z-50">
                <ul className="py-2">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleSearchSelect(product)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-[#ff4d4f] font-semibold">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 px-4 py-2">
                  <button
                    onClick={() => {
                      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                      setSearchResults([]);
                    }}
                    className="text-sm text-[#ff4d4f] hover:underline"
                  >
                    Xem tất cả kết quả cho "{searchQuery}"
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 hover:text-gray-200 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#ff4d4f]">
                {itemCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-gray-200 transition">
                <User className="w-6 h-6" />
                <span className="hidden sm:inline">{user?.name}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-[#ff4d4f] transition-colors"
                    >
                      Tài khoản
                    </Link>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <Link
                        href="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-[#ff4d4f] transition-colors"
                      >
                        Quản trị
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => logout()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-[#ff4d4f] transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-sm border-l pl-4 border-white/40">
              <Link href="/login" className="hover:underline">
                Đăng nhập
              </Link>
              <span>|</span>
              <Link href="/register" className="hover:underline text-white/90">
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#ff4d4f] border-t border-white/20 px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 rounded text-gray-800"
            />
          </div>
          <ul className="space-y-2">
            {BRANDS.map((brand) => (
              <li key={brand}>
                <Link
                  href={`/products?brand=${brand}`}
                  className="block px-4 py-2 hover:bg-white/10 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
