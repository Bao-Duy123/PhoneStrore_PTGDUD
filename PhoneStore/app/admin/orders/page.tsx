'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Eye, Check, X, RefreshCw } from 'lucide-react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { formatPrice, formatDate, getStatusColor } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';
import { orderService } from '@/services/orderService';
import { toast } from 'sonner';

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Không thể tải danh sách đơn hàng');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      toast.success('Cập nhật trạng thái thành công');
      loadOrders();
    } catch (error) {
      toast.error('Cập nhật trạng thái thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <Button variant="outline" size="sm" onClick={loadOrders} className="gap-1">
          <RefreshCw className="w-4 h-4" />
          Làm mới
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã đơn, tên, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f] bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="shipping">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">Đang tải...</p>
            </CardContent>
          </Card>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-4">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">{order.orderId}</p>
                    <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {statusLabels[order.status]}
                  </Badge>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
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
                          {formatPrice(item.price)} x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <div>
                    <p className="text-gray-500">Khách hàng</p>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Địa chỉ</p>
                    <p className="font-medium truncate">{order.shippingAddress}</p>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-end mb-4">
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Tổng tiền</p>
                    <p className="font-bold text-[#ff4d4f] text-xl">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </Button>
                  {order.status === 'pending' && (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                      >
                        <Check className="w-4 h-4" />
                        Xác nhận
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                      >
                        <X className="w-4 h-4" />
                        Hủy
                      </Button>
                    </>
                  )}
                  {order.status === 'confirmed' && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleUpdateStatus(order.id, 'shipping')}
                    >
                      Giao hàng
                    </Button>
                  )}
                  {order.status === 'shipping' && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                    >
                      Đã giao
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
