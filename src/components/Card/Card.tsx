import { cn } from "@/utils";
import type { FC, PropsWithChildren } from "react";

export type CardProps = PropsWithChildren & {
  className?: string;
};

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#333] p-4",
        "text-[#f0f0f0] shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};
