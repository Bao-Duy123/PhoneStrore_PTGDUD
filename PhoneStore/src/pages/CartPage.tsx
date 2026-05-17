import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Trash2, ShoppingBag, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Header, Footer } from '@/components/layout';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();

  // Filter valid items only
  const validItems = items.filter(item => item?.product != null);

  // State for selected items
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(validItems.map(item => item.product!.id))
  );

  // Calculate totals for selected items
  const selectedTotal = useMemo(() => {
    return validItems
      .filter(item => selectedIds.has(item.product!.id))
      .reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
      }, 0);
  }, [validItems, selectedIds]);

  // Count selected items
  const selectedCount = validItems.filter(item => selectedIds.has(item.product!.id)).length;

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(validItems.map(item => item.product!.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  // Handle individual item selection
  const handleSelectItem = (productId: number, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedIds(newSelected);
  };

  // Check if all items are selected
  const isAllSelected = validItems.length > 0 && selectedIds.size === validItems.length;

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(productId);
      return newSelected;
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(productId, quantity);
  };

  if (validItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 max-w-6xl py-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
            Giỏ hàng của bạn
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">Giỏ hàng trống</p>
            <p className="text-gray-400 text-sm mt-2">Hãy thêm sản phẩm vào giỏ hàng</p>
            <Link to="/products">
              <Button className="mt-6">Tiếp tục mua sắm</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 max-w-6xl py-10">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
          Giỏ hàng của bạn
        </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column: Product List */}
        <div className="flex-1 space-y-4">
          {/* Header: Select All */}
          <div className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-5 h-5 border-2 border-gray-300 rounded text-red-600 focus:ring-red-500 cursor-pointer accent-red-600"
              />
              <span className="font-bold text-gray-800 text-sm">
                Chọn tất cả ({selectedCount}/{validItems.length})
              </span>
            </label>
            <button
              onClick={() => clearCart()}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 flex items-center gap-1 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa tất cả</span>
            </button>
          </div>

          {/* Items */}
          {validItems.map((item) => {
            if (!item.product) return null;
            const isSelected = selectedIds.has(item.product.id);
            
            return (
              <div
                key={item.product.id}
                className={`bg-white p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm border-2 transition-all ${
                  isSelected ? 'border-gray-100' : 'border-transparent opacity-60'
                } flex-wrap sm:flex-nowrap`}
              >
                <div className="flex items-center gap-4 min-w-[200px] flex-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => handleSelectItem(item.product!.id, e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded text-red-600 focus:ring-red-500 cursor-pointer shrink-0 accent-red-600"
                  />
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-gray-200 rounded-lg p-2 shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/products/${item.product.id}`}
                      className={`font-bold text-sm md:text-base leading-snug hover:text-primary transition-colors ${
                        isSelected ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{item.product.brand}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 mt-2 sm:mt-0">
                  <div className="text-right sm:w-[120px]">
                    <div className={`font-bold md:text-base text-sm ${
                      isSelected ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {formatPrice(item.product.price)}
                    </div>
                    {item.product.oldPrice && item.product.oldPrice > item.product.price && (
                      <div className="text-gray-400 text-xs font-semibold line-through">
                        {formatPrice(item.product.oldPrice)}
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-md shrink-0 h-8">
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center border-x border-gray-300 text-sm font-medium bg-gray-50 select-none h-full outline-none"
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-medium"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <Link
                    to={`/products/${item.product.id}`}
                    className="text-gray-300 hover:text-primary transition-colors px-2 py-1 border border-gray-300 rounded hover:border-primary"
                    title="Xem chi tiết"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Thông tin đơn hàng</h3>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-semibold">
                Tổng tiền ({selectedCount} sản phẩm)
              </span>
              <span className="font-bold text-gray-900">
                {formatPrice(selectedTotal)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-semibold">Tổng khuyến mãi</span>
              <span className="font-bold text-green-600">- 0đ</span>
            </div>

            <div className="border-t border-dashed border-gray-300 my-4"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-900 text-sm">Cần thanh toán</span>
              <span className="text-red-600 font-bold text-xl">
                {formatPrice(selectedTotal)}
              </span>
            </div>

            <Link to="/checkout">
              <Button
                className={`w-full py-3.5 text-base font-bold rounded-lg transition-all ${
                  selectedCount > 0
                    ? 'bg-red-600 hover:bg-red-700 shadow-[0_4px_10px_rgba(208,0,0,0.3)]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={selectedCount === 0}
              >
                Thanh toán
              </Button>
            </Link>

            <Link
              to="/products"
              className="flex items-center justify-center gap-2 text-gray-500 hover:text-primary transition-colors py-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Tiếp tục mua sắm
            </Link>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
