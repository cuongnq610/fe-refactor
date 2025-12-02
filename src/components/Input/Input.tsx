import { type InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  borderless?: boolean;
};

export type InputRef = HTMLInputElement;

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
