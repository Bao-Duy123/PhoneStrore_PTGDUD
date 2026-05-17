import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/utils';
import { brands, products } from '@/data/mockData';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const getSuggestions = (query) => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(lowerQuery))
      .map(p => ({
        ...p,
        matchCount: p.name.toLowerCase().split(lowerQuery).length - 1
      }))
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 5);
  };

  const suggestions = getSuggestions(searchQuery);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/products/${productId}`);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          PhoneStore
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.trim().length > 0);
                }}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                className="w-64 pl-10 pr-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-primary font-semibold">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Brands Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition">
              Danh mục
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <ul className="py-2">
                {brands.map((brand) => (
                  <li key={brand}>
                    <Link
                      to={`/products?brand=${brand}`}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-primary transition-colors"
                    >
                      {brand}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="relative flex items-center gap-2 hover:text-gray-200 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary">
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
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-primary transition-colors"
                    >
                      Tài khoản
                    </Link>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-primary transition-colors"
                      >
                        Quản trị
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => logout()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-red-50 hover:text-primary transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-sm border-l pl-4 border-white/40">
              <Link to="/login" className="hover:underline">
                Đăng nhập
              </Link>
              <span>|</span>
              <Link to="/register" className="hover:underline text-white/90">
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
        <div className="md:hidden bg-primary border-t border-white/20 px-4 py-4 animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded text-gray-800"
            />
          </form>

          {/* Mobile Auth Links */}
          {!isAuthenticated && (
            <div className="flex gap-4 mb-4">
              <Link to="/login" className="hover:underline">Đăng nhập</Link>
              <Link to="/register" className="hover:underline">Đăng ký</Link>
            </div>
          )}

          {/* Mobile Brand Links */}
          <ul className="space-y-2">
            {brands.map((brand) => (
              <li key={brand}>
                <Link
                  to={`/products?brand=${brand}`}
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
