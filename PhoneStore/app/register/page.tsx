'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register, clearError } from '@/store/slices/authSlice';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
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
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (password.length < 6) {
      setLocalError('Mật khẩu tối thiểu 6 ký tự');
      return;
    }

    dispatch(register({ name, email, phone, password }));
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="mb-6">
          <Link href="/" className="text-2xl font-bold text-[#ff4d4f]">
            PhoneStore
          </Link>
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-black">Tạo tài khoản</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-base font-bold text-black mb-2">Họ và tên</label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Số điện thoại</label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-base font-bold text-black mb-2">Email</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm"
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
                  className="w-full border-2 border-gray-300 text-black rounded-lg pl-4 pr-10 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2 items-start mt-2">
                <div className="bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">!</div>
                <p className="text-xs text-gray-500 font-bold leading-snug">Mật khẩu tối thiểu 6 ký tự</p>
              </div>
            </div>
            <div>
              <label className="block text-base font-bold text-black mb-2">Nhập lại mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 text-black rounded-lg pl-4 pr-10 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {displayError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              {displayError}
            </div>
          )}

          <div className="flex gap-5 pt-4">
            <Link
              href="/login"
              className="flex-1 text-center bg-white text-gray-500 border-2 border-gray-300 font-bold rounded-lg py-3 hover:bg-gray-50 transition-colors"
            >
              ← Quay lại đăng nhập
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#d00000] hover:bg-[#b00000] text-white font-bold rounded-lg py-3 shadow-md transition-all text-lg disabled:opacity-50"
            >
              {isLoading ? 'Đang đăng ký...' : 'Hoàn tất đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
