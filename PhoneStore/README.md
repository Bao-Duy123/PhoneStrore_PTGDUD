# PhoneStore - Cửa hàng điện thoại trực tuyến

<p align="center">
  <img src="https://via.placeholder.com/150x50/ff4d4f/ffffff?text=PhoneStore" alt="PhoneStore Logo" />
</p>

> Một ứng dụng web thương mại điện tử hoàn chỉnh dành cho bán lẻ điện thoại thông minh, được xây dựng với Next.js 15, TypeScript, và Tailwind CSS.

## Tính năng

### Khách hàng
- [x] Xem danh sách sản phẩm với bộ lọc và phân trang
- [x] Tìm kiếm sản phẩm theo tên, thương hiệu
- [x] Lọc sản phẩm theo giá, thương hiệu
- [x] Xem chi tiết sản phẩm với thông số kỹ thuật
- [x] Giỏ hàng (thêm, xóa, cập nhật số lượng)
- [x] Thanh toán với form đầy đủ thông tin
- [x] Đăng ký / Đăng nhập tài khoản

### Quản trị viên
- [x] Dashboard với thống kê doanh thu, đơn hàng
- [x] Quản lý sản phẩm (CRUD)
- [x] Quản lý đơn hàng (theo dõi trạng thái)
- [x] Quản lý người dùng (phân quyền)

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Redux Toolkit |
| **Data Fetching** | TanStack Query |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Charts** | Recharts |
| **Testing** | Vitest + React Testing Library |
| **Deployment** | Vercel |

## Cấu trúc dự án

```
PhoneStore/
├── app/                    # Next.js App Router
│   ├── (shop)/            # Customer pages
│   ├── (admin)/           # Admin pages
│   ├── api/               # API routes
│   ├── login/             # Login page
│   ├── register/          # Register page
│   └── checkout/          # Checkout page
├── components/             # React components
│   ├── ui/               # Base UI components
│   ├── features/          # Feature components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & store
├── services/              # API services
├── types/                 # TypeScript types
└── tests/                 # Test files
```

## Bắt đầu

### Yêu cầu

- Node.js 18+ 
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/username/phonestore.git
cd phonestore

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

### Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
npm run test         # Run tests
npm run test:ui      # Run tests with UI
```

## Tài khoản Demo

| Role | Số điện thoại | Mật khẩu |
|------|---------------|-----------|
| Admin | 0909123456 | admin123 |
| User | 0909123457 | password123 |

## API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

### Products
- `GET /api/products` - Danh sách sản phẩm (với query params)
- `GET /api/products/[id]` - Chi tiết sản phẩm

### Orders
- `GET /api/orders` - Danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới

### Users
- `GET /api/users` - Danh sách người dùng (Admin)
- `PUT /api/users` - Cập nhật người dùng

## Deployment

Dự án được cấu hình để deploy lên Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Hoặc kết nối repository với Vercel để auto-deploy.

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Authors

- **PhoneStore Team** - *Initial work*

---

Made with ❤️ using Next.js 15
