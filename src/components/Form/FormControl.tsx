import { type FC, type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/utils';

import { merge } from 'lodash-es';

import { useSchema } from '../Provider';

export type FormControlProps = {
  children: ReactElement;
  name: string;
  label?: ReactNode;
  className?: string;
};

export const FormControl: FC<FormControlProps> = ({ children, label, name, className }) => {
  const { control } = useFormContext();

  const { requiredFields } = useSchema();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const error = fieldState.error;
        const isRequired = requiredFields.includes(field.name);

        // Merge field props with any existing props on the child element
        // Child's explicit props override field props (e.g., custom onChange handlers)
        const childProps = isValidElement(children) ? children.props : {};
        const mergedProps = merge(field, childProps);

        return (
          <div className={cn('flex w-full flex-col gap-1', className)}>
            <label>
              {isRequired && <span className="text-red-600">* </span>}
              {label}
            </label>
            {cloneElement(children, mergedProps)}
            {error && <div className={cn('self-start text-sm text-red-600')}>{error.message}</div>}
          </div>
        );
      }}
    />
  );
};
