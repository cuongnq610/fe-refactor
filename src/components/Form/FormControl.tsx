import { type FC, type ReactElement, type ReactNode, cloneElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/utils';

import { assign } from 'lodash-es';

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
        // The priority of children props is higher than field.
        // Normally the react-hook-form will handle the changing value, but with special cases it should be handled outside
        const forwardedProps = assign(field, children.props);

        const error = fieldState.error;

        const require = requiredFields.includes(field.name);

        return (
          <div className={cn('flex w-full flex-col gap-1', className)}>
            <label>
              {require && <span className="text-red-600">* </span>}
              {label}
            </label>
            {cloneElement(children, { ...forwardedProps })}
            {error && <div className={cn('self-start text-sm text-red-600')}>{error.message}</div>}
          </div>
        );
      }}
    />
  );
};
