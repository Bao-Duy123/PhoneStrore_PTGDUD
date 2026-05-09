import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import LoginPage from '@/app/login/page';
import { renderWithProviders } from '../../vitest.setup';

// Start MSW server for all tests in this suite
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

describe('Login Flow Integration', () => {
  it('should render login form with all required fields', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByPlaceholderText('Nhập số điện thoại')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập mật khẩu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.getByText(/số điện thoại không hợp lệ/i)).toBeInTheDocument();
    });
  });

  it('should login successfully with valid admin credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByPlaceholderText('Nhập số điện thoại'), '0909123456');
    await user.type(screen.getByPlaceholderText('Nhập mật khẩu'), 'admin123');
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).not.toBeNull();
    });
  });

  it('should login successfully with valid user credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByPlaceholderText('Nhập số điện thoại'), 'nguyenvana@email.com');
    await user.type(screen.getByPlaceholderText('Nhập mật khẩu'), 'password123');
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).not.toBeNull();
    });
  });

  it('should show error for invalid credentials', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByPlaceholderText('Nhập số điện thoại'), 'wrongphone');
    await user.type(screen.getByPlaceholderText('Nhập mật khẩu'), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }));

    await waitFor(() => {
      expect(screen.queryByText(/đăng nhập thành công/i)).not.toBeInTheDocument();
    });
  });

  it('should toggle password visibility', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText('Nhập mật khẩu') as HTMLInputElement;
    expect(passwordInput.type).toBe('password');

    const toggleButton = screen.getByRole('button', { name: '' });
    await user.click(toggleButton);
    expect(passwordInput.type).toBe('text');
  });

  it('should navigate to register page', () => {
    renderWithProviders(<LoginPage />);
    const registerLink = screen.getByRole('link', { name: /đăng ký ngay/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
