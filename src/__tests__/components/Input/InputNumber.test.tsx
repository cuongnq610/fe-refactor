import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputNumber } from '@/components/Input';
import { useState } from 'react';

// Wrapper for testing controlled component behavior
const ControlledInputNumber = (props: React.ComponentProps<typeof InputNumber>) => {
  const [value, setValue] = useState(props.value ?? '');
  return (
    <InputNumber
      {...props}
      value={value}
      onChange={(event) => {
        const newValue = typeof event === 'string' ? event : event.target.value;
        setValue(newValue);
        props.onChange?.(newValue);
      }}
    />
  );
};

describe('InputNumber Component', () => {
  it('should accept numeric input', () => {
    const { container } = render(<ControlledInputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');
  });

  it('should accept decimal input by default', () => {
    const { container } = render(<ControlledInputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123.45' } });
    expect(input.value).toBe('123.45');
  });

  it('should reject decimal input when allowDecimal is false', () => {
    const { container } = render(<ControlledInputNumber allowDecimal={false} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '123.45' } });
    // Should remain empty or unchanged because decimal is not allowed
    expect(input.value).not.toContain('.');
  });

  it('should accept negative numbers by default', () => {
    const { container } = render(<ControlledInputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '-123' } });
    expect(input.value).toBe('-123');
  });

  it('should reject negative numbers when allowNegative is false', () => {
    const { container } = render(<ControlledInputNumber allowNegative={false} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '-123' } });
    // Should reject negative sign
    expect(input.value).not.toContain('-');
  });

  it('should reject non-numeric input', () => {
    const { container } = render(<ControlledInputNumber />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input.value).toBe('');
  });

  it('should initialize with provided value', () => {
    const { container } = render(<InputNumber value="42" />);
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe('42');
  });

  it('should call onChange with valid value', () => {
    const handleChange = vi.fn();
    const { container } = render(<ControlledInputNumber onChange={handleChange} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '456' } });
    expect(handleChange).toHaveBeenCalledWith('456');
  });

  it('should not call onChange with invalid value', () => {
    const handleChange = vi.fn();
    const { container } = render(<ControlledInputNumber onChange={handleChange} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
