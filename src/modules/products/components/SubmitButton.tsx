import { type FC } from 'react';

import { Button, type ButtonProps } from '@/components';
import type { ProductType } from '@/types';

import { PRODUCT_BUTTON_CONFIG } from '../config';

export type SubmitButtonProps = ButtonProps & {
  productType: ProductType;
};

export const SubmitButton: FC<SubmitButtonProps> = ({ productType, ...props }) => {
  const config = PRODUCT_BUTTON_CONFIG[productType];

  return (
    <Button className={config.className} type="submit" {...props}>
      {config.text}
    </Button>
  );
};
