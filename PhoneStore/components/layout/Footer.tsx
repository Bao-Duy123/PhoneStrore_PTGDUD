import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">PhoneStore</h3>
            <p className="text-sm text-gray-400 mb-4">
              Cửa hàng điện thoại uy tín hàng đầu Việt Nam. Cam kết 100% sản phẩm chính hãng với
              chế độ bảo hành tốt nhất.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#ff4d4f] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#ff4d4f] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#ff4d4f] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Danh mục</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?brand=Apple" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  iPhone
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Samsung" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Samsung
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Xiaomi" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Xiaomi
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Oppo" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Oppo
                </Link>
              </li>
              <li>
                <Link href="/products?brand=Google" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Google Pixel
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#ff4d4f] transition-colors text-sm">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Điện Biên Phủ, Quận 3, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">1900 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">contact@phonestore.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PhoneStore. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
