import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';
import { renderWithProviders } from '../../vitest.setup';

describe('Button', () => {
  it('should render children', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should apply primary variant by default', () => {
    const { container } = renderWithProviders(<Button>Primary</Button>);
    expect(container.firstChild).toHaveClass('bg-[#ff4d4f]');
  });

  it('should apply danger variant', () => {
    const { container } = renderWithProviders(<Button variant="danger">Danger</Button>);
    expect(container.firstChild).toHaveClass('bg-red-500');
  });

  it('should apply outline variant', () => {
    const { container } = renderWithProviders(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toHaveClass('border');
  });

  it('should be disabled when isLoading is true', () => {
    renderWithProviders(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithProviders(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
