import React, { useState, useEffect, useRef } from 'react';

const Header = ({ onOpenLogin, onOpenRegister, onOpenCart, onGoHome }) => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Đọc data.json và trích xuất các brand (thương hiệu) độc nhất để làm danh mục
    fetch('/api/data.json')
      .then((res) => res.json())
      .then((data) => {
        const uniqueBrands = [...new Set(data.map(item => item.brand))].filter(Boolean);
        const categoriesFromBrands = uniqueBrands.map((brand, index) => ({
          id: index + 1,
          name: brand
        }));
        setCategories(categoriesFromBrands);
      })
      .catch((error) => console.error('Error fetching categories from data:', error));

    // Handle click outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#ff4d4f] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight cursor-pointer" onClick={onGoHome}>
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

          {/* Menu Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-100 overflow-hidden text-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
              <ul className="py-2">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <a 
                        href={`#${cat.id}`} 
                        className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-[#ff4d4f] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {cat.name}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">Đang tải...</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            placeholder="Bạn muốn mua gì ?" 
            className="w-full pl-10 pr-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
        </div>

        {/* Giỏ hàng & Đăng nhập */}
        <div className="flex items-center gap-6">
          <div onClick={onOpenCart} className="flex items-center gap-2 cursor-pointer relative hover:text-gray-200 transition">
            <span className="text-sm">Giỏ hàng</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#ff4d4f]">
              0
            </span>
          </div>
          <div className="text-sm border-l pl-4 border-white/40 flex gap-2">
            <button onClick={onOpenLogin} className="hover:underline">Đăng nhập</button>
            <span>|</span>
            <button onClick={onOpenRegister} className="hover:underline text-white/90">Đăng kí</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;