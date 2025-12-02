import type { FC, SelectHTMLAttributes } from 'react';

export type Option = {
  label: string;
  value: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: Option[];
  placeholder?: string;
  hidePlaceholderOption?: boolean;
};

export const Select: FC<SelectProps> = ({
  options = [],
  hidePlaceholderOption = false,
  placeholder = 'Select...',
  ...rest
}) => {
  return (
    <select {...rest}>
      {!hidePlaceholderOption && <option value="">{placeholder}</option>}
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
