import { describe, it, expect } from 'vitest';
import { formatPrice, calculateDiscount, formatDate, truncate, generateId, getStatusColor } from '@/lib/utils';

describe('formatPrice', () => {
  it('should format price with Vietnamese locale', () => {
    expect(formatPrice(29990000)).toContain('29.990.000');
  });

  it('should handle zero', () => {
    expect(formatPrice(0)).toContain('0');
  });
});

describe('calculateDiscount', () => {
  it('should calculate correct discount percentage', () => {
    expect(calculateDiscount(100, 80)).toBe(20);
  });

  it('should return 0 when prices are equal', () => {
    expect(calculateDiscount(100, 100)).toBe(0);
  });

  it('should return 0 when current price is higher', () => {
    expect(calculateDiscount(80, 100)).toBe(0);
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2024-03-15T10:30:00Z');
    expect(result).toContain('2024');
  });
});

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('should not truncate short strings', () => {
    expect(truncate('Hi', 5)).toBe('Hi');
  });
});

describe('generateId', () => {
  it('should generate unique ids', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should return a string', () => {
    expect(typeof generateId()).toBe('string');
  });
});

describe('getStatusColor', () => {
  it('should return correct color for pending', () => {
    const result = getStatusColor('pending');
    expect(result).toContain('yellow');
  });

  it('should return correct color for delivered', () => {
    const result = getStatusColor('delivered');
    expect(result).toContain('green');
  });

  it('should return correct color for cancelled', () => {
    const result = getStatusColor('cancelled');
    expect(result).toContain('red');
  });
});
