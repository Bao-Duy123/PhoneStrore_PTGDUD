import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from '@/store';
import { CartSidebar } from '@/components/features';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  CartPage,
  LoginPage,
  RegisterPage,
  CheckoutPage,
  AdminDashboardPage,
  AdminProductsPage,
  AdminOrdersPage,
  AdminUsersPage,
} from '@/pages';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />

          {/* 404 */}
          <Route path="*" element={<HomePage />} />
        </Routes>

        {/* Global Components */}
        <CartSidebar />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
