import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">PhoneStore</h3>
            <p className="text-gray-400 text-sm">
              Cửa hàng điện thoại uy tín, chất lượng với giá cả hợp lý nhất thị trường.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Trang chủ</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Sản phẩm</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Giỏ hàng</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition">Thanh toán</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Danh mục</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products?brand=Apple" className="hover:text-white transition">Apple</Link></li>
              <li><Link to="/products?brand=Samsung" className="hover:text-white transition">Samsung</Link></li>
              <li><Link to="/products?brand=Xiaomi" className="hover:text-white transition">Xiaomi</Link></li>
              <li><Link to="/products?brand=Oppo" className="hover:text-white transition">Oppo</Link></li>
              <li><Link to="/products?brand=Google" className="hover:text-white transition">Google</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 123 Đường ABC, TP.HCM</li>
              <li>📞 0909 123 456</li>
              <li>✉️ contact@phonestore.vn</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 PhoneStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
