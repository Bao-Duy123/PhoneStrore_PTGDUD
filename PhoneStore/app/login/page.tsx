'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, 'Số điện thoại không hợp lệ')
    .transform((val) => val.trim()),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success('Đăng nhập thành công!');
      // Force reload to ensure middleware picks up the cookie
      window.location.href = redirect;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-[#ff4d4f]">
            PhoneStore
          </Link>
          <p className="text-gray-500 mt-2">Đăng nhập tài khoản của bạn</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              icon={<Phone className="w-5 h-5" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <div className="relative">
              <Input
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                icon={<Lock className="w-5 h-5" />}
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#ff4d4f]" />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link href="#" className="text-sm text-[#ff4d4f] hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Đăng nhập
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Tài khoản demo:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Admin:</strong> 0909123456 / admin123</p>
              <p><strong>User:</strong> 0909123457 / password123</p>
            </div>
          </div>

          {/* Register link */}
          <p className="text-center text-gray-600 mt-6">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-[#ff4d4f] font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4d4f]"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
