'use client';

import { useState } from 'react';
import { Search, Shield, User } from 'lucide-react';
import { Card, CardContent, Button, Badge, Modal } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { User as UserType, UserRole } from '@/types';

const mockUsers: (UserType & { password?: string })[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@phonestore.vn',
    phone: '0909123456',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0909123457',
    role: 'user',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 3,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0909123458',
    role: 'user',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0909123459',
    role: 'user',
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 5,
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0909123460',
    role: 'user',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleChangeRole = (userId: number, newRole: UserRole) => {
    console.log(`Change user ${userId} role to ${newRole}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f]"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f] bg-white"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Quản trị viên</option>
              <option value="user">Người dùng</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Người dùng
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Số điện thoại
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Vai trò
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ngày tạo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ff4d4f]/10 rounded-full flex items-center justify-center">
                          {user.role === 'admin' ? (
                            <Shield className="w-5 h-5 text-[#ff4d4f]" />
                          ) : (
                            <User className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.phone}</td>
                    <td className="px-4 py-3">
                      <Badge variant={user.role === 'admin' ? 'danger' : 'info'}>
                        {user.role === 'admin' ? 'Quản trị' : 'Người dùng'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user)}
                        >
                          Chi tiết
                        </Button>
                        {user.role === 'user' && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleChangeRole(user.id, 'admin')}
                          >
                            Nâng cấp
                          </Button>
                        )}
                        {user.role === 'admin' && user.id !== 1 && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleChangeRole(user.id, 'user')}
                          >
                            Hạ cấp
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy người dùng nào</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Detail Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Chi tiết người dùng"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-[#ff4d4f]/10 rounded-full flex items-center justify-center">
                {selectedUser.role === 'admin' ? (
                  <Shield className="w-8 h-8 text-[#ff4d4f]" />
                ) : (
                  <User className="w-8 h-8 text-gray-600" />
                )}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{selectedUser.name}</p>
                <Badge variant={selectedUser.role === 'admin' ? 'danger' : 'info'}>
                  {selectedUser.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{selectedUser.email}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Số điện thoại</span>
                <span className="font-medium">{selectedUser.phone}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Ngày tạo</span>
                <span className="font-medium">{formatDate(selectedUser.createdAt)}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Cập nhật lần cuối</span>
                <span className="font-medium">{formatDate(selectedUser.updatedAt)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Đóng
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
