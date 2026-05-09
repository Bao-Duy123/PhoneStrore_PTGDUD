'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ShoppingBag, Minus, Plus, Trash2, MapPin, Phone, Mail } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { CartSidebar } from '@/components/features';
import { Button, Input } from '@/components/ui';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { orderService } from '@/services/orderService';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Tên không hợp lệ'),
  customerPhone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  customerEmail: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  street: z.string().min(1, 'Địa chỉ không hợp lệ'),
  ward: z.string().min(1, 'Phường/xã không hợp lệ'),
  district: z.string().min(1, 'Quận/huyện không hợp lệ'),
  city: z.string().min(1, 'Thành phố không hợp lệ'),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function CheckoutContent() {
  const router = useRouter();
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user, isLoading } = useAuth();
  const [redirected, setRedirected] = useState(false);

  // Redirect to login if not authenticated (only after loading is complete)
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !redirected) {
      setRedirected(true);
      toast.error('Vui lòng đăng nhập để thanh toán');
      router.push('/login?redirect=/checkout');
    }
  }, [isLoading, isAuthenticated, redirected, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      customerEmail: user?.email || '',
    },
  });

  const shippingFee = 0; // Free shipping
  const grandTotal = total + shippingFee;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    try {
      await orderService.createOrder({
        items,
        total: grandTotal,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        shippingAddress: {
          street: data.street,
          ward: data.ward,
          district: data.district,
          city: data.city,
        },
        notes: data.notes,
      });

      toast.success('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
      clearCart();
      window.location.href = '/';
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4d4f]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 max-w-6xl py-12 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h1>
          <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
          <Button onClick={() => router.push('/products')}>Tiếp tục mua sắm</Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="flex-grow container mx-auto px-4 max-w-6xl py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-[#ff4d4f] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </button>
          <span>/</span>
          <span className="text-gray-700">Thanh toán</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Thông tin liên hệ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Họ và tên *"
                  placeholder="Nhập họ và tên"
                  error={errors.customerName?.message}
                  {...register('customerName')}
                />
                <Input
                  label="Số điện thoại *"
                  placeholder="Nhập số điện thoại"
                  error={errors.customerPhone?.message}
                  {...register('customerPhone')}
                />
                <Input
                  label="Email (tùy chọn)"
                  type="email"
                  placeholder="Nhập email"
                  error={errors.customerEmail?.message}
                  {...register('customerEmail')}
                  className="md:col-span-2"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Địa chỉ giao hàng
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Địa chỉ (số nhà, đường) *"
                  placeholder="VD: 123 Nguyễn Huệ"
                  error={errors.street?.message}
                  {...register('street')}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Input
                    label="Phường/Xã *"
                    placeholder="VD: Phường Bến Nghé"
                    error={errors.ward?.message}
                    {...register('ward')}
                  />
                  <Input
                    label="Quận/Huyện *"
                    placeholder="VD: Quận 1"
                    error={errors.district?.message}
                    {...register('district')}
                  />
                  <Input
                    label="Thành phố *"
                    placeholder="VD: TP.HCM"
                    error={errors.city?.message}
                    {...register('city')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú (tùy chọn)
                  </label>
                  <textarea
                    placeholder="Ghi chú về đơn hàng..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f] focus:border-transparent"
                    {...register('notes')}
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Sản phẩm trong đơn</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 relative flex-shrink-0 bg-white rounded-lg overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-[#ff4d4f] font-bold">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Tổng quan đơn hàng</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính ({items.length} sản phẩm)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Giảm giá</span>
                  <span className="text-green-600">- 0đ</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Tổng cộng</span>
                  <span className="text-[#ff4d4f]">{formatPrice(grandTotal)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Đã bao gồm VAT</p>
              </div>

              <Button
                onClick={handleSubmit(onSubmit)}
                className="w-full"
                size="lg"
              >
                Đặt hàng
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Bằng việc đặt hàng, bạn đồng ý với{' '}
                <a href="#" className="text-[#ff4d4f] hover:underline">
                  Điều khoản dịch vụ
                </a>{' '}
                của PhoneStore
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4d4f]"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
