import { Product, User, Order } from '@/types';

// Mock Users
export const users: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@phonestore.vn',
    phone: '0909123456',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0909123457',
    role: 'user',
    createdAt: '2024-01-15T00:00:00Z',
  },
];

// Hashed passwords (for demo only - in real app use bcrypt)
export const userPasswords: Record<string, string> = {
  '0909123456': 'admin123',
  '0909123457': 'password123',
};

// Mock Products
export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    brand: 'Apple',
    price: 29990000,
    oldPrice: 34990000,
    image: 'https://th.bing.com/th/id/OIP.6v1FaCqpgQTqAQFRgBLMWQHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    description: 'iPhone 15 Pro Max với khung viền Titan siêu bền nhẹ, nút Action mới và camera Zoom quang học 5x cực đỉnh.',
    specs: {
      screen: '6.7 inch, Super Retina XDR OLED',
      cpu: 'Apple A17 Pro (3nm)',
      ram: '8GB',
      storage: '256GB',
      camera: '48MP + 12MP + 12MP',
      battery: '4,422 mAh, Sạc 20W',
      os: 'iOS 17',
    },
    stock: 50,
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 26590000,
    oldPrice: 33990000,
    image: 'data:image/webp;base64,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',
    description: 'Samsung Galaxy S24 Ultra tích hợp bút S-Pen quyền năng, hệ thống camera AI 200MP và hỗ trợ dịch thuật thông minh.',
    specs: {
      screen: '6.8 inch, Dynamic LTPO AMOLED 2X',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12GB',
      storage: '256GB',
      camera: '200MP + 12MP + 50MP + 10MP',
      battery: '5,000 mAh, Sạc 45W',
      os: 'Android 14',
    },
    stock: 25,
    featured: true,
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: 3,
    name: 'Xiaomi 14 Ultra (12GB/256GB)',
    brand: 'Xiaomi',
    price: 24990000,
    oldPrice: 28990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra.png',
    description: 'Xiaomi 14 Ultra sở hữu ống kính Leica thế hệ mới siêu nét, cảm biến camera 1 inch và hệ điều hành HyperOS mượt mà.',
    specs: {
      screen: '6.73 inch, LTPO AMOLED, 68 tỷ màu',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP Leica (4 camera)',
      battery: '5,000 mAh, Sạc nhanh 90W',
      os: 'Android 14 (HyperOS)',
    },
    stock: 20,
    featured: true,
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 4,
    name: 'Oppo Find X7 Ultra',
    brand: 'Oppo',
    price: 18500000,
    oldPrice: 21000000,
    image: 'https://th.bing.com/th/id/OIP.FVkOCOMFGZQ76fX_0pjEmQHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    description: 'OPPO Find X7 Ultra với camera kép kính tiềm vọng đầu tiên, thiết kế mặt lưng da cao cấp và sạc nhanh SuperVOOC 100W.',
    specs: {
      screen: '6.82 inch, AMOLED, 2K+',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      storage: '256GB',
      camera: '50MP Hasselblad (4 camera)',
      battery: '5,000 mAh, Sạc 100W',
      os: 'Android 14',
    },
    stock: 18,
    featured: false,
    createdAt: '2024-01-06T00:00:00Z',
  },
  {
    id: 5,
    name: 'iPhone 13 128GB',
    brand: 'Apple',
    price: 13490000,
    oldPrice: 15990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png',
    description: 'iPhone 13 sở hữu thiết kế nhỏ gọn dễ cầm nắm, chip A15 Bionic mạnh mẽ và chế độ quay phim Cinematic chuyên nghiệp.',
    specs: {
      screen: '6.1 inch, Super Retina XDR OLED',
      cpu: 'Apple A15 Bionic',
      ram: '4GB',
      storage: '128GB',
      camera: '12MP + 12MP',
      battery: '3,240 mAh, Sạc 20W',
      os: 'iOS 15 (Upgradable to iOS 17)',
    },
    stock: 30, // Kế thừa từ slot iPhone cũ hoặc tùy chỉnh ngẫu nhiên
    featured: true,
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 6,
    name: 'Samsung Galaxy A54 5G',
    brand: 'Samsung',
    price: 8290000,
    oldPrice: 10490000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-a546_galaxy_a54_5g_awesome_violet_front_4_3.png',
    description: 'Samsung Galaxy A54 5G với khả năng kháng nước bụi IP67, mặt lưng kính sang trọng và camera chống rung quang học OIS.',
    specs: {
      screen: '6.4 inch, Super AMOLED, 120Hz',
      cpu: 'Exynos 1380 (5nm)',
      ram: '8GB',
      storage: '128GB',
      camera: '50MP + 12MP + 5M',
      battery: '5,000 mAh, Sạc 25W',
      os: 'Android 13',
    },
    stock: 15,
    featured: false,
    createdAt: '2024-01-04T00:00:00Z',
  },
  {
    id: 7,
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 16990000,
    oldPrice: 19500000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro_7_.png',
    description: 'Google Pixel 8 Pro mang lại trải nghiệm Android thuần mượt mà, AI Magic Editor chỉnh ảnh thông minh và hỗ trợ cập nhật tới 7 năm.',
    specs: {
      screen: '6.7 inch, LTPO OLED',
      cpu: 'Google Tensor G3',
      ram: '12GB',
      storage: '128GB',
      camera: '50MP + 48MP + 48MP',
      battery: '5,050 mAh, Sạc 30W',
      os: 'Android 14',
    },
    stock: 22,
    featured: true,
    createdAt: '2024-01-07T00:00:00Z',
  },
  {
    id: 8,
    name: 'Redmi Note 13 Pro+',
    brand: 'Xiaomi',
    price: 9190000,
    oldPrice: 10990000,
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png',
    description: 'Redmi Note 13 Pro+ sở hữu camera siêu phân giải 200MP, màn hình cong AMOLED cao cấp và sạc thần tốc 120W trong 19 phút.',
    specs: {
      screen: '6.67 inch, AMOLED, 1.5K',
      cpu: 'Dimensity 7200 Ultra',
      ram: '8GB',
      storage: '256GB',
      camera: '200MP + 8MP + 2MP',
      battery: '5,000 mAh, Sạc thần tốc 120W',
      os: 'Android 13',
    },
    stock: 45,
    featured: false,
    createdAt: '2024-01-08T00:00:00Z',
  },
];

// Mock Orders
export const orders: Order[] = [
  {
    id: 1,
    userId: 2,
    items: [
      { product: products[0], quantity: 1, price: 32990000 },
    ],
    total: 32990000,
    status: 'delivered',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0909123457',
    customerEmail: 'nguyenvana@email.com',
    shippingAddress: {
      street: '123 Đường ABC',
      ward: 'Phường 1',
      district: 'Quận 1',
      city: 'TP Hồ Chí Minh',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-18T14:00:00Z',
  },
  {
    id: 2,
    userId: 2,
    items: [
      { product: products[2], quantity: 1, price: 29990000 },
      { product: products[7], quantity: 2, price: 9990000 },
    ],
    total: 49970000,
    status: 'processing',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0909123457',
    customerEmail: 'nguyenvana@email.com',
    shippingAddress: {
      street: '456 Đường XYZ',
      ward: 'Phường 2',
      district: 'Quận Bình Thạnh',
      city: 'TP Hồ Chí Minh',
    },
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z',
  },
];

// Brands list
export const brands = ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Google'] as const;

// Helper functions
export function findUserByPhone(phone: string): User | undefined {
  return users.find(u => u.phone === phone);
}

export function findUserById(id: number): User | undefined {
  return users.find(u => u.id === id);
}

export function findProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(p => p.brand === brand);
}
