'use client';

import { useState } from 'react';
import { TrendingUp, ShoppingCart, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [stats] = useState({
    totalRevenue: 156780000,
    totalOrders: 127,
    totalUsers: 89,
    totalProducts: products.length,
    ordersChange: 12.5,
    revenueChange: 8.2,
  });

  const recentOrders = [
    { id: 'DH001', customer: 'Nguyễn Văn A', total: 29990000, status: 'pending' },
    { id: 'DH002', customer: 'Trần Thị B', total: 8290000, status: 'confirmed' },
    { id: 'DH003', customer: 'Lê Văn C', total: 16990000, status: 'shipping' },
    { id: 'DH004', customer: 'Phạm Thị D', total: 13490000, status: 'delivered' },
    { id: 'DH005', customer: 'Hoàng Văn E', total: 24990000, status: 'pending' },
  ];

  const topProducts = products.slice(0, 5).map((p, index) => ({
    ...p,
    sold: Math.floor(Math.random() * 50) + 10,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Chào mừng đến với trang quản trị</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Doanh thu</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.totalRevenue)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+{stats.revenueChange}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Đơn hàng</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+{stats.ordersChange}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Người dùng</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">-2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Sản phẩm</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Mới</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatPrice(order.total)}</p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'shipping'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status === 'pending'
                        ? 'Chờ xác nhận'
                        : order.status === 'confirmed'
                        ? 'Đã xác nhận'
                        : order.status === 'shipping'
                        ? 'Đang giao'
                        : 'Đã giao'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="w-6 h-6 bg-[#ff4d4f] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.sold} đã bán</p>
                    <p className="text-sm text-green-600">
                      {formatPrice(product.price * product.sold)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
