import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Products } from '@/modules/products/Products';
import { PRODUCT_TYPE } from '@/constants';

describe('Products Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default product type as Soda', () => {
    render(<Products />);
    const productTypeSelect = document.querySelector('select[name="productType"]') as HTMLSelectElement;
    expect(productTypeSelect).toHaveValue(PRODUCT_TYPE.Soda);
  });

  it('should render Soda specific fields when product type is Soda', () => {
    render(<Products />);

    expect(document.querySelector('input[name="brand"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="flavor"]')).toBeInTheDocument();
    expect(document.querySelector('select[name="packageType"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="servingSize"]')).toBeInTheDocument();
  });

  it('should change form fields when product type changes to Shampoo', async () => {
    render(<Products />);
    const productTypeSelect = document.querySelector('select[name="productType"]') as HTMLSelectElement;

    await userEvent.selectOptions(productTypeSelect, PRODUCT_TYPE.Shampoo);

    await waitFor(() => {
      expect(document.querySelector('input[name="brand"]')).toBeInTheDocument();
      expect(document.querySelector('input[name="scent"]')).toBeInTheDocument();
      expect(document.querySelector('input[name="bottleSize"]')).toBeInTheDocument();
    });
  });

  it('should change form fields when product type changes to Shoes', async () => {
    render(<Products />);
    const productTypeSelect = document.querySelector('select[name="productType"]') as HTMLSelectElement;

    await userEvent.selectOptions(productTypeSelect, PRODUCT_TYPE.Shoes);

    await waitFor(() => {
      expect(document.querySelector('input[name="brand"]')).toBeInTheDocument();
      expect(document.querySelector('input[name="shoeSize"]')).toBeInTheDocument();
      expect(document.querySelector('input[name="shoeColor"]')).toBeInTheDocument();
      expect(document.querySelector('select[name="gender"]')).toBeInTheDocument();
    });
  });

  it('should clear form except product type when product type changes', async () => {
    render(<Products />);

    const inputs = screen.getAllByDisplayValue('') as HTMLInputElement[];
    const nameInput = inputs.find(i => i.getAttribute('name') === 'name') as HTMLInputElement;
    const priceInput = inputs.find(i => i.getAttribute('name') === 'price') as HTMLInputElement;
    const productTypeSelect = screen.getByDisplayValue(PRODUCT_TYPE.Soda) as HTMLSelectElement;

    await userEvent.type(nameInput, 'Test Product');
    await userEvent.type(priceInput, '100');

    expect(nameInput.value).toBe('Test Product');
    expect(priceInput.value).toBe('100');

    await userEvent.selectOptions(productTypeSelect, PRODUCT_TYPE.Shampoo);

    await waitFor(() => {
      const updatedInputs = document.querySelectorAll('input[name="name"]') as NodeListOf<HTMLInputElement>;
      expect(updatedInputs[0].value).toBe('');
      expect((document.querySelector('input[name="price"]') as HTMLInputElement).value).toBe('');
      expect(productTypeSelect.value).toBe(PRODUCT_TYPE.Shampoo);
    });
  });

  it('should add product to list on form submission', async () => {
    render(<Products />);

    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const priceInput = document.querySelector('input[name="price"]') as HTMLInputElement;
    const packageTypeSelect = document.querySelector('select[name="packageType"]') as HTMLSelectElement;
    const submitButton = screen.getByRole('button', { name: /add soda/i });

    await userEvent.type(nameInput, 'Coca Cola');
    await userEvent.type(priceInput, '2.5');
    await userEvent.selectOptions(packageTypeSelect, 'Can');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Coca Cola')).toBeInTheDocument();
      expect(screen.getByText('2.5$')).toBeInTheDocument();
    });
  });

  it('should clear form after successful submission', async () => {
    render(<Products />);

    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const priceInput = document.querySelector('input[name="price"]') as HTMLInputElement;
    const packageTypeSelect = document.querySelector('select[name="packageType"]') as HTMLSelectElement;
    const submitButton = screen.getByRole('button', { name: /add soda/i });

    await userEvent.type(nameInput, 'Pepsi');
    await userEvent.type(priceInput, '2');
    await userEvent.selectOptions(packageTypeSelect, 'Can');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect((document.querySelector('input[name="name"]') as HTMLInputElement).value).toBe('');
      expect((document.querySelector('input[name="price"]') as HTMLInputElement).value).toBe('');
    });
  });
});
