import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ControlFactory } from '@/modules/products/components/ControlFactory';
import { PRODUCT_TYPE } from '@/constants';
import { FormProvider, useForm } from 'react-hook-form';
import type { FC, ReactNode } from 'react';
import { SchemaProvider } from '@/components/Provider';

// Wrapper component to provide form context
const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <SchemaProvider>{children}</SchemaProvider>
    </FormProvider>
  );
};

describe('ControlFactory Component', () => {
  it('should render Shampoo controls when type is Shampoo', () => {
    const { container } = render(
      <Wrapper>
        <ControlFactory type={PRODUCT_TYPE.Shampoo} />
      </Wrapper>
    );

    expect(container.querySelector('input[name="brand"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="scent"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="bottleSize"]')).toBeInTheDocument();
  });

  it('should render Shoes controls when type is Shoes', () => {
    const { container } = render(
      <Wrapper>
        <ControlFactory type={PRODUCT_TYPE.Shoes} />
      </Wrapper>
    );

    expect(container.querySelector('input[name="brand"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="shoeSize"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="shoeColor"]')).toBeInTheDocument();
    expect(container.querySelector('select[name="gender"]')).toBeInTheDocument();
  });

  it('should render Soda controls when type is Soda', () => {
    const { container } = render(
      <Wrapper>
        <ControlFactory type={PRODUCT_TYPE.Soda} />
      </Wrapper>
    );

    expect(container.querySelector('input[name="brand"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="flavor"]')).toBeInTheDocument();
    expect(container.querySelector('select[name="packageType"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="servingSize"]')).toBeInTheDocument();
  });

  it('should return null for unknown product type', () => {
    const { container } = render(
      <Wrapper>
        <ControlFactory type={'Unknown' as any} />
      </Wrapper>
    );

    // If null is returned, only the Wrapper div should exist
    expect(container.querySelectorAll('input').length).toBe(0);
    expect(container.querySelectorAll('select').length).toBe(0);
  });
});
