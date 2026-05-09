import React, { useState, useEffect } from 'react';
import Button from './Button';

const AdminDashboard = ({ onBack, user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetch('/api/data.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setStats({
          totalProducts: data.length,
          totalOrders: 156,
          totalRevenue: 1560000000,
          totalUsers: 89
        });
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-red-500">PhoneStore Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Xin chào, {user?.name || 'Admin'}</p>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
          >
            Quản lý sản phẩm
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
          >
            Quản lý đơn hàng
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
          >
            Quản lý người dùng
          </button>
        </nav>
        <div className="p-4 border-t mt-auto">
          <button
            onClick={onBack}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg transition-colors"
          >
            ← Quay lại website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Tổng sản phẩm</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Tổng đơn hàng</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Tổng doanh thu</p>
                    <p className="text-3xl font-bold mt-1">{(stats.totalRevenue / 1000000).toFixed(0)}M</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Tổng người dùng</p>
                    <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
              <Button variant="danger" className="!bg-green-500 hover:!bg-green-600">
                + Thêm sản phẩm mới
              </Button>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Hình ảnh</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tên sản phẩm</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Thương hiệu</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Giá</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img 
                          src={product.image || "https://placehold.co/60x60"} 
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{product.brand}</td>
                      <td className="px-4 py-3 text-sm font-bold text-red-500">
                        {product.price?.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-500 hover:text-blue-700 text-sm">Sửa</button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h2>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <p>Danh sách đơn hàng đang được cập nhật...</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <p>Danh sách người dùng đang được cập nhật...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
