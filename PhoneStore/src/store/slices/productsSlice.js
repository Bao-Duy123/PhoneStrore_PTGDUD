import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'phonestore_products';

const defaultProducts = [
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
    image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png',
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
    stock: 30,
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
      camera: '50MP + 12MP + 5MP',
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

function loadProductsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Error loading products from storage:', e);
  }
  return defaultProducts;
}

function saveProductsToStorage(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving products to storage:', e);
  }
}

const initialProducts = loadProductsFromStorage();

const initialState = {
  items: initialProducts,
  filteredItems: initialProducts,
  selectedProduct: null,
  filters: {
    search: '',
    brand: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    pageSize: 12,
    total: initialProducts.length,
    totalPages: Math.ceil(initialProducts.length / 12),
  },
  isLoading: false,
  error: null,
};

function filterAndPaginate(products, filters, page, pageSize) {
  let filtered = [...products];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      p => p.name.toLowerCase().includes(searchLower) || p.brand.toLowerCase().includes(searchLower)
    );
  }

  if (filters.brand) {
    filtered = filtered.filter(p => p.brand === filters.brand);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }

  filtered.sort((a, b) => {
    const { sortBy = 'createdAt', sortOrder = 'desc' } = filters;
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

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const items = filtered.slice(startIndex, startIndex + pageSize);

  return { items, total, page, pageSize, totalPages };
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
      const result = filterAndPaginate(state.items, state.filters, 1, state.pagination.pageSize);
      state.filteredItems = result.items;
      state.pagination = { ...state.pagination, ...result };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        brand: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      };
      state.pagination.page = 1;
      const result = filterAndPaginate(state.items, state.filters, 1, state.pagination.pageSize);
      state.filteredItems = result.items;
      state.pagination = { ...state.pagination, ...result };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
      const result = filterAndPaginate(state.items, state.filters, action.payload, state.pagination.pageSize);
      state.filteredItems = result.items;
      state.pagination = { ...state.pagination, ...result };
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.items.unshift(action.payload);
      state.filteredItems = state.items;
      state.pagination.total = state.items.length;
      state.pagination.totalPages = Math.ceil(state.items.length / state.pagination.pageSize);
      saveProductsToStorage(state.items);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = state.items;
        saveProductsToStorage(state.items);
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.filteredItems = state.items;
      state.pagination.total = state.items.length;
      state.pagination.totalPages = Math.ceil(state.items.length / state.pagination.pageSize);
      saveProductsToStorage(state.items);
    },
    reloadProducts: (state) => {
      const loadedProducts = loadProductsFromStorage();
      state.items = loadedProducts;
      state.filteredItems = loadedProducts;
      state.pagination.total = loadedProducts.length;
      state.pagination.totalPages = Math.ceil(loadedProducts.length / state.pagination.pageSize);
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setPage,
  setSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  reloadProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
