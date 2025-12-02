import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormControl } from '@/components/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/Input';
import type { FC, ReactNode } from 'react';

// Wrapper to provide form context
const FormWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FormControl Component', () => {
  it('should render form control with label', () => {
    const { container } = render(
      <FormWrapper>
        <FormControl name="test" label="Test Label">
          <Input />
        </FormControl>
      </FormWrapper>
    );

    expect(container.textContent).toContain('Test Label');
  });

  it('should render input child element', () => {
    const { container } = render(
      <FormWrapper>
        <FormControl name="username" label="Username">
          <Input />
        </FormControl>
      </FormWrapper>
    );

    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('should not show required indicator when require prop is false', () => {
    const { container } = render(
      <FormWrapper>
        <FormControl name="optional" label="Optional Field">
          <Input />
        </FormControl>
      </FormWrapper>
    );

    const asterisks = container.querySelectorAll('.text-red-600');
    // Should have no asterisk for required indicator
    expect(asterisks.length).toBe(0);
  });

  it('should forward field props to child input', () => {
    const { container } = render(
      <FormWrapper>
        <FormControl name="testField" label="Test">
          <Input />
        </FormControl>
      </FormWrapper>
    );

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.name).toBe('testField');
  });

  it('should render label element', () => {
    const { container } = render(
      <FormWrapper>
        <FormControl name="username" label="Username">
          <Input />
        </FormControl>
      </FormWrapper>
    );

    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toContain('Username');
  });
});
