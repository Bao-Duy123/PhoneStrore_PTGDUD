import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Minus, Plus, Trash2, MapPin, Phone, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header, Footer } from '@/components/layout';
import { CartSidebar } from '@/components/features';
import { Button, Input } from '@/components/ui';
import { useCart, useAuth, useOrders } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

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

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { createOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để thanh toán');
      navigate('/login?redirect=/checkout');
    }
  }, [isAuthenticated, navigate]);

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

  const shippingFee = 0;
  const grandTotal = total + shippingFee;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    setIsProcessing(true);
    try {
      await createOrder(
        {
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
        },
        items.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price,
        })),
        grandTotal
      );
      clearCart();
      toast.success('Đặt hàng thành công!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Đặt hàng thất bại');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 max-w-6xl py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-primary">
            <ChevronLeft className="w-4 h-4" />
            Quay lại
          </button>
          <span>/</span>
          <span className="text-gray-700">Thanh toán</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h1>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            <Button onClick={() => navigate('/products')}>Tiếp tục mua sắm</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
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
                    label="Email"
                    type="email"
                    placeholder="Nhập email"
                    className="md:col-span-2"
                    error={errors.customerEmail?.message}
                    {...register('customerEmail')}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Địa chỉ giao hàng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Địa chỉ (số nhà, đường) *"
                    placeholder="Ví dụ: 123 Nguyễn Trãi"
                    className="md:col-span-2"
                    error={errors.street?.message}
                    {...register('street')}
                  />
                  <Input
                    label="Phường/Xã *"
                    placeholder="Ví dụ: Phường 1"
                    error={errors.ward?.message}
                    {...register('ward')}
                  />
                  <Input
                    label="Quận/Huyện *"
                    placeholder="Ví dụ: Quận 1"
                    error={errors.district?.message}
                    {...register('district')}
                  />
                  <Input
                    label="Tỉnh/Thành phố *"
                    placeholder="Ví dụ: TP Hồ Chí Minh"
                    error={errors.city?.message}
                    {...register('city')}
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">Ghi chú đơn hàng</h2>
                <textarea
                  {...register('notes')}
                  placeholder="Nhập ghi chú (tùy chọn)..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Đơn hàng của bạn</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain bg-gray-50 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí ship</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleSubmit(onSubmit)}
                  isLoading={isProcessing}
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <CartSidebar />
    </div>
  );
}
