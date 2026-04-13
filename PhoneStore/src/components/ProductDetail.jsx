import React from 'react';
import Button from './Button';

const ProductDetail = ({ product, onBack, onBuyNow }) => {
  // Cập nhật để hỗ trợ fallback image nếu product không có
  const p = product || {
    name: "iPhone 17 Pro 256GB | Chính hãng",
    price: "34.690.000",
  };
  
  const displayImage = p.image || "https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-256-gb.png";

  return (
    <main className="flex-grow container mx-auto px-4 max-w-6xl py-10 text-black">
      {/* Nút quay lại */}
      <button 
        onClick={onBack} 
        className="text-black font-extrabold mb-6 hover:underline flex items-center gap-2 text-lg"
      >
        &lt; Quay lại
      </button>

      {/* Box chính hiển thị thông tin mồi */}
      <div className="bg-[#f8f9fa] rounded-2xl p-6 md:p-12 flex flex-col md:flex-row gap-10 items-center justify-center">
        
        {/* Khối bên trái: Hình ảnh */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-md flex justify-center items-center h-auto aspect-square overflow-hidden shadow-sm">
            <img 
              src={displayImage} 
              alt={p.name} 
              className="w-full h-full object-contain hover:scale-110 transition-transform duration-500" 
            />
          </div>
        </div>

        {/* Khối bên phải: Giá và nút bấm */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl md:text-[28px] font-extrabold text-black mb-8 md:mb-12 leading-snug">
            {p.name}
          </h1>
          
          <div className="text-2xl md:text-3xl font-extrabold text-red-600 mb-8 flex justify-center md:justify-start">
            {p.price}đ
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onBuyNow} 
              variant="danger" 
              className="flex-1 !bg-[#d00000] hover:!bg-[#b00000] !py-3.5 text-lg font-bold rounded-lg shadow-md transition-all"
            >
              Mua ngay
            </Button>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#d00000] text-[#d00000] bg-white rounded-lg hover:bg-red-50 font-bold transition-all text-lg shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v6m-3-3h6"></path>
              </svg>
              Thêm vào giỏ
            </button>
          </div>
        </div>

      </div>

      {/* Không gian mở rộng cho thông tin tương lai */}
      <div className="mt-12 bg-white rounded-xl border border-gray-200 p-8 min-h-[400px]">
        <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-4 mb-6">
          Thông tin sản phẩm chi tiết
        </h3>
        <div className="flex flex-col items-center justify-center h-48 text-gray-400 space-y-2">
          <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          <p className="italic text-center">... Không gian này được dành riêng để thiết kế hình ảnh kỹ thuật, bài mô tả dài và cấu hình chi tiết thiết bị trong tương lai ...</p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;