import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SubmitButton } from '@/modules/products/components/SubmitButton';
import { PRODUCT_TYPE } from '@/constants';

describe('SubmitButton Component', () => {
  it('should render button with Soda text and styling when product type is Soda', () => {
    render(<SubmitButton productType={PRODUCT_TYPE.Soda} onClick={vi.fn()} />);

    const button = screen.getByRole('button', { name: /add soda/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-soda-bg');
    expect(button.className).toContain('text-soda-text');
  });

  it('should render button with Shampoo text and styling when product type is Shampoo', () => {
    render(<SubmitButton productType={PRODUCT_TYPE.Shampoo} onClick={vi.fn()} />);

    const button = screen.getByRole('button', { name: /add shampoo/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-shampoo-bg');
    expect(button.className).toContain('text-shampoo-text');
  });

  it('should render button with Shoes text and styling when product type is Shoes', () => {
    render(<SubmitButton productType={PRODUCT_TYPE.Shoes} onClick={vi.fn()} />);

    const button = screen.getByRole('button', { name: /add shoes/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-shoe-bg');
    expect(button.className).toContain('text-shoe-text');
  });
});
