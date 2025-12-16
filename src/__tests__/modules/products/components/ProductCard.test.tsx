import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from '@/modules/products/components/ProductCard';
import { GENDER, PACKAGE_TYPE, PRODUCT_TYPE } from '@/constants';
import type { ProductSchema } from '@/modules/products/schema';

describe('ProductCard Component', () => {
  it('should render Soda specific fields', () => {
    const mockProduct: ProductSchema = {
      productType: PRODUCT_TYPE.Soda,
      name: 'Sprite',
      price: '1.99',
      brand: 'Coca Cola Co',
      flavor: 'Lemon',
      packageType: PACKAGE_TYPE.GlassBottle,
      servingSize: '500ml',
      gender: GENDER.Male,
    };

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Lemon')).toBeInTheDocument();
    expect(screen.getByText(/Bottle, 500ml/)).toBeInTheDocument();
  });

  it('should render Shampoo specific fields', () => {
    const mockProduct: ProductSchema = {
      productType: PRODUCT_TYPE.Shampoo,
      name: 'Head & Shoulders',
      price: '5.99',
      brand: 'Procter & Gamble',
      scent: 'Mint',
      bottleSize: '500ml',
      gender: GENDER.Male,
    };

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Mint')).toBeInTheDocument();
    expect(screen.getByText('Size: 500ml')).toBeInTheDocument();
  });

  it('should render Shoes specific fields', () => {
    const mockProduct: ProductSchema = {
      productType: PRODUCT_TYPE.Shoes,
      name: 'Nike Air Max',
      price: '150',
      brand: 'Nike',
      shoeColor: 'Black',
      shoeSize: '42',
      gender: GENDER.Male,
    };

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Brand: Nike')).toBeInTheDocument();
    expect(screen.getByText('Size: 42 ( European )')).toBeInTheDocument();
    expect(screen.getByText('Color: Black')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
  });

  it('should handle missing optional fields gracefully', () => {
    const mockProduct: ProductSchema = {
      productType: PRODUCT_TYPE.Soda,
      name: 'Generic Soda',
      price: '1',
      brand: '',
      flavor: '',
      bottleSize:  '',
      packageType: PACKAGE_TYPE.Can,
      gender: GENDER.Male,
    };

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Generic Soda')).toBeInTheDocument();
    expect(screen.getByText('1$')).toBeInTheDocument();
  });
});
