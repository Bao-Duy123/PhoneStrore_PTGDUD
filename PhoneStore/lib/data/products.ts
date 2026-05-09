import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: 29990000,
    oldPrice: 34990000,
    brand: 'Apple',
    image: 'https://th.bing.com/th/id/OIP.6v1FaCqpgQTqAQFRgBLMWQHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    specs: {
      screen: '6.7 inch, Super Retina XDR OLED',
      cpu: 'Apple A17 Pro (3nm)',
      ram: '8GB',
      rom: '256GB',
      battery: '4,422 mAh, Sạc 20W',
    },
    highlights: [
      'Khung viền Titan siêu bền và nhẹ',
      'Nút Action mới thay thế gạt rung truyền thống',
      'Camera Zoom quang học 5x cực đỉnh',
      'Cổng sạc USB-C hỗ trợ truyền dữ liệu tốc độ cao',
    ],
    stock: 50,
    rating: 4.8,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 26590000,
    oldPrice: 33990000,
    brand: 'Samsung',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222_3_1_1.png',
    specs: {
      screen: '6.8 inch, Dynamic LTPO AMOLED 2X',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12GB',
      rom: '256GB',
      battery: '5,000 mAh, Sạc 45W',
    },
    highlights: [
      'Tích hợp bút S-Pen quyền năng',
      'Hệ thống camera AI 200MP chuyên nghiệp',
      'Khung viền Titan sang trọng',
      'Hỗ trợ AI dịch thuật và tìm kiếm thông minh',
    ],
    stock: 35,
    rating: 4.7,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 3,
    name: 'Xiaomi 14 Ultra (12GB/256GB)',
    price: 24990000,
    oldPrice: 28990000,
    brand: 'Xiaomi',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra.png',
    specs: {
      screen: '6.73 inch, LTPO AMOLED, 68 tỷ màu',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      rom: '256GB',
      battery: '5,000 mAh, Sạc nhanh 90W',
    },
    highlights: [
      'Ống kính Leica thế hệ mới siêu nét',
      'Cảm biến camera 1 inch hàng đầu thế giới',
      'Màn hình cong tràn 4 cạnh tinh tế',
      'Hệ điều hành HyperOS mượt mà',
    ],
    stock: 25,
    rating: 4.6,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Oppo Find X7 Ultra',
    price: 18500000,
    oldPrice: 21000000,
    brand: 'Oppo',
    image: 'https://th.bing.com/th/id/OIP.FVkOCOMFGZQ76fX_0pjEmQHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    specs: {
      screen: '6.82 inch, AMOLED, 2K+',
      cpu: 'Snapdragon 8 Gen 3',
      ram: '16GB',
      rom: '256GB',
      battery: '5,000 mAh, Sạc 100W',
    },
    highlights: [
      'Camera kép kính tiềm vọng đầu tiên',
      'Thiết kế mặt lưng da cao cấp',
      'Màn hình độ sáng tối đa 4500 nits',
      'Sạc nhanh SuperVOOC đầy pin trong 30 phút',
    ],
    stock: 20,
    rating: 4.5,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 5,
    name: 'iPhone 13 128GB',
    price: 13490000,
    oldPrice: 15990000,
    brand: 'Apple',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png',
    specs: {
      screen: '6.1 inch, Super Retina XDR OLED',
      cpu: 'Apple A15 Bionic',
      ram: '4GB',
      rom: '128GB',
      battery: '3,240 mAh, Sạc 20W',
    },
    highlights: [
      'Thiết kế nhỏ gọn, cầm nắm dễ dàng',
      'Chip A15 vẫn rất mạnh mẽ ở hiện tại',
      'Chế độ quay phim Cinematic chuyên nghiệp',
      'Thời lượng pin ấn tượng trong tầm giá',
    ],
    stock: 60,
    rating: 4.6,
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'Samsung Galaxy A54 5G',
    price: 8290000,
    oldPrice: 10490000,
    brand: 'Samsung',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-a546_galaxy_a54_5g_awesome_violet_front_4_3.png',
    specs: {
      screen: '6.4 inch, Super AMOLED, 120Hz',
      cpu: 'Exynos 1380 (5nm)',
      ram: '8GB',
      rom: '128GB',
      battery: '5,000 mAh, Sạc 25W',
    },
    highlights: [
      'Kháng nước kháng bụi chuẩn IP67',
      'Thiết kế mặt lưng kính sang trọng',
      'Camera chống rung quang học OIS',
      'Hỗ trợ kết nối 5G tốc độ cao',
    ],
    stock: 80,
    rating: 4.4,
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 7,
    name: 'Google Pixel 8 Pro',
    price: 16990000,
    oldPrice: 19500000,
    brand: 'Google',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro_7_.png',
    specs: {
      screen: '6.7 inch, LTPO OLED',
      cpu: 'Google Tensor G3',
      ram: '12GB',
      rom: '128GB',
      battery: '5,050 mAh, Sạc 30W',
    },
    highlights: [
      'Trải nghiệm Android thuần mượt mà nhất',
      'Tính năng AI chỉnh sửa ảnh Magic Editor',
      'Camera chụp đêm Night Sight hàng đầu',
      'Hỗ trợ cập nhật phần mềm lên đến 7 năm',
    ],
    stock: 30,
    rating: 4.5,
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 8,
    name: 'Redmi Note 13 Pro+',
    price: 9190000,
    oldPrice: 10990000,
    brand: 'Xiaomi',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png',
    specs: {
      screen: '6.67 inch, AMOLED, 1.5K',
      cpu: 'Dimensity 7200 Ultra',
      ram: '8GB',
      rom: '256GB',
      battery: '5,000 mAh, Sạc thần tốc 120W',
    },
    highlights: [
      'Camera siêu độ phân giải 200MP',
      'Màn hình cong AMOLED cao cấp',
      'Sạc đầy 100% pin chỉ trong 19 phút',
      'Chuẩn kháng nước IP68 lần đầu trên dòng Note',
    ],
    stock: 100,
    rating: 4.3,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function filterProducts(filters: {
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}): { items: Product[]; total: number; page: number; limit: number; totalPages: number } {
  let filtered = [...products];

  // Search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower)
    );
  }

  // Brand filter
  if (filters.brand) {
    filtered = filtered.filter((p) => p.brand === filters.brand);
  }

  // Price range
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  // Sort
  const sortBy = filters.sortBy || 'createdAt';
  const sortOrder = filters.sortOrder || 'desc';
  filtered.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'createdAt':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return { items, total, page, limit, totalPages };
}
