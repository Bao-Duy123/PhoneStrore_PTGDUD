'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge, Modal } from '@/components/ui';
import { products, getProductById } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      toast.success('Đã xóa sản phẩm');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-5 h-5" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sản phẩm
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Thương hiệu
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Giá
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tồn kho
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="default">{product.brand}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#ff4d4f]">
                        {formatPrice(product.price)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-medium ${
                          product.stock > 10
                            ? 'text-green-600'
                            : product.stock > 0
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || !!editingProduct}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
        size="xl"
      >
        <form className="space-y-4">
          <Input label="Tên sản phẩm" placeholder="Nhập tên sản phẩm" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Giá" type="number" placeholder="0" />
            <Input label="Giá cũ (nếu có)" type="number" placeholder="0" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thương hiệu</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4f]">
                <option value="">Chọn thương hiệu</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Oppo">Oppo</option>
                <option value="Google">Google</option>
              </select>
            </div>
            <Input label="Tồn kho" type="number" placeholder="0" />
          </div>
          <Input label="URL hình ảnh" placeholder="https://..." />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }}
            >
              Hủy
            </Button>
            <Button type="submit">
              {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
