import type { FC } from 'react';

import { Card } from '@/components';

import { get } from 'lodash-es';

import type { ProductSchema } from '../schema';

export type ProductCardProps = {
  product: ProductSchema;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const name = get(product, 'name');
  const brand = get(product, 'brand');
  const price = get(product, 'price');
  const flavor = get(product, 'flavor');
  const scent = get(product, 'scent');
  const packageType = get(product, 'packageType');
  const servingSize = get(product, 'servingSize');
  const bottleSize = get(product, 'bottleSize');
  const shoeSize = get(product, 'shoeSize');
  const shoeColor = get(product, 'shoeColor');
  const gender = get(product, 'gender');

  return (
    <Card className="w-72 bg-[#1c1c1c]">
      <span className="product-name">{name}</span>
      {flavor && (
        <>
          - <span>{flavor}</span>
        </>
      )}
      {scent && (
        <>
          - <span>{scent}</span>
        </>
      )}
      <p className="product-brand">Brand: {brand}</p>
      {packageType && servingSize && (
        <div className="product-brand">
          Size: {packageType}, {servingSize}
        </div>
      )}
      {bottleSize && <div className="product-info">Size: {bottleSize}</div>}
      {shoeSize && <div className="product-info">Size: {shoeSize} ( European )</div>}
      {shoeColor && <div className="product-info">Color: {shoeColor}</div>}
      {gender && <div className="product-info">Gender: {gender}</div>}
      Price: <span className="product-price">{price}$</span>
    </Card>
  );
};
