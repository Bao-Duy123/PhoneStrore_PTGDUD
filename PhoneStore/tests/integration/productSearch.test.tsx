import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsPage from '@/app/products/page';
import { renderWithProviders } from '../../vitest.setup';

describe('Product Search Integration', () => {
  it('should render products page with heading', () => {
    renderWithProviders(<ProductsPage />);
    expect(screen.getByRole('heading', { name: /tất cả sản phẩm/i })).toBeInTheDocument();
  });

  it('should display products after loading', async () => {
    renderWithProviders(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText(/iPhone 15 Pro Max/i)).toBeInTheDocument();
    });
  });

  it('should show loading state initially (product not visible)', () => {
    renderWithProviders(<ProductsPage />);
    expect(screen.queryByText(/iPhone 15 Pro Max/i)).not.toBeInTheDocument();
  });

  it('should display product count', async () => {
    renderWithProviders(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Có \d+ sản phẩm/i)).toBeInTheDocument();
    });
  });

  it('should have search input', () => {
    renderWithProviders(<ProductsPage />);
    const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should display product prices', async () => {
    renderWithProviders(<ProductsPage />);
    await waitFor(() => {
      expect(screen.getByText(/29\.990\.000/i)).toBeInTheDocument();
    });
  });

  it('should show empty state when no products match', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getAllByText(/Samsung Galaxy/i)).toHaveLength(2);
    });

    const searchInput = screen.getByPlaceholderText('Tìm kiếm sản phẩm...');
    await user.clear(searchInput);
    await user.type(searchInput, 'NonExistentProductXYZ');

    await waitFor(
      () => {
        expect(screen.getByText(/không tìm thấy sản phẩm/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
