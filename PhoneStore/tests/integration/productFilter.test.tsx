import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import ProductsPage from '@/app/products/page';
import { renderWithProviders } from '../../vitest.setup';

const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 29990000,
    brand: 'Apple',
    image: '/iphone.jpg',
    specs: { screen: '6.7"', cpu: 'A17', ram: '8GB', rom: '256GB', battery: '4422mAh' },
    highlights: [],
    stock: 10,
    rating: 4.8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 26590000,
    brand: 'Samsung',
    image: '/s24.jpg',
    specs: { screen: '6.8"', cpu: 'Snapdragon 8', ram: '12GB', rom: '256GB', battery: '5000mAh' },
    highlights: [],
    stock: 5,
    rating: 4.7,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

const server = setupServer(
  http.get('/api/products', () =>
    HttpResponse.json({ items: mockProducts, total: 2, page: 1, limit: 12, totalPages: 1 })
  )
);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Product Filter by Brand', () => {
  it('should display all products initially', async () => {
    renderWithProviders(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText(/iPhone 15 Pro/i)).toBeInTheDocument();
    });
  });

  it('should also show Samsung product', async () => {
    renderWithProviders(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Samsung Galaxy S24/i)).toBeInTheDocument();
    });
  });

  it('should open filter panel when clicking Bộ lọc button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductsPage />);

    const filterBtn = screen.getByRole('button', { name: /bộ lọc/i });
    await user.click(filterBtn);

    await waitFor(() => {
      expect(screen.getByText(/thương hiệu/i)).toBeInTheDocument();
    });
  });
});
