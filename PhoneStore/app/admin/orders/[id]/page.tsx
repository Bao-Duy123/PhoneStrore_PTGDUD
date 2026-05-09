'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Package, Check, Truck, Clock, X, FileText } from 'lucide-react';
import { Button, Badge, Card, CardContent } from '@/components/ui';
import { formatPrice, formatDate } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';
import { orderService } from '@/services/orderService';
import { toast } from 'sonner';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: 'Chờ xác nhận',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <Clock className="w-5 h-5" />,
  },
  confirmed: {
    label: 'Đã xác nhận',
    color: 'bg-blue-100 text-blue-800',
    icon: <Check className="w-5 h-5" />,
  },
  shipping: {
    label: 'Đang giao',
    color: 'bg-purple-100 text-purple-800',
    icon: <Truck className="w-5 h-5" />,
  },
  delivered: {
    label: 'Đã giao',
    color: 'bg-green-100 text-green-800',
    icon: <Package className="w-5 h-5" />,
  },
  cancelled: {
    label: 'Đã hủy',
    color: 'bg-red-100 text-red-800',
    icon: <X className="w-5 h-5" />,
  },
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrder = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrder(parseInt(orderId));
      if (data) {
        setOrder(data);
      } else {
        setError('Không tìm thấy đơn hàng');
      }
    } catch {
      setError('Đã xảy ra lỗi khi tải đơn hàng');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    setIsUpdating(true);
    try {
      await orderService.updateOrderStatus(parseInt(orderId), newStatus);
      toast.success('Cập nhật trạng thái thành công');
      fetchOrder();
    } catch {
      toast.error('Cập nhật trạng thái thất bại');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {error || 'Không tìm thấy đơn hàng'}
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

  const currentStatus = statusConfig[order.status];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
              <p className="text-gray-500">Mã đơn: {order.orderId}</p>
            </div>
          </div>
          <Badge className={currentStatus.color}>
            <span className="flex items-center gap-1">
              {currentStatus.icon}
              {currentStatus.label}
            </span>
          </Badge>
        </div>

        {/* Order Info */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Ngày đặt</p>
                <p className="font-medium">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Khách hàng</p>
                <p className="font-medium">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Số điện thoại</p>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                <p className="font-bold text-[#ff4d4f] text-lg">
                  {formatPrice(order.totalAmount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-4">Sản phẩm đã đặt</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-16 h-16 relative bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#ff4d4f]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-600">Tổng cộng</span>
              <span className="font-bold text-[#ff4d4f] text-xl">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-4">Địa chỉ giao hàng</h2>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#ff4d4f]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-[#ff4d4f]" />
              </div>
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-gray-500">{order.phone}</p>
                <p className="text-gray-600 mt-1">{order.shippingAddress}</p>
              </div>
            </div>
            {order.notes && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Ghi chú: {order.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-bold text-lg mb-4">Cập nhật trạng thái</h2>
            <div className="flex flex-wrap gap-2">
              {order.status === 'pending' && (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateStatus('confirmed')}
                    isLoading={isUpdating}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Xác nhận đơn
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleUpdateStatus('cancelled')}
                    isLoading={isUpdating}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Hủy đơn
                  </Button>
                </>
              )}
              {order.status === 'confirmed' && (
                <Button
                  size="sm"
                  onClick={() => handleUpdateStatus('shipping')}
                  isLoading={isUpdating}
                >
                  <Truck className="w-4 h-4 mr-1" />
                  Bắt đầu giao
                </Button>
              )}
              {order.status === 'shipping' && (
                <Button
                  size="sm"
                  onClick={() => handleUpdateStatus('delivered')}
                  isLoading={isUpdating}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Đã giao hàng
                </Button>
              )}
              {(order.status === 'delivered' || order.status === 'cancelled') && (
                <p className="text-gray-500">Đơn hàng đã hoàn tất</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
