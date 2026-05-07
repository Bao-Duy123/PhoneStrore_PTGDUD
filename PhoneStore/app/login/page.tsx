'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, clearError } from '@/store/slices/authSlice';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ phone, password }));
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        {/* Banner trái */}
        <div className="hidden md:flex md:w-[45%] bg-gray-50 border-r border-gray-200 p-8 items-center justify-center flex-col">
          <h3 className="font-extrabold mb-4 text-xl tracking-widest uppercase">OPPO</h3>
          <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center mb-4">
            <span className="text-gray-400">OPPO Find N6 Banner</span>
          </div>
          <button className="bg-[#fca5a5] hover:bg-[#f87171] text-black font-bold px-8 py-3 rounded-full shadow-md transition-colors">
            MUA NGAY
          </button>
        </div>

        {/* Form đăng nhập */}
        <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center relative">
          <div className="mb-6">
            <Link href="/" className="text-2xl font-bold text-[#ff4d4f]">
              PhoneStore
            </Link>
          </div>

          <h2 className="text-2xl font-extrabold text-center mb-8 text-black">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-5 mb-6">
            <div>
              <label className="block text-base font-bold text-black mb-2">Số điện thoại</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:ring-4 focus:ring-red-100 focus:border-[#d00000] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 text-black rounded-lg pl-4 pr-10 py-3 outline-none focus:ring-4 focus:ring-red-100 focus:border-[#d00000] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#d00000] hover:bg-[#b00000] text-white font-bold py-3 text-lg rounded-lg shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="text-center mb-4">
            <Link href="#" className="text-blue-500 hover:underline text-base">
              Quên mật khẩu?
            </Link>
          </div>

          <div className="text-center">
            <span className="text-gray-500 text-base">Bạn chưa có tài khoản? </span>
            <Link href="/register" className="text-[#f87171] hover:text-[#dc2626] hover:underline text-base font-medium">
              Đăng ký ngay
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-semibold mb-2">Tài khoản demo:</p>
            <p>Admin: 0909123456 / admin123</p>
            <p>User: 0909123457 / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
