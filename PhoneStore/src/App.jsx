import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import AuthModal from './components/AuthModal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [currentRoute, setCurrentRoute] = useState('home'); // 'home' | 'cart' | 'checkout' | 'detail'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from local API
    fetch('/api/data.json')
      .then(response => response.json())
      .then(data => {
        // Có thể format lại data ở đây nếu cần (vd thêm discountLabel)
        const formattedData = data.slice(0, 8).map(item => {
          let discountLabel = null;
          if (item.oldPrice && item.price < item.oldPrice) {
            const percent = Math.round((1 - item.price / item.oldPrice) * 100);
            discountLabel = `Giảm ${percent}%`;
          }
          return {
            ...item,
            // Format format tiền tệ nếu ở API trả về số
            price: item.price.toLocaleString('vi-VN'),
            oldPrice: item.oldPrice ? item.oldPrice.toLocaleString('vi-VN') : null,
            discountLabel
          };
        });
        setProducts(formattedData);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const openAuth = (view = 'login') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setCurrentRoute('detail');
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setCurrentRoute('checkout');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans flex flex-col">
      <Header 
        onOpenLogin={() => openAuth('login')} 
        onOpenRegister={() => openAuth('register')} 
        onOpenCart={() => setCurrentRoute('cart')}
        onGoHome={() => setCurrentRoute('home')}
      />

      {currentRoute === 'home' && (
        <main className="flex-grow container mx-auto px-4 max-w-6xl py-6">
          <section className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <img 
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/slidingmobanmacneo.png"
              alt="Banner Macbook Neo" 
              className="w-full h-auto object-cover md:h-[400px]"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">Điện thoại hot</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetail={() => handleOpenDetail(product)} 
                />
              ))}
            </div>
          </section>
        </main>
      )}

      {currentRoute === 'cart' && (
        <Cart onCheckout={() => setCurrentRoute('checkout')} />
      )}

      {currentRoute === 'checkout' && (
        <Checkout 
          onBackToCart={() => setCurrentRoute('cart')} 
          product={selectedProduct} 
        />
      )}

      {currentRoute === 'detail' && (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setCurrentRoute('home')} 
          onBuyNow={() => handleBuyNow(selectedProduct)}
        />
      )}

      <Footer />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialView={authView} 
      />
    </div>
  );
}

export default App;