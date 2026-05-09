# PhoneStore - Tài liệu API

## Mục lục

- [Tổng quan](#tổng-quan)
- [Base URL](#base-url)
- [Mock Data Structure](#mock-data-structure)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Authentication](#authentication)

---

## Tổng quan

PhoneStore sử dụng **mock data JSON** thay vì API server thực sự. Dữ liệu được phục vụ từ file `public/api/data.json` thông qua Vite dev server.

### Luồng dữ liệu hiện tại

```
┌─────────────────┐
│   data.json     │  ← Mock data (public/api/data.json)
└────────┬────────┘
         │ fetch('/api/data.json')
         ▼
┌─────────────────┐
│    App.jsx      │  ← Xử lý format & state
└────────┬────────┘
         │ props drilling
         ▼
┌─────────────────┐
│  Components     │  ← Header, ProductCard, Cart, etc.
└─────────────────┘
```

---

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:5173` |
| Production | (tùy deployment) |

---

## Mock Data Structure

### File: `public/api/data.json`

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro Max 256GB",
    "price": 29990000,
    "oldPrice": 34990000,
    "brand": "Apple",
    "image": "https://...",
    "specs": {
      "screen": "6.7 inch, Super Retina XDR OLED",
      "cpu": "Apple A17 Pro (3nm)",
      "ram": "8GB",
      "rom": "256GB",
      "battery": "4,422 mAh, Sạc 20W"
    },
    "highlights": [
      "Khung viền Titan siêu bền và nhẹ",
      "..."
    ]
  }
]
```

---

## Endpoints

### 1. GET /api/data.json

Lấy danh sách tất cả sản phẩm.

**Request:**

```bash
GET /api/data.json
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro Max 256GB",
    "price": 29990000,
    "oldPrice": 34990000,
    "brand": "Apple",
    "image": "https://...",
    "specs": {...},
    "highlights": [...]
  },
  {
    "id": 2,
    "name": "Samsung Galaxy S24 Ultra",
    "price": 26590000,
    "oldPrice": 33990000,
    "brand": "Samsung",
    "image": "https://...",
    "specs": {...},
    "highlights": [...]
  }
]
```

**Status Codes:**
| Code | Mô tả |
|------|-------|
| 200 | Thành công |
| 404 | File không tìm thấy |

---

### 2. POST /api/auth/login

Đăng nhập người dùng. *(Chưa implement thực sự - cần backend)*

**Request:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "phone": "0909123456",
  "password": "user123"
}
```

**Expected Response (khi có backend):**

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Nguyễn Bảo Duy",
    "phone": "0909123456",
    "email": "duy@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Số điện thoại hoặc mật khẩu không đúng"
}
```

---

### 3. POST /api/auth/register

Đăng ký người dùng mới. *(Chưa implement - cần backend)*

**Request:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "phone": "0912345678",
  "email": "a@example.com",
  "password": "secure123",
  "birthday": "01/01/2000"
}
```

**Expected Response:**

```json
{
  "success": true,
  "user": {
    "id": 2,
    "name": "Nguyễn Văn A",
    "phone": "0912345678",
    "email": "a@example.com",
    "role": "user"
  }
}
```

---

## Data Models

### Product

| Field | Type | Mô tả |
|-------|------|-------|
| `id` | number | ID sản phẩm (unique) |
| `name` | string | Tên sản phẩm |
| `price` | number | Giá hiện tại (VND) |
| `oldPrice` | number \| null | Giá cũ (trước giảm) |
| `brand` | string | Thương hiệu (Apple, Samsung, Xiaomi...) |
| `image` | string | URL hình ảnh sản phẩm |
| `specs` | object | Thông số kỹ thuật |
| `specs.screen` | string | Kích thước & công nghệ màn hình |
| `specs.cpu` | string | Bộ xử lý |
| `specs.ram` | string | Dung lượng RAM |
| `specs.rom` | string | Dung lượng bộ nhớ |
| `specs.battery` | string | Dung lượng pin & sạc |
| `highlights` | string[] | Các điểm nổi bật |

### CartItem

| Field | Type | Mô tả |
|-------|------|-------|
| `id` | number | ID sản phẩm |
| `name` | string | Tên sản phẩm |
| `price` | number \| string | Giá (number khi tính toán, string khi hiển thị) |
| `oldPrice` | number \| string \| null | Giá cũ |
| `image` | string | URL hình ảnh |
| `quantity` | number | Số lượng trong giỏ |
| `checked` | boolean | Đã chọn để thanh toán |

### User

| Field | Type | Mô tả |
|-------|------|-------|
| `id` | number | ID người dùng |
| `name` | string | Họ tên |
| `phone` | string | Số điện thoại |
| `email` | string | Email |
| `role` | string | `user` hoặc `admin` |

### Order

*(Chưa implement - model dự kiến)*

| Field | Type | Mô tả |
|-------|------|-------|
| `id` | number | ID đơn hàng |
| `userId` | number | ID người dùng |
| `items` | CartItem[] | Danh sách sản phẩm |
| `totalAmount` | number | Tổng tiền |
| `status` | string | `pending`, `confirmed`, `shipping`, `delivered`, `cancelled` |
| `shippingAddress` | object | Địa chỉ giao hàng |
| `createdAt` | string | Thời gian tạo đơn |

---

## Error Handling

### Frontend Error Handling Pattern

```jsx
fetch('/api/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Xử lý data
  })
  .catch(error => {
    console.error('Error fetching products:', error);
    // Hiển thị error UI
  });
```

### Error States

| Error Type | Handling |
|------------|----------|
| Network Error | Hiển thị thông báo "Không thể kết nối server" |
| 404 Not Found | Hiển thị trang 404 hoặc redirect về home |
| 500 Server Error | Hiển thị "Đã xảy ra lỗi, vui lòng thử lại" |
| Auth Error | Redirect về trang login |

---

## Authentication

### Current Implementation

Đăng nhập hiện tại được xử lý bằng **localStorage**:

```javascript
// Lưu user sau khi đăng nhập thành công
localStorage.setItem('phonestore_user', JSON.stringify(user));

// Đọc user khi app mount
const savedUser = localStorage.getItem('phonestore_user');
if (savedUser) {
  const user = JSON.parse(savedUser);
  setUser(user);
  setIsLoggedIn(true);
}

// Đăng xuất
localStorage.removeItem('phonestore_user');
```

### Admin Login

Nút đăng nhập admin nhanh trong AuthModal:

```javascript
const handleAdminLogin = () => {
  setPhone('0909123456');
  setPassword('admin123');
};
```

### Role-based Access

```jsx
{user?.role === 'admin' && (
  <button onClick={handleAdminDashboard}>
    Quản lý Admin
  </button>
)}

{currentRoute === 'admin' && user?.role === 'admin' && (
  <AdminDashboard />
)}
```

### Đề xuất cho Production

1. **JWT Authentication:**
   - Server trả về JWT token
   - Frontend lưu token (không phải full user object)
   - Gửi token trong header cho mọi request

2. **Protected Routes:**
   - Kiểm tra token trước khi render protected components
   - Redirect về login nếu không có quyền

3. **Token Refresh:**
   - Implement refresh token mechanism
   - Tự động refresh khi token sắp hết hạn

---

## Ví dụ sử dụng API

### Fetch Products

```jsx
useEffect(() => {
  fetch('/api/data.json')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    })
    .catch(err => console.error(err));
}, []);
```

### Login

```jsx
const handleLogin = async (phone, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('phonestore_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

---

## Future API Endpoints (Dự kiến)

Khi phát triển backend, các endpoints sau nên được implement:

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới (admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (admin)

### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng (admin)

### Users
- `GET /api/users` - Lấy danh sách người dùng (admin)
- `GET /api/users/me` - Lấy thông tin user hiện tại
- `PUT /api/users/me` - Cập nhật thông tin cá nhân

---

© 2026 PhoneStore
