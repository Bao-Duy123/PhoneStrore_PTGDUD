'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Shield, Mail, Phone, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Badge, Card, CardContent } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { User as UserType, UserRole } from '@/types';
import { toast } from 'sonner';

const userSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
});

type UserFormData = z.infer<typeof userSchema>;

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin người dùng');
      }
      
      const data = await response.json();
      setUser(data.user);
      reset(data.user);
    } catch {
      setError('Đã xảy ra lỗi khi tải thông tin người dùng');
    } finally {
      setIsLoading(false);
    }
  }, [userId, reset]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onSubmit = async (data: UserFormData) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Cập nhật thất bại');
      }
      
      const result = await response.json();
      setUser(result.user);
      setIsEditing(false);
      toast.success('Cập nhật thông tin thành công');
    } catch {
      toast.error('Cập nhật thông tin thất bại');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangeRole = async (newRole: UserRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!response.ok) {
        throw new Error('Cập nhật thất bại');
      }
      
      const result = await response.json();
      setUser(result.user);
      toast.success('Cập nhật vai trò thành công');
    } catch {
      toast.error('Cập nhật vai trò thất bại');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {error || 'Không tìm thấy người dùng'}
            </h2>
            <p className="text-gray-500 mb-6">Vui lòng thử lại sau</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Chi tiết người dùng</h1>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
          )}
        </div>

        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-[#ff4d4f]/10 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  user.role === 'admin' ? (
                    <Shield className="w-10 h-10 text-[#ff4d4f]" />
                  ) : (
                    <User className="w-10 h-10 text-gray-600" />
                  )
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <Badge variant={user.role === 'admin' ? 'danger' : 'info'}>
                  {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </Badge>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Họ và tên"
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input
                  label="Số điện thoại"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Hủy
                  </Button>
                  <Button type="submit" isLoading={isSaving}>
                    Lưu thay đổi
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Họ và tên</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày tạo tài khoản</p>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Role Management (Admin only) */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">Quản lý vai trò</h3>
            <p className="text-gray-500 mb-4">
              Thay đổi vai trò của người dùng này
            </p>
            <div className="flex gap-3">
              {user.role === 'user' ? (
                <Button
                  size="sm"
                  onClick={() => handleChangeRole('admin')}
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Nâng cấp lên Admin
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleChangeRole('user')}
                >
                  Hạ cấp xuống User
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
