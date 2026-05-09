import React, { useState, useEffect, useRef } from 'react';

const Header = ({ onOpenLogin, onOpenRegister, onOpenCart, onGoHome, isLoggedIn, user, onLogout, cartItemCount = 0, onSearch, onCategorySelect, categories = [], searchResults = [], onSelectSearchResult }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    setShowSearchDropdown(value.trim().length > 0);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const handleAdminDashboard = () => {
    setIsUserMenuOpen(false);
    onGoHome('admin');
  };

  const handleCategoryClick = (categoryName) => {
    setIsDropdownOpen(false);
    onCategorySelect(categoryName);
  };

  const handleSelectResult = (product) => {
    setLocalSearch('');
    setShowSearchDropdown(false);
    onSelectSearchResult(product);
  };

  return (
    <header className="bg-[#ff4d4f] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => { onGoHome(); onSearch(''); onCategorySelect(''); }}>
          PhoneStore
        </div>

        {/* Dropdown Danh mục */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded flex items-center gap-2 text-sm transition bg-[#ff6b6b]"
          >
            Danh mục
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden text-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => handleCategoryClick('')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-[#ff4d4f] transition-colors font-medium"
                  >
                    Tất cả sản phẩm
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryClick(cat.name)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-[#ff4d4f] transition-colors"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Thanh tìm kiếm với dropdown kết quả */}
        <div className="flex-1 max-w-xl relative hidden md:block" ref={searchRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            placeholder="Bạn muốn mua gì ?"
            value={localSearch}
            onChange={handleSearchChange}
            onFocus={() => localSearch.trim() && setShowSearchDropdown(true)}
            className="w-full pl-10 pr-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
          
          {/* Dropdown hiển thị kết quả tìm kiếm */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectResult(product)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-b-0 transition-colors"
                >
                  <img 
                    src={product.image || "https://placehold.co/40x40"} 
                    alt={product.name}
                    className="w-10 h-10 object-contain bg-gray-100 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-red-500 font-bold">{product.price?.toLocaleString('vi-VN')}đ</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {showSearchDropdown && localSearch.trim() && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 p-4 text-center text-gray-500 text-sm z-50">
              Không tìm thấy sản phẩm nào
            </div>
          )}
        </div>

        {/* Giỏ hàng & Đăng nhập */}
        <div className="flex items-center gap-6">
          <div onClick={onOpenCart} className="flex items-center gap-2 cursor-pointer relative hover:text-gray-200 transition">
            <span className="text-sm">Giỏ hàng</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#ff4d4f]">
              {cartItemCount}
            </span>
          </div>

          {/* User Menu */}
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 hover:text-gray-200 transition"
              >
                <span className="text-sm font-medium">{user?.name || 'Tài khoản'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden text-gray-800">
                  <ul className="py-2">
                    <li className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100 flex items-center gap-2">
                      {user?.role === 'admin' && (
                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium">Admin</span>
                      )}
                      <span className="font-medium text-gray-800 truncate">{user?.name}</span>
                    </li>
                    {user?.role === 'admin' && (
                      <li>
                        <button
                          onClick={handleAdminDashboard}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                          </svg>
                          Quản lý Admin
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm border-l pl-4 border-white/40 flex gap-2">
              <button onClick={onOpenLogin} className="hover:underline">Đăng nhập</button>
              <span>|</span>
              <button onClick={onOpenRegister} className="hover:underline text-white/90">Đăng kí</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;