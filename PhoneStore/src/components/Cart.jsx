import React from 'react';
import Button from './Button';

const mockCartItems = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra | Cam vũ trụ",
    price: 34690000,
    oldPrice: 34690000,
    image: "https://placehold.co/100x100/ea580c/white?text=S24",
    quantity: 1,
    checked: false
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra | Cam vũ trụ",
    price: 34690000,
    oldPrice: 34690000,
    image: "https://placehold.co/100x100/ea580c/white?text=S24",
    quantity: 1,
    checked: false
  }
];

const Cart = ({ onCheckout }) => {
  return (
    <main className="flex-grow container mx-auto px-4 max-w-6xl py-10">
      <h2 className="text-3xl font-extrabold text-black tracking-tight mb-8">Giỏ hàng của bạn</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cột trái: Danh sách sản phẩm */}
        <div className="flex-1 space-y-4">
          {/* Header: Chọn tất cả */}
          <div className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded text-red-600 focus:ring-red-500 cursor-pointer" />
              <span className="font-bold text-gray-800 text-sm">Chọn tất cả (0)</span>
            </label>
            <button className="text-gray-300 hover:text-red-500 transition-colors p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>

          {/* Các Item */}
          {mockCartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm border border-gray-100 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-4 min-w-[200px] flex-1">
                <input type="checkbox" checked={item.checked} readOnly className="w-5 h-5 border-2 border-gray-300 rounded text-red-600 focus:ring-red-500 cursor-pointer shrink-0" />
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-gray-200 rounded-lg p-2 shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm md:text-base leading-snug">{item.name}</h4>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 mt-2 sm:mt-0">
                <div className="text-right sm:w-[120px]">
                  <div className="text-red-600 font-bold md:text-base text-sm">{item.price.toLocaleString('vi-VN')}đ</div>
                  <div className="text-gray-400 text-xs font-semibold line-through">{item.oldPrice.toLocaleString('vi-VN')}đ</div>
                </div>
                
                <div className="flex items-center border border-gray-300 rounded-md shrink-0 h-8">
                  <button className="w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-medium">-</button>
                  <input type="text" value={item.quantity} readOnly className="w-10 text-center border-x border-gray-300 text-sm font-medium bg-gray-50 select-none h-full outline-none" />
                  <button className="w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors font-medium">+</button>
                </div>

                <button className="text-gray-300 hover:text-red-500 transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cột phải: Thông tin đơn hàng */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
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

            <Button onClick={onCheckout} variant="danger" className="w-full !bg-[#d00000] hover:!bg-[#b00000] !py-3.5 text-base font-bold rounded-lg shadow-[0_4px_10px_rgba(208,0,0,0.3)] transition-all">
              Thanh toán
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Cart;