'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PhoneStore</h3>
            <p className="text-gray-400 text-sm">
              Cửa hàng điện thoại uy tín hàng đầu Việt Nam. Cam kết 100% sản phẩm chính hãng.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Trang chủ</Link></li>
              <li><Link href="/?brand=Apple" className="hover:text-white">iPhone</Link></li>
              <li><Link href="/?brand=Samsung" className="hover:text-white">Samsung</Link></li>
              <li><Link href="/?brand=Xiaomi" className="hover:text-white">Xiaomi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Hotline: 1900 1234</li>
              <li>Email: contact@phonestore.vn</li>
              <li>Địa chỉ: 123 Điện thoại, TP.HCM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2024 PhoneStore. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
