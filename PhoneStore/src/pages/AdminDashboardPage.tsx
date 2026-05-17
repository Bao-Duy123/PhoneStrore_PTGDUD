import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Header } from '@/components/layout';
import { Badge, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useAuth, useProducts, useOrders } from '@/hooks';
import { formatPrice } from '@/lib/utils';
import { ordersApi, usersApi } from '@/services/api';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { items: products } = useProducts();
  const { adminOrders } = useOrders();
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    usersApi.getUserStats().then(stats => setTotalUsers(stats.total));
  }, []);

  const stats = useMemo(() => {
    return {
      totalOrders: adminOrders.length,
      totalRevenue: adminOrders.reduce((sum, o) => sum + o.total, 0),
      pendingOrders: adminOrders.filter(o => o.status === 'pending').length,
      processingOrders: adminOrders.filter(o => o.status === 'processing').length,
      deliveredOrders: adminOrders.filter(o => o.status === 'delivered').length,
      cancelledOrders: adminOrders.filter(o => o.status === 'cancelled').length,
    };
  }, [adminOrders]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 max-w-6xl py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng doanh thu</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng đơn hàng</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Đã giao</p>
                <p className="text-xl font-bold text-gray-900">{stats.deliveredOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Đang xử lý</p>
                <p className="text-xl font-bold text-gray-900">{stats.processingOrders}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/products"
            className="bg-white rounded-xl p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Quản lý sản phẩm</p>
                <p className="text-sm text-gray-500">{products.length} sản phẩm</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-xl p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Quản lý đơn hàng</p>
                <p className="text-sm text-gray-500">{adminOrders.length} đơn hàng</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white rounded-xl p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Quản lý người dùng</p>
                <p className="text-sm text-gray-500">{stats.totalUsers} người dùng</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            {adminOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Chưa có đơn hàng nào</p>
            ) : (
              <div className="space-y-4">
                {adminOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">#{order.id} - {order.customerName}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(order.total)}</p>
                      <Badge
                        variant={
                          order.status === 'delivered' ? 'success' :
                          order.status === 'cancelled' ? 'danger' :
                          order.status === 'processing' ? 'info' :
                          'warning'
                        }
                      >
                        {order.status === 'pending' ? 'Chờ xác nhận' :
                         order.status === 'processing' ? 'Đang xử lý' :
                         order.status === 'shipped' ? 'Đang giao' :
                         order.status === 'delivered' ? 'Đã giao' : 'Đã hủy'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/admin/orders"
              className="block text-center text-primary hover:underline mt-4"
            >
              Xem tất cả đơn hàng
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
