import type { FC } from 'react';

import { Card } from '@/components';

import {
  type ProductSchema,
  isShampooProduct,
  isShoesProduct,
  isSodaProduct,
} from '../schema';

export type ProductCardProps = {
  product: ProductSchema;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, brand, price } = product;

  return (
    <Card className="w-72 bg-[#1c1c1c]">
      <span className="product-name">{name}</span>
      {isSodaProduct(product) && product.flavor && (
        <>
          - <span>{product.flavor}</span>
        </>
      )}
      {isShampooProduct(product) && product.scent && (
        <>
          - <span>{product.scent}</span>
        </>
      )}
      <p className="product-brand">Brand: {brand}</p>
      {isSodaProduct(product) && product.packageType && product.servingSize && (
        <div className="product-brand">
          Size: {product.packageType}, {product.servingSize}
        </div>
      )}
      {isShampooProduct(product) && product.bottleSize && (
        <div className="product-info">Size: {product.bottleSize}</div>
      )}
      {isShoesProduct(product) && product.shoeSize && (
        <div className="product-info">Size: {product.shoeSize} ( European )</div>
      )}
      {isShoesProduct(product) && product.shoeColor && (
        <div className="product-info">Color: {product.shoeColor}</div>
      )}
      {isShoesProduct(product) && product.gender && (
        <div className="product-info">Gender: {product.gender}</div>
      )}
      Price: <span className="product-price">{price}$</span>
    </Card>
  );
};
