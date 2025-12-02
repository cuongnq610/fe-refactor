import type { FC } from "react";
import { ProductCard } from "./ProductCard";
import type { ProductSchema } from "../schema";

type ProductListProps = {
  products: ProductSchema[];
};

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className="flex flex-col gap-3 max-h-[80vh] overflow-auto">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};
