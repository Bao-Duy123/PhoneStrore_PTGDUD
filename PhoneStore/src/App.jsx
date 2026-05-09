import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import AuthModal from './components/AuthModal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [currentRoute, setCurrentRoute] = useState('home'); // 'home' | 'cart' | 'checkout' | 'detail' | 'admin'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Lưu tất cả sản phẩm gốc
  // State cho user đăng nhập
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State cho giỏ hàng
  const [cartItems, setCartItems] = useState([]);
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Load user và giỏ hàng từ localStorage khi app mount
  useEffect(() => {
    const savedUser = localStorage.getItem('phonestore_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('phonestore_user');
      }
    }

    const savedCart = localStorage.getItem('phonestore_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        localStorage.removeItem('phonestore_cart');
      }
    }
  }, []);

  // Hàm thêm vào giỏ hàng
  const addToCart = (product) => {
    const productForCart = {
      id: product.id,
      name: product.name,
      price: product.priceRaw || product.price,
      oldPrice: product.oldPriceRaw || product.oldPrice,
      image: product.image,
      quantity: 1,
      checked: true
    };

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const updated = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem('phonestore_cart', JSON.stringify(updated));
        return updated;
      }
      const updated = [...prev, productForCart];
      localStorage.setItem('phonestore_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // Hàm xóa khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== productId);
      localStorage.setItem('phonestore_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // Hàm cập nhật số lượng
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('phonestore_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // Hàm xóa tất cả giỏ hàng
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('phonestore_cart');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('phonestore_user', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('phonestore_user');
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setAuthView('login');
      setIsAuthOpen(true);
    } else {
      setCurrentRoute('checkout');
    }
  };

  // Mua ngay - chỉ mua 1 sản phẩm
  const handleBuyNow = (product) => {
    const productForCart = {
      id: product.id,
      name: product.name,
      price: product.priceRaw || product.price,
      oldPrice: product.oldPriceRaw || product.oldPrice,
      image: product.image,
      quantity: 1,
      checked: true
    };
    setCartItems([productForCart]);
    localStorage.setItem('phonestore_cart', JSON.stringify([productForCart]));

    if (!isLoggedIn) {
      setAuthView('login');
      setIsAuthOpen(true);
    } else {
      setCurrentRoute('checkout');
    }
  };

  useEffect(() => {
    // Fetch data from local API
    fetch('/api/data.json')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => {
          let discountLabel = null;
          if (item.oldPrice && item.price < item.oldPrice) {
            const percent = Math.round((1 - item.price / item.oldPrice) * 100);
            discountLabel = `Giảm ${percent}%`;
          }
          return {
            ...item,
            // Giữ lại priceRaw để tính toán, chỉ format khi hiển thị
            priceRaw: item.price,
            oldPriceRaw: item.oldPrice,
            price: item.price.toLocaleString('vi-VN'),
            oldPrice: item.oldPrice ? item.oldPrice.toLocaleString('vi-VN') : null,
            discountLabel
          };
        });
        setAllProducts(formattedData);
        setProducts(formattedData.slice(0, 8)); // Hiển thị 8 sản phẩm đầu tiên
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Hàm tìm kiếm và lọc sản phẩm
  const filterProducts = (query, category) => {
    let filtered = allProducts;

    // Lọc theo danh mục (brand)
    if (category) {
      filtered = filtered.filter(p => p.brand === category);
    }

    // Tìm kiếm theo tên (không phân biệt hoa thường)
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  };

  // Xử lý tìm kiếm - lấy tối đa 5 kết quả cho dropdown
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      const results = allProducts
        .filter(p => p.name.toLowerCase().includes(lowerQuery))
        .slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    // Vẫn cập nhật danh sách sản phẩm chính
    const filtered = filterProducts(query, selectedCategory);
    setProducts(filtered.slice(0, 20));
  };

  // Xử lý chọn 1 kết quả từ dropdown search
  const handleSelectSearchResult = (product) => {
    setSearchQuery('');
    setSearchResults([]);
    handleOpenDetail(product);
  };

  // Xử lý lọc theo danh mục
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setSearchResults([]);
    const filtered = filterProducts('', category);
    setProducts(filtered);
  };

  // Lấy danh sách categories từ dữ liệu sản phẩm
  const categories = React.useMemo(() => {
    const uniqueBrands = [...new Set(allProducts.map(item => item.brand))].filter(Boolean);
    return uniqueBrands.map((brand, index) => ({
      id: index + 1,
      name: brand
    }));
  }, [allProducts]);

  const openAuth = (view = 'login') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setCurrentRoute('detail');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans flex flex-col">
      <Header
        onOpenLogin={() => openAuth('login')}
        onOpenRegister={() => openAuth('register')}
        onOpenCart={() => setCurrentRoute('cart')}
        onGoHome={(route) => { 
          if (route === 'admin' && user?.role === 'admin') {
            setCurrentRoute('admin');
          } else {
            setCurrentRoute('home'); 
            setSearchQuery(''); 
            setSelectedCategory(''); 
            setProducts(allProducts.slice(0, 8)); 
          }
        }}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onSearch={handleSearch}
        onCategorySelect={handleCategoryFilter}
        categories={categories}
        searchResults={searchResults}
        onSelectSearchResult={handleSelectSearchResult}
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-black">
                {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : 
                 selectedCategory ? selectedCategory : 'Điện thoại hot'}
              </h2>
              {(searchQuery || selectedCategory) && (
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory(''); setProducts(allProducts.slice(0, 8)); }}
                  className="text-sm text-red-500 hover:text-red-700 hover:underline"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
            {products.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                <p>Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetail={() => handleOpenDetail(product)}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {currentRoute === 'cart' && (
        <Cart 
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {currentRoute === 'checkout' && (
        <Checkout
          onBackToCart={() => setCurrentRoute('cart')}
          cartItems={cartItems}
          user={user}
        />
      )}

      {currentRoute === 'detail' && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setCurrentRoute('home')}
          onBuyNow={handleBuyNow}
          onAddToCart={addToCart}
        />
      )}

      {currentRoute === 'admin' && user?.role === 'admin' && (
        <AdminDashboard
          onBack={() => setCurrentRoute('home')}
          user={user}
        />
      )}

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView={authView}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;