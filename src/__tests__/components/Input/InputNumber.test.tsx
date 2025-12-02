import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputNumber } from '@/components/Input';

describe('InputNumber Component', () => {
  it('should accept numeric input', () => {
    const { container } = render(<InputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });

  it('should accept decimal input by default', () => {
    const { container } = render(<InputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123.45' } });
    expect(input.value).toBe('123.45');
  });

  it('should reject decimal input when allowDecimal is false', () => {
    const { container } = render(<InputNumber allowDecimal={false} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123.45' } });
    // Should remain empty or unchanged because decimal is not allowed
    expect(input.value).not.toContain('.');
  });

  it('should accept negative numbers by default', () => {
    const { container } = render(<InputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '-123' } });
    expect(input.value).toBe('-123');
  });

  it('should reject negative numbers when allowNegative is false', () => {
    const { container } = render(<InputNumber allowNegative={false} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '-123' } });
    // Should reject negative sign
    expect(input.value).not.toContain('-');
  });

  it('should reject non-numeric input', () => {
    const { container } = render(<InputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input.value).toBe('');
  });

  it('should initialize with provided value', () => {
    const { container } = render(<InputNumber value="42" />);
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe('42');
  });
});
