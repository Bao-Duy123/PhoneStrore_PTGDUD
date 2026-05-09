'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự')
    .trim(),
  email: z
    .string()
    .min(1, 'Email là bắt buộc')
    .email('Email không hợp lệ')
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(11, 'Số điện thoại không được quá 11 số')
    .regex(/^0[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(50, 'Mật khẩu không được quá 50 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      toast.success('Đăng ký thành công!');
      router.push('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-[#ff4d4f]">
            PhoneStore
          </Link>
          <p className="text-gray-500 mt-2">Tạo tài khoản mới</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <Input
              label="Họ và tên"
              placeholder="Nhập họ và tên của bạn"
              icon={<User className="w-5 h-5" />}
              error={errors.name?.message}
              {...register('name')}
            />

            {/* Email */}
            <Input
              label="Email"
              type="email"
              placeholder="Nhập địa chỉ email"
              icon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Phone */}
            <Input
              label="Số điện thoại"
              type="tel"
              placeholder="Nhập số điện thoại (0x...)"
              icon={<Phone className="w-5 h-5" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            {/* Password */}
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

            {/* Password hint */}
            <p className="text-xs text-gray-500 -mt-3 ml-1">
              Mật khẩu phải có ít nhất 6 ký tự
            </p>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label="Xác nhận mật khẩu"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                icon={<Lock className="w-5 h-5" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 accent-[#ff4d4f] cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                Tôi đồng ý với{' '}
                <Link href="#" className="text-[#ff4d4f] hover:underline">
                  Điều khoản dịch vụ
                </Link>{' '}
                và{' '}
                <Link href="#" className="text-[#ff4d4f] hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Đăng ký
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-gray-600 mt-6">
            Đã có tài khoản?{' '}
            <Link href="/login" className="text-[#ff4d4f] font-medium hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
