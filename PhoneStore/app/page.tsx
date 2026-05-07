'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col">
      <Header onOpenCart={() => setShowCart(true)} />

      <main className="flex-grow container mx-auto px-4 max-w-6xl py-6">
        {/* Banner */}
        <section className="mb-8 rounded-xl overflow-hidden shadow-sm">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/slidingmobanmacneo.png"
              alt="Banner Macbook"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-2xl font-bold text-black mb-4">Điện thoại hot</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Detail Modal */}
      {showDetail && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="relative w-full aspect-square bg-gray-50 rounded-xl p-4">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <button
                    onClick={() => setShowDetail(false)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <span className="text-xs text-gray-500 uppercase font-medium">{selectedProduct.brand}</span>
                  <h2 className="text-2xl font-bold text-black mt-1 mb-4">{selectedProduct.name}</h2>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-red-500">
                      {selectedProduct.price.toLocaleString('vi-VN')}đ
                    </span>
                    {selectedProduct.oldPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        {selectedProduct.oldPrice.toLocaleString('vi-VN')}đ
                      </span>
                    )}
                  </div>

                  {selectedProduct.discountLabel && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium mb-6">
                      {selectedProduct.discountLabel}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button className="flex-1 bg-[#ff4d4f] hover:bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                      Thêm vào giỏ hàng
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Giỏ hàng</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center py-12 text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>Giỏ hàng trống</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
