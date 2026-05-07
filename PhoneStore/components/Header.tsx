'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

interface HeaderProps {
  onOpenCart?: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const brands = [...new Set(data.map((item: { brand: string }) => item.brand))];
        setCategories(brands);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-[#ff4d4f] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          PhoneStore
        </Link>

        <div className="relative group hidden md:block">
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded flex items-center gap-2 text-sm">
            Danh mục
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-xl overflow-hidden text-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <ul className="py-2">
              {categories.map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/?brand=${brand}`}
                    className="block px-4 py-2 text-sm hover:bg-red-50 hover:text-[#ff4d4f] transition-colors"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 max-w-xl relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Bạn muốn mua gì?"
            className="w-full pl-10 pr-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 hover:text-gray-200 transition"
          >
            <span className="text-sm">Giỏ hàng</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 border-l pl-4 border-white/40">
              <span className="text-sm">Xin chào, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm hover:underline"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="text-sm border-l pl-4 border-white/40 flex gap-2">
              <Link href="/login" className="hover:underline">Đăng nhập</Link>
              <span>|</span>
              <Link href="/register" className="hover:underline">Đăng kí</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
