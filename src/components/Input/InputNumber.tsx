import { type FC, useEffect, useRef, useState } from 'react';

import { validateNumber } from '@/utils';

import { Input, type InputProps } from './Input';

export type InputNumberProps = InputProps & {
  allowDecimal?: boolean;
  allowNegative?: boolean;
  onChange?: (value: string) => void;
};

export const InputNumber: FC<InputNumberProps> = ({
  value: valueProps,
  onChange,
  allowDecimal = true,
  allowNegative = true,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(valueProps?.toString() ?? '');
  }, [valueProps]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const isValid = validateNumber({ value: newValue, allowDecimal, allowNegative });

    if (newValue && !isValid) return;

    setValue(newValue);
    onChange?.(newValue);
  };

  return <Input ref={inputRef} {...restProps} type="tel" value={value} onChange={handleChange} />;
};
