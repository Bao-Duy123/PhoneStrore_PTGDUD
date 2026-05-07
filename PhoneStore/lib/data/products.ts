import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: 29990000,
    oldPrice: 34990000,
    brand: 'Apple',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:300:300/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-256-gb.png',
    stock: 10,
    rating: 4.8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 26590000,
    oldPrice: 33990000,
    brand: 'Samsung',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png',
    stock: 15,
    rating: 4.7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Xiaomi 14 Ultra (12GB/256GB)',
    price: 24990000,
    oldPrice: 28990000,
    brand: 'Xiaomi',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-14-ultra.png',
    stock: 8,
    rating: 4.6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'Oppo Find X7 Ultra',
    price: 18500000,
    oldPrice: 21000000,
    brand: 'Oppo',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/e/d/eda006276802c_1_1.jpg',
    stock: 12,
    rating: 4.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: 'iPhone 13 128GB',
    price: 13490000,
    oldPrice: 15990000,
    brand: 'Apple',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-13-pro-max.png',
    stock: 20,
    rating: 4.6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'Samsung Galaxy A54 5G',
    price: 8290000,
    oldPrice: 10490000,
    brand: 'Samsung',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-a546_galaxy_a54_5g_awesome_violet_front_4_3.png',
    stock: 25,
    rating: 4.4,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 7,
    name: 'Google Pixel 8 Pro',
    price: 16990000,
    oldPrice: 19500000,
    brand: 'Google',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google-pixel-8-pro_7_.png',
    stock: 10,
    rating: 4.7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 8,
    name: 'Redmi Note 13 Pro+',
    price: 9190000,
    oldPrice: 10990000,
    brand: 'Xiaomi',
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-redmi-note-13-pro-4g_13__1.png',
    stock: 18,
    rating: 4.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export function getAllProducts(): Product[] {
  return products.map((p) => {
    let discountLabel: string | null = null;
    if (p.oldPrice && p.price < p.oldPrice) {
      const percent = Math.round((1 - p.price / p.oldPrice) * 100);
      discountLabel = `Giảm ${percent}%`;
    }
    return { ...p, discountLabel };
  });
}

export function findProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
