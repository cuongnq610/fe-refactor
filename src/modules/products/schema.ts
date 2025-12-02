import { GENDER, PACKAGE_TYPE, PRODUCT_TYPE } from '@/constants';
import type { ProductType } from '@/types';

import z from 'zod';

export const shoeSchema = z.object({
  shoeSize: z.string().optional(),
  shoeColor: z.string().min(1, 'Required'),
  gender: z.enum(GENDER, 'Required'),
});

export const shampooSchema = z.object({
  scent: z.string().optional(),
  bottleSize: z.string().min(1, 'Required'),
});

export const sodaSchema = z.object({
  flavor: z.string().optional(),
  packageType: z.enum(PACKAGE_TYPE, 'Required'),
  servingSize: z.string().optional(),
});

export const productBaseSchema = z.object({
  productType: z.enum(PRODUCT_TYPE, 'Required'),
  name: z.string().min(1, 'Required'),
  price: z.string().min(1, 'Required'),
  brand: z.string().optional(),
});

export const SCHEMA_BY_PRODUCT_TYPE = {
  [PRODUCT_TYPE.Soda]: productBaseSchema.extend(sodaSchema.shape),
  [PRODUCT_TYPE.Shampoo]: productBaseSchema.extend(shampooSchema.shape),
  [PRODUCT_TYPE.Shoes]: productBaseSchema.extend(shoeSchema.shape),
};

export const generateSchema = (productType: ProductType) => {
  return SCHEMA_BY_PRODUCT_TYPE[productType];
};

export type ProductSchema = z.infer<ReturnType<typeof generateSchema>>;

export const defaultValues: ProductSchema = {
  name: '',
  bottleSize: '',
  price: '',
  productType: PRODUCT_TYPE.Soda,
  shoeColor: '',
  brand: '',
  flavor: '',
  gender: '',
  packageType: '',
  scent: '',
  servingSize: '',
  shoeSize: '',
};
