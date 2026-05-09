import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] border-t border-gray-200 mt-12 py-10">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-black mb-2">PhoneStore</h2>
          <p className="text-gray-700 text-sm">
            Cửa hàng điện thoại uy tín số 1<br/>Việt Nam.
          </p>
        </div>

        {/* Danh mục */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Danh mục</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-[#ff4d4f]">iPhone</a></li>
            <li><a href="#" className="hover:text-[#ff4d4f]">Samsung</a></li>
            <li><a href="#" className="hover:text-[#ff4d4f]">Xiaomi</a></li>
          </ul>
        </div>

        {/* Hỗ trợ */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Hỗ trợ</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-[#ff4d4f]">• Bảo hành</a></li>
            <li><a href="#" className="hover:text-[#ff4d4f]">• Đổi trả</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• 1800 6601</li>
            <li>• contact@phonestore.vn</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-10 text-center text-sm text-gray-500">
        © 2026 PhoneStore. Thiết kế bởi Duy.
      </div>
    </footer>
  );
};

export default Footer;