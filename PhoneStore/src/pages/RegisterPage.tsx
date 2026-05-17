import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, Eye, EyeOff, User, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks';
import { toast } from 'sonner';

const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').transform(val => val.trim()),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      toast.success('Đăng ký thành công!');
      navigate('/');
    } catch (err) {
      // Error is handled by useAuth
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary">
            PhoneStore
          </Link>
          <p className="text-gray-500 mt-2">Tạo tài khoản mới</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              icon={<User className="w-5 h-5" />}
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Nhập email"
              icon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              {...register('email')}
            />

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
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Đăng ký
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-gray-600 mt-6">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
