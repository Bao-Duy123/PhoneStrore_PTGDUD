import React from 'react';
import Button from './Button';

const Checkout = ({ onBackToCart, product }) => {
  // Nếu có product truyền vào từ trang chi tiết, lấy nó. Ngược lại dùng mock như cũ.
  const checkoutItem = product || {
    name: "iPhone 17 pro 256 GB | Cam vũ trụ",
    price: "34.690.000",
    oldPrice: "34.690.000",
    image: "https://placehold.co/100x100/ea580c/white?text=iPhone"
  };

  const displayImage = checkoutItem.image || "https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-256-gb.png";

  return (
    <main className="flex-grow container mx-auto px-4 max-w-6xl py-6 text-black">
      <button 
        onClick={onBackToCart}
        className="text-black font-extrabold mb-6 hover:underline flex items-center gap-2 text-lg"
      >
        &lt; Quay lại
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cột trái: Thông tin */}
        <div className="flex-1 space-y-6">
          
          {/* Block 1: Sản phẩm trong đơn */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-black">Sản phẩm trong đơn (1)</h3>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <input type="checkbox" readOnly checked className="w-5 h-5 border-2 border-gray-300 rounded text-red-600 focus:ring-red-500 cursor-pointer shrink-0" />
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg p-2 shrink-0 flex items-center justify-center">
                  <img src={displayImage} alt={checkoutItem.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm md:text-base leading-snug">{checkoutItem.name}</h4>
                </div>
              </div>
              <div className="text-gray-500 font-bold px-4 text-sm hidden sm:block">x1</div>
              <div className="text-right sm:w-[120px] shrink-0">
                <div className="text-red-600 font-bold md:text-base text-sm">{checkoutItem.price}đ</div>
                {checkoutItem.oldPrice && (
                  <div className="text-gray-400 text-xs font-bold line-through mt-0.5">{checkoutItem.oldPrice}đ</div>
                )}
              </div>
            </div>
          </div>

          {/* Block 2: Thông tin khách hàng */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
              <h3 className="font-bold text-[15px] sm:text-base text-black">Thông tin khách hàng: Nguyễn Bảo Duy</h3>
              <span className="text-gray-500 font-bold text-sm">03325*****</span>
            </div>
            <div>
              <input type="email" placeholder="Email" className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-1 focus:ring-[#d00000] transition-all text-sm mb-2" />
              <p className="text-xs text-gray-500 italic font-medium">(*) Hóa đơn VAT sẽ được gửi qua email này</p>
            </div>
          </div>

          {/* Block 3: Thông tin nhận hàng */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h3 className="font-bold text-lg mb-4 text-black">Thông tin nhận hàng</h3>
             <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Họ và tên người nhận</label>
                    <input type="text" defaultValue="Nguyễn Bảo Duy" className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#d00000] text-sm font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Số điện thoại người nhận</label>
                    <input type="text" defaultValue="03325*****" className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#d00000] text-sm font-semibold" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Tỉnh/Thành Phố</label>
                    <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#d00000] text-sm bg-white font-semibold cursor-pointer">
                      <option>Hồ Chí Minh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Quận / Huyện</label>
                    <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#d00000] text-sm bg-white font-semibold cursor-pointer">
                      <option>Quận Gò Vấp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Phường / Xã</label>
                    <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#d00000] text-sm bg-white font-semibold cursor-pointer">
                      <option>Phường 10</option>
                    </select>
                  </div>
                </div>
                <div>
                   <input type="text" placeholder="Số nhà, tên đường" className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-[#d00000] text-sm font-medium" />
                </div>
             </div>
          </div>

        </div>

        {/* Cột phải: Thông tin đơn hàng */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-black">Thông tin đơn hàng</h3>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-semibold">Tổng tiền</span>
              <span className="font-bold text-black">34.990.000đ</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 font-semibold">Tổng khuyến mãi</span>
              <span className="font-bold text-black">-300.000đ</span>
            </div>
            
            <div className="border-t border-dashed border-gray-300 my-4"></div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-black text-sm">Cần thanh toán</span>
              <span className="text-red-600 font-bold text-xl">34.690.000đ</span>
            </div>

            <Button variant="danger" className="w-full !bg-[#d00000] hover:!bg-[#b00000] !py-3.5 text-base font-bold rounded-lg shadow-[0_4px_10px_rgba(208,0,0,0.3)] transition-all">
              Đặt hàng
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Checkout;