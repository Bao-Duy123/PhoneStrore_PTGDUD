import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/hooks';
import { toast } from 'sonner';

const loginSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').transform(val => val.trim()),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Đăng nhập thành công!');
      navigate(redirect);
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

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            Đăng nhập
          </Button>
          </form>

          {/* Register link */}
          <p className="text-center text-gray-600 mt-6">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
