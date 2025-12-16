import { PRODUCT_TYPE } from '@/constants';
import type { ProductType } from '@/types';


type ButtonConfig = {
  className: string;
  text: string;
}

export const PRODUCT_BUTTON_CONFIG: Record<ProductType, ButtonConfig> = {
  [PRODUCT_TYPE.Shampoo]: {
    className: 'bg-shampoo-bg text-shampoo-text',
    text: 'Add Shampoo',
  },
  [PRODUCT_TYPE.Shoes]: {
    className: 'bg-shoe-bg text-shoe-text',
    text: 'Add Shoes',
  },
  [PRODUCT_TYPE.Soda]: {
    className: 'bg-soda-bg text-soda-text',
    text: 'Add Soda',
  },
}
