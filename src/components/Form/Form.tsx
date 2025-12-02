import { type FieldValues, FormProvider, type FormProviderProps } from 'react-hook-form';

import type { ZodObject } from 'zod';

import { SchemaProvider } from '../Provider';

export type FormProps<T extends FieldValues> = FormProviderProps<T> & {
  className?: string;
  schema?: ZodObject;
};

export const Form = <TFieldValues extends FieldValues>({
  children,
  className,
  schema,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...props}>
      <SchemaProvider schema={schema}>
        <form className={className}>{children}</form>
      </SchemaProvider>
    </FormProvider>
  );
};
