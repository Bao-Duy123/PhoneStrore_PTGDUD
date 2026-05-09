# PhoneStore - Specification Document

## 1. Project Overview

### Project Name
PhoneStore - Vietnamese Smartphone E-commerce Platform

### Core Functionality
A full-featured e-commerce web application for selling smartphones, built with Next.js 15, featuring authentication, product management, shopping cart, order processing, and an admin dashboard with analytics.

### Target Users
- **Customers**: Vietnamese users looking to purchase smartphones online
- **Administrators**: Store managers who manage products, orders, and view analytics

---

## 2. Technical Stack

### Frontend Framework
- **Next.js 15** (App Router) - Required by assignment
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling

### State Management
- **Redux Toolkit** - Global state (auth, cart)
- **React Query (@tanstack/react-query)** - Server state, caching

### Form Handling
- **React Hook Form** - Form management
- **Zod** - Schema validation

### UI Components
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Recharts** - Dashboard charts

### API & Authentication
- **Next.js API Routes** - Backend API
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### Testing
- **Vitest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing (optional)

### Deployment
- **Vercel** - Hosting platform
- **GitHub Actions** - CI/CD

---

## 3. UI/UX Design

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Red | `#ff4d4f` | Header, buttons, accents |
| Primary Light | `#ff6b6b` | Hover states |
| Danger Red | `#dc2626` | Destructive actions |
| Background | `#f3f4f6` | Page background |
| White | `#ffffff` | Cards, containers |
| Text Dark | `#1f2937` | Primary text |
| Text Gray | `#6b7280` | Secondary text |
| Text Light | `#9ca3af` | Placeholder text |
| Success | `#10b981` | Success states |
| Warning | `#f59e0b` | Warning states |

### Typography
- **Font Family**: System font stack (sans)
- **Headings**: Bold, sizes from 2xl to 4xl
- **Body**: Regular, text-sm to text-base
- **Vietnamese**: Full support with proper encoding

### Layout
- **Container**: Max-width 6xl, centered
- **Grid**: 4 columns (lg), 3 columns (md), 2 columns (sm)
- **Spacing**: 4px base unit (Tailwind scale)
- **Border Radius**: rounded-lg for cards, rounded-xl for modals

---

## 4. Data Models

### Product
```typescript
interface Product {
  id: number;
  name: string;
  price: number;          // VND
  oldPrice?: number;       // VND, for discount calculation
  brand: 'Apple' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Google';
  image: string;           // URL
  specs: {
    screen: string;
    cpu: string;
    ram: string;
    rom: string;
    battery: string;
  };
  highlights: string[];
  stock: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
```

### User
```typescript
interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  password: string;        // Hashed
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Order
```typescript
interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}
```

### CartItem
```typescript
interface CartItem {
  product: Product;
  quantity: number;
}
```

---

## 5. Page Structure

### Public Pages
| Route | Description | Render Strategy |
|-------|-------------|-----------------|
| `/` | Homepage with hero banner + featured products | SSG |
| `/products` | Product listing with search/filter/pagination | ISR (60s) |
| `/products/[id]` | Product detail page | SSR |
| `/cart` | Shopping cart | Client |
| `/checkout` | Checkout form | Client |

### Auth Pages
| Route | Description |
|-------|-------------|
| `/login` | Login form |
| `/register` | Registration form |
| `/profile` | User profile (protected) |

### Admin Pages
| Route | Description |
|-------|-------------|
| `/admin/dashboard` | Analytics dashboard |
| `/admin/products` | Product management (CRUD) |
| `/admin/orders` | Order management |
| `/admin/users` | User management |

---

## 6. API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (with query params) |
| GET | `/api/products/[id]` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/[id]` | Update product (Admin) |
| DELETE | `/api/products/[id]` | Delete product (Admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List orders |
| GET | `/api/orders/[id]` | Get order detail |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/[id]/status` | Update order status (Admin) |

### Users (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users (Admin) |
| PUT | `/api/users/[id]/role` | Update user role (Admin) |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload image file |

---

## 7. Component Architecture

### UI Components (`components/ui/`)
- `Button` - Primary, secondary, danger variants
- `Input` - Text input with label and error
- `Select` - Dropdown select
- `Modal` - Reusable modal dialog
- `Toast` - Notification toasts
- `Spinner` - Loading spinner
- `Badge` - Status badges
- `Card` - Base card component
- `Skeleton` - Loading skeleton

### Feature Components (`components/features/`)
- `ProductCard` - Product grid card
- `ProductGrid` - Grid layout for products
- `ProductFilters` - Filter panel
- `SearchBar` - Search input
- `CartItem` - Cart item row
- `CartSummary` - Cart total summary
- `CheckoutForm` - Checkout form
- `OrderStatusBadge` - Order status display
- `ImageUpload` - Image upload with preview
- `DataTable` - Generic data table
- `Pagination` - Pagination controls
- `PriceDisplay` - Formatted price display

### Layout Components (`components/layout/`)
- `Header` - Main navigation header
- `Footer` - Site footer
- `Sidebar` - Admin sidebar navigation
- `AdminLayout` - Admin page wrapper
- `ProtectedRoute` - Route guard

### Chart Components (`components/charts/`)
- `RevenueChart` - Line chart for revenue
- `OrderStatusChart` - Pie chart for order status
- `TopProductsChart` - Bar chart for top products
- `StatsCard` - Statistics display card

---

## 8. Custom Hooks

### `useAuth()`
- Returns current user, login, logout, register functions
- Handles token storage in localStorage
- Provides loading and error states

### `useDebounce<T>(value: T, delay: number)`
- Debounces any value
- Used for search input

### `useCart()`
- Returns cart items, add/remove/update functions
- Syncs with Redux store
- Calculates totals

### `useProducts(filters)`
- Fetches products with React Query
- Handles pagination
- Returns loading/error states

### `useOrders()`
- Fetches orders
- Handles order creation
- Admin order management

---

## 9. Redux Store Structure

```typescript
interface RootState {
  auth: {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  cart: {
    items: CartItem[];
    isOpen: boolean;
  };
  ui: {
    isSidebarOpen: boolean;
    toasts: Toast[];
  };
}
```

---

## 10. Form Validations (Zod Schemas)

### Login Schema
```typescript
z.object({
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});
```

### Register Schema
```typescript
z.object({
  name: z.string().min(2, 'Tên ít nhất 2 ký tự'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});
```

### Product Schema
```typescript
z.object({
  name: z.string().min(3, 'Tên sản phẩm ít nhất 3 ký tự'),
  price: z.number().min(0, 'Giá phải lớn hơn 0'),
  brand: z.enum(['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Google']),
  stock: z.number().int().min(0, 'Số lượng không âm'),
  image: z.string().url('URL hình ảnh không hợp lệ'),
});
```

### Order Schema
```typescript
z.object({
  customerName: z.string().min(2, 'Tên không hợp lệ'),
  customerPhone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  customerEmail: z.string().email().optional(),
  shippingAddress: z.object({
    street: z.string().min(1, 'Địa chỉ không hợp lệ'),
    ward: z.string().min(1, 'Phường/xã không hợp lệ'),
    district: z.string().min(1, 'Quận/huyện không hợp lệ'),
    city: z.string().min(1, 'Thành phố không hợp lệ'),
  }),
});
```

---

## 11. SEO Requirements

### Metadata
- Dynamic title and description per page
- Open Graph tags for social sharing
- Canonical URLs
- robots.txt and sitemap.xml

### Structured Data
- JSON-LD for products
- Organization schema

### Performance
- Next.js Image optimization
- Lazy loading components
- Route prefetching
- Core Web Vitals optimization

---

## 12. Testing Strategy

### Unit Tests (10-15)
- `utils/formatPrice.test.ts`
- `hooks/useDebounce.test.ts`
- `hooks/useAuth.test.ts`
- `store/cartSlice.test.ts`
- `components/Button.test.tsx`
- `components/ProductCard.test.tsx`
- `validation/authSchema.test.ts`
- `validation/productSchema.test.ts`

### Integration Tests (3-5)
- Login flow
- Add to cart → checkout → place order
- Admin: Create/Edit product
- Search and filter flow

### E2E Tests (Optional, 1-2)
- Complete purchase flow
- Admin product management

---

## 13. Git Workflow

### Branch Naming
- `main` - Production
- `develop` - Development
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical fixes

### Commit Convention
```
feat: add user authentication
fix: resolve cart calculation error
refactor: optimize product query
test: add unit tests for useAuth
docs: update README
chore: setup CI/CD pipeline
```

### Pull Request
- Title: Clear feature description
- Description: What/Why/How
- Screenshots for UI changes
- Review required before merge

---

## 14. Environment Variables

```env
# .env.example
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# Upload (optional)
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

# Database (for future migration)
DATABASE_URL=
```

---

## 15. Deployment Checklist

- [ ] All environment variables configured on Vercel
- [ ] Build passes without errors
- [ ] All tests passing
- [ ] ESLint passes
- [ ] TypeScript type check passes
- [ ] Preview deployments working for PRs
- [ ] Production deployment successful
- [ ] SEO metadata verified
- [ ] Performance metrics acceptable
