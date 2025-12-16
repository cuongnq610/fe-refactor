import { GENDER_VALUES, PACKAGE_TYPE_VALUES, PRODUCT_TYPE, PRODUCT_TYPE_VALUES, VALIDATION_MESSAGES } from '@/constants';
import type { ProductType } from '@/types';

import z from 'zod';

export const shoeSchema = z.object({
  shoeSize: z.string().optional(),
  shoeColor: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  gender: z.enum(GENDER_VALUES, VALIDATION_MESSAGES.REQUIRED),
});

export const shampooSchema = z.object({
  scent: z.string().optional(),
  bottleSize: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
});

export const sodaSchema = z.object({
  flavor: z.string().optional(),
  packageType: z.enum(PACKAGE_TYPE_VALUES, VALIDATION_MESSAGES.REQUIRED),
  servingSize: z.string().optional(),
});

export const productBaseSchema = z.object({
  productType: z.enum(PRODUCT_TYPE_VALUES, VALIDATION_MESSAGES.REQUIRED),
  name: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  price: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
  brand: z.string().optional(),
});

const baseDefaults = {
  name: '',
  price: '',
  brand: '',
};

export const DEFAULT_VALUES_BY_TYPE = {
  [PRODUCT_TYPE.Soda]: {
    ...baseDefaults,
    productType: PRODUCT_TYPE.Soda,
    flavor: '',
    packageType: '',
    servingSize: '',
  },
  [PRODUCT_TYPE.Shampoo]: {
    ...baseDefaults,
    productType: PRODUCT_TYPE.Shampoo,
    scent: '',
    bottleSize: '',
  },
  [PRODUCT_TYPE.Shoes]: {
    ...baseDefaults,
    productType: PRODUCT_TYPE.Shoes,
    shoeSize: '',
    shoeColor: '',
    gender: '',
  },
} as const;

export const DEFAULT_PRODUCT_TYPE = PRODUCT_TYPE.Soda;

export const SCHEMA_BY_PRODUCT_TYPE = {
  [PRODUCT_TYPE.Soda]: productBaseSchema.extend(sodaSchema.shape),
  [PRODUCT_TYPE.Shampoo]: productBaseSchema.extend(shampooSchema.shape),
  [PRODUCT_TYPE.Shoes]: productBaseSchema.extend(shoeSchema.shape),
};

export const generateSchema = (productType: ProductType) => {
  return SCHEMA_BY_PRODUCT_TYPE[productType];
};

export const getDefaultValues = (productType: ProductType) => {
  return DEFAULT_VALUES_BY_TYPE[productType];
};

// Explicit types for each product variant - enables type narrowing via productType
export type SodaProduct = z.infer<typeof SCHEMA_BY_PRODUCT_TYPE.Soda>;
export type ShampooProduct = z.infer<typeof SCHEMA_BY_PRODUCT_TYPE.Shampoo>;
export type ShoesProduct = z.infer<typeof SCHEMA_BY_PRODUCT_TYPE.Shoes>;

export type ProductSchema = SodaProduct | ShampooProduct | ShoesProduct;

// Type guards for discriminated union - these let us narrow without "as any"
export const isSodaProduct = (product: ProductSchema): product is SodaProduct => {
  return product.productType === PRODUCT_TYPE.Soda;
};

export const isShampooProduct = (product: ProductSchema): product is ShampooProduct => {
  return product.productType === PRODUCT_TYPE.Shampoo;
};

export const isShoesProduct = (product: ProductSchema): product is ShoesProduct => {
  return product.productType === PRODUCT_TYPE.Shoes;
};