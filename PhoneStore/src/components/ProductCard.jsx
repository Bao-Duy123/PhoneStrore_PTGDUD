import React from 'react';
import Button from './Button';

const ProductCard = ({ product, onViewDetail }) => {
  return (
    <div 
      onClick={onViewDetail}
      className="bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow p-3 relative flex flex-col h-full border border-gray-100 group"
    >
      {/* Label giảm giá */}
      {product.discountLabel && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          {product.discountLabel}
        </span>
      )}
      
      {/* Hình ảnh sản phẩm (Placeholder) */}
      <div className="w-full aspect-[4/5] bg-gray-50 rounded-lg mb-4 flex items-center justify-center p-2 mt-4 overflow-hidden">
        <img 
          src={product.image || "https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-256-gb.png"} 
          alt={product.name} 
          className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-[1.2]"
        />
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-1 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-red-500 font-bold text-base">{product.price}đ</span>
            {product.oldPrice && (
              <span className="text-gray-400 text-xs line-through mb-0.5">{product.oldPrice}đ</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto relative z-20">
          <Button 
            onClick={(e) => {
              e.stopPropagation(); // Không cho sự kiện click lan ra component Card bọc ở ngoài
              onViewDetail();
            }} 
            variant="primary" 
            className="text-xs"
          >
            Xem chi tiết
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
            }} 
            variant="danger" 
            className="text-xs !bg-[#ff4d4f] hover:!bg-red-500"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;