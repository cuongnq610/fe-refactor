import { type FC, useRef } from 'react';

import { validateNumber } from '@/utils';

import { Input, type InputProps } from './Input';

export type InputNumberProps = InputProps & {
  allowDecimal?: boolean;
  allowNegative?: boolean;
  onChange?: (value: string) => void;
};

/**
 * Controlled number input that validates input on change.
 * Only allows valid number characters based on allowDecimal/allowNegative options.
 */
export const InputNumber: FC<InputNumberProps> = ({
  value,
  onChange,
  allowDecimal = true,
  allowNegative = true,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty string, otherwise validate number format
    if (newValue && !validateNumber({ value: newValue, allowDecimal, allowNegative })) {
      return;
    }

    onChange?.(newValue);
  };

  // Normalize value to string for the input
  const displayValue = value?.toString() ?? '';

  return <Input ref={inputRef} {...restProps} type="tel" value={displayValue} onChange={handleChange} />;
};
