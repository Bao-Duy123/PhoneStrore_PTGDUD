# PhoneStore - Tài liệu dự án

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Kiến trúc ứng dụng](#kiến-trúc-ứng-dụng)
- [Các tính năng chính](#các-tính-năng-chính)
- [Quy ước coding](#quy-ước-coding)

---

## Giới thiệu

PhoneStore là ứng dụng web thương mại điện tử bán điện thoại di động, được xây dựng bằng React 19 và Vite. Dự án phục vụ như một template/framework cơ bản cho việc phát triển các ứng dụng thương mại điện tử.

### Tính năng nổi bật
- Trang chủ hiển thị sản phẩm với lưới responsive
- Tìm kiếm và lọc sản phẩm theo danh mục (brand)
- Giỏ hàng với đầy đủ chức năng CRUD
- Thanh toán với form nhận hàng
- Đăng nhập/Đăng ký người dùng
- Dashboard quản trị cho admin

---

## Cấu trúc dự án

```
PhoneStore/
├── public/
│   └── api/
│       └── data.json           # Dữ liệu mock sản phẩm
├── src/
│   ├── components/
│   │   ├── AdminDashboard.jsx  # Trang quản trị admin
│   │   ├── AuthModal.jsx       # Modal đăng nhập/đăng ký
│   │   ├── Button.jsx          # Component nút bấm
│   │   ├── Cart.jsx           # Trang giỏ hàng
│   │   ├── Checkout.jsx        # Trang thanh toán
│   │   ├── Footer.jsx          # Footer của trang
│   │   ├── Header.jsx          # Header với nav, search, cart
│   │   ├── ProductCard.jsx     # Card hiển thị sản phẩm
│   │   └── ProductDetail.jsx   # Trang chi tiết sản phẩm
│   ├── App.jsx                 # Component chính, state management
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles (Tailwind)
├── eslint.config.js             # ESLint configuration
├── index.html                  # HTML entry
├── package.json
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # Tailwind configuration
```

---

## Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.x
- npm hoặc yarn

### Các bước cài đặt

```bash
# 1. Di chuyển vào thư mục dự án
cd PhoneStore

# 2. Cài đặt dependencies
npm install

# 3. Chạy development server
npm run dev

# 4. Build cho production
npm run build

# 5. Xem trước production build
npm run preview
```

### Các script có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Khởi chạy Vite dev server |
| `npm run build` | Build production |
| `npm run preview` | Preview production build |
| `npm run lint` | Chạy ESLint |
| `npm run test` | Chạy unit tests (Vitest) |
| `npm run test:ui` | Chạy tests với UI |
| `npm run test:coverage` | Chạy tests với coverage report |

---

## Công nghệ sử dụng

### Core
- **React 19.1.0** - UI library
- **Vite 4.x** - Build tool & dev server

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **@tailwindcss/vite** - Vite plugin cho Tailwind v4

### Development
- **ESLint 9** - Linting với flat config
- **TypeScript 5.8** - Type safety
- **Vitest** - Testing framework

### Dependencies (có sẵn trong package.json nhưng chưa sử dụng)
- Redux Toolkit, React Query, React Hook Form, Zod
- Recharts, Sonner (toast notifications)
- bcryptjs, jsonwebtoken (authentication)
- lucide-react (icons)

---

## Kiến trúc ứng dụng

### State Management

Ứng dụng sử dụng **local state với prop drilling** thay vì Redux/Context:

```jsx
// State được định nghĩa tại App.jsx
const [isAuthOpen, setIsAuthOpen] = useState(false);
const [currentRoute, setCurrentRoute] = useState('home');
const [selectedProduct, setSelectedProduct] = useState(null);
const [products, setProducts] = useState([]);
const [cartItems, setCartItems] = useState([]);
const [user, setUser] = useState(null);
```

### Routing

**Không sử dụng react-router-dom**. Routing được quản lý bằng `currentRoute` state:

```jsx
// Các route được handle trong App.jsx
const [currentRoute, setCurrentRoute] = useState('home');
// 'home' | 'cart' | 'checkout' | 'detail' | 'admin'

{currentRoute === 'home' && <HomePage />}
{currentRoute === 'cart' && <Cart />}
{currentRoute === 'checkout' && <Checkout />}
{currentRoute === 'detail' && <ProductDetail />}
{currentRoute === 'admin' && <AdminDashboard />}
```

### Data Flow

```
public/api/data.json
       ↓ fetch('/api/data.json')
    App.jsx (useEffect)
       ↓ format và lưu vào state
  allProducts (raw data)
       ↓ slice(0, 8)
    products (hiển thị)
       ↓ ProductCard props
    Components
```

### Price Formatting

Giá được format bằng `toLocaleString('vi-VN')` tại App.jsx trước khi truyền xuống components:

```jsx
// Trong useEffect của App.jsx
const formattedData = data.map(item => ({
  ...item,
  priceRaw: item.price,              // Giữ giá gốc để tính toán
  oldPriceRaw: item.oldPrice,
  price: item.price.toLocaleString('vi-VN'),  // Format hiển thị
  oldPrice: item.oldPrice?.toLocaleString('vi-VN'),
}));
```

---

## Các tính năng chính

### 1. Trang chủ (Home)
- Banner quảng cáo
- Grid sản phẩm (responsive: 2/3/4 columns)
- Tìm kiếm với debounce 300ms
- Dropdown kết quả tìm kiếm (max 5 items)
- Lọc theo danh mục (brand)
- Nút "Xem chi tiết" và "Thêm vào giỏ"

### 2. Chi tiết sản phẩm (ProductDetail)
- Hiển thị hình ảnh zoom on hover
- Giá sản phẩm
- Nút "Mua ngay" → chuyển thẳng đến checkout
- Nút "Thêm vào giỏ"

### 3. Giỏ hàng (Cart)
- Danh sách sản phẩm đã chọn
- Tăng/giảm số lượng
- Xóa sản phẩm
- Tính tổng tiền
- Chuyển đến checkout

### 4. Thanh toán (Checkout)
- Thông tin sản phẩm
- Thông tin khách hàng (từ user đăng nhập)
- Form nhận hàng (tỉnh/thành, quận/huyện, địa chỉ)
- Tổng kết đơn hàng

### 5. Đăng nhập/Đăng ký (AuthModal)
- Toggle giữa login/register view
- Hiện/ẩn mật khẩu
- Nút đăng nhập admin nhanh
- Lưu user vào localStorage

### 6. Dashboard Admin (AdminDashboard)
- **Dashboard**: Thống kê (sản phẩm, đơn hàng, doanh thu, users)
- **Quản lý sản phẩm**: Bảng CRUD products
- **Quản lý đơn hàng**: (Đang phát triển)
- **Quản lý người dùng**: (Đang phát triển)

### 7. Header
- Logo (click để về home)
- Dropdown danh mục
- Thanh tìm kiếm với dropdown kết quả
- Icon giỏ hàng + badge số lượng
- User menu (đăng nhập/đăng ký hoặc tên user + logout)

### 8. Footer
- Logo và mô tả
- Danh mục sản phẩm
- Thông tin hỗ trợ
- Thông tin liên hệ

---

## Quy ước Coding

### Component Structure
```jsx
import React from 'react';
import Button from './Button';

const ComponentName = ({ prop1, prop2, onAction }) => {
  // 1. Hooks (useState, useEffect, useRef)
  // 2. Handler functions
  // 3. Render JSX

  return (
    <div>
      {/* content */}
    </div>
  );
};

export default ComponentName;
```

### Event Propagation

**QUAN TRỌNG**: Khi thêm button/action bên trong clickable parent, phải gọi `e.stopPropagation()`:

```jsx
// ProductCard.jsx
<div onClick={onViewDetail} className="...">
  <Button 
    onClick={(e) => {
      e.stopPropagation();  // Ngăn chặn trigger onClick của parent
      onAddToCart();
    }}
  >
    Thêm vào giỏ
  </Button>
</div>
```

### Tailwind Classes Pattern

- Sử dụng arbitrary values cho màu brand: `bg-[#ff4d4f]`
- Responsive prefix: `sm:`, `md:`, `lg:`, `xl:`
- Hover states: `hover:`, `focus:`, `active:`

### Image Fallback

```jsx
<img 
  src={product.image} 
  alt={product.name}
  onError={(e) => {
    e.target.src = "https://placehold.co/300x300";
  }}
/>
```

### Price Handling

```jsx
// Luôn giữ priceRaw để tính toán
const price = product.priceRaw || product.price;

// Format khi hiển thị
{product.price.toLocaleString('vi-VN')}đ
```

### localStorage Keys

| Key | Mô tả |
|-----|-------|
| `phonestore_user` | User object đã đăng nhập |
| `phonestore_cart` | Danh sách sản phẩm trong giỏ hàng |

---

## Phát triển trong tương lai

### Đề xuất cải thiện
1. **Chuyển sang React Router** - Quản lý routing tốt hơn với URL params
2. **Thêm Context API** - Tránh prop drilling cho các component sâu
3. **API Server** - Backend thực sự thay vì mock data
4. **State Management** - Redux Toolkit hoặc Zustand
5. **Form Validation** - Sử dụng React Hook Form + Zod
6. **Testing** - Thêm unit tests và integration tests

### Tính năng cần hoàn thiện
- [ ] Thanh toán thực tế (tích hợp payment gateway)
- [ ] Quản lý đơn hàng trong admin
- [ ] Quản lý người dùng trong admin
- [ ] Form đăng ký hoàn chỉnh
- [ ] Chi tiết sản phẩm đầy đủ (specs, highlights)
- [ ] Image carousel/gallery
- [ ] Reviews/Ratings
- [ ] Wishlist

---

## Liên hệ

- **Tác giả**: Duy
- **Email**: contact@phonestore.vn
- **Hotline**: 1800 6601

---

© 2026 PhoneStore
