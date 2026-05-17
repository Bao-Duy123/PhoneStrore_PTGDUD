import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, User, Shield, Mail, Phone } from 'lucide-react';
import { Header } from '@/components/layout';
import { Card, Badge } from '@/components/ui';
import { useAuth } from '@/hooks';
import { usersApi } from '@/services/api';
import { User as UserType } from '@/types';

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    usersApi.getUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin" className="p-2 hover:bg-gray-200 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </Card>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <Card key={user.id}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{user.name}</span>
                    {user.role === 'admin' && (
                      <Badge variant="info">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <div className="text-center py-8 text-gray-500">
              Không tìm thấy người dùng nào
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
