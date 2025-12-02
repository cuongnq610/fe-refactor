import { cn } from "@/utils";
import type { ButtonHTMLAttributes, FC } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ className, ...rest }) => {
  return (
    <button
      className={cn(
        "rounded-lg border border-transparent px-5 py-2.5 cursor-pointer",
        "text-base font-medium",
        className
      )}
      {...rest}
    ></button>
  );
};
