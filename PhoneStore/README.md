# PhoneStoreBasis

A Vietnamese e-commerce web application for mobile phone retail built with **Vite + React + TypeScript**.

> **Note:** This project uses Mock API instead of a real backend. All API calls are simulated with localStorage persistence.

## Features

### User Features
- **Home Page**: Banner, featured products, brand categories
- **Product Listing**: Search, filter by brand/price, sort, pagination
- **Product Detail**: Full specs, images, add to cart
- **Shopping Cart**: Slide-out drawer, quantity controls
- **Checkout**: Contact info, shipping address, order placement
- **Authentication**: Login/Register with form validation

### Admin Features
- **Dashboard**: Stats overview (revenue, orders, users)
- **Product Management**: View, add, edit, delete products
- **Order Management**: View orders, update order status
- **User Management**: View all registered users

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Redux Toolkit |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| Notifications | Sonner (toast) |

## Mock API System

This project uses a **Mock API** service that simulates backend API calls. This means:

1. **No real backend server required** - runs entirely on the frontend
2. **Data persistence via localStorage** - data survives page refreshes
3. **Simulated network delays** - realistic loading states
4. **Same API structure** - easy to migrate to real backend later

### API Service Structure

All API calls are centralized in `src/services/api.ts`:

```typescript
// Auth API
authApi.login(credentials)      // POST /api/auth/login
authApi.register(data)          // POST /api/auth/register
authApi.logout()               // POST /api/auth/logout
authApi.getProfile()           // GET /api/auth/profile

// Products API
productsApi.getProducts()      // GET /api/products
productsApi.getProductById()   // GET /api/products/:id
productsApi.getFeaturedProducts() // GET /api/products/featured
productsApi.createProduct()    // POST /api/products
productsApi.updateProduct()    // PUT /api/products/:id
productsApi.deleteProduct()    // DELETE /api/products/:id

// Orders API
ordersApi.getOrders()          // GET /api/orders
ordersApi.getOrderById()       // GET /api/orders/:id
ordersApi.createOrder()        // POST /api/orders
ordersApi.updateOrderStatus()  // PUT /api/orders/:id/status
ordersApi.getOrderStats()      // GET /api/orders/stats

// Users API (Admin)
usersApi.getUsers()            // GET /api/users
usersApi.getUserById()         // GET /api/users/:id
usersApi.getUserStats()        // GET /api/users/stats
```

### How to Replace Mock API with Real Backend

1. Create API endpoints on your backend server
2. Update `src/services/api.ts` to make HTTP requests:

```typescript
// Before (Mock)
async login(credentials: LoginCredentials) {
  await delay(500); // Simulate network
  // Check local data...
}

// After (Real)
async login(credentials: LoginCredentials) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}
```

## Demo Accounts

| Role | Phone | Password |
|------|-------|----------|
| Admin | 0909123456 | admin123 |
| User | 0909123457 | password123 |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd PhoneStoreBasis

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## Project Structure

```
PhoneStoreBasis/
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components (Button, Input, Card...)
│   │   ├── features/    # Feature components (ProductCard, CartSidebar...)
│   │   └── layout/      # Layout components (Header, Footer...)
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   ├── store/           # Redux store and slices
│   ├── types/           # TypeScript type definitions
│   ├── data/            # Mock data
│   └── lib/              # Utilities
├── public/              # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/products` | Product listing |
| `/products/:id` | Product detail |
| `/login` | Login page |
| `/register` | Registration page |
| `/checkout` | Checkout page (requires login) |
| `/admin` | Admin dashboard |
| `/admin/products` | Admin: Product management |
| `/admin/orders` | Admin: Order management |
| `/admin/users` | Admin: User management |

## State Management

The app uses **Redux Toolkit** for state management with the following slices:

- **authSlice**: User authentication state
- **cartSlice**: Shopping cart state (persisted to localStorage)
- **productsSlice**: Product listing and filters
- **ordersSlice**: Order management

## Form Validation

Forms use **React Hook Form** with **Zod** schema validation:

```typescript
const loginSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});
```

## Custom Hooks

- `useAuth()` - Authentication state and actions
- `useCart()` - Cart operations
- `useProducts()` - Product listing and filters
- `useOrders()` - Order management
- `useDebounce()` - Input debouncing

## License

MIT License
