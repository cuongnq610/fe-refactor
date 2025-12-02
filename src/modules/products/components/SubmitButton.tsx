import { Button, type ButtonProps } from "@/components";
import { PRODUCT_TYPE } from "@/constants";
import type { ProductType } from "@/types";
import { useMemo, type FC } from "react";

export type SubmitButtonProps = ButtonProps & {
  productType: ProductType;
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  productType,
  ...props
}) => {
  const configByType = useMemo(() => {
    switch (productType) {
      case PRODUCT_TYPE.Shampoo:
        return {
          className: "bg-shampoo-bg text-shampoo-text",
          text: "Add Shampoo",
        };
      case PRODUCT_TYPE.Shoes:
        return {
          className: "bg-shoe-bg text-shoe-text",
          text: "Add Shoes",
        };
      case PRODUCT_TYPE.Soda:
        return {
          className: "bg-soda-bg text-soda-text",
          text: "Add Soda",
        };
      default:
        return null;
    }
  }, [productType]);

  return (
    <Button className={configByType?.className} type="submit" {...props}>
      {configByType?.text}
    </Button>
  );
};
