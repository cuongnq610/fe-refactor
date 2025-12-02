import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Form, FormControl, Select } from '@/components';
import { Input, InputNumber } from '@/components';
import { PRODUCT_TYPE_OPTIONS } from '@/constants';
import type { ProductType } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';

import { ControlFactory, ProductList, SubmitButton } from './components';
import { type ProductSchema, defaultValues, generateSchema } from './schema';

export const Products = () => {
  const [schema, setSchema] = useState(generateSchema(defaultValues.productType));

  const methods = useForm<ProductSchema>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { control, getValues, setValue, reset, handleSubmit } = methods;

  const productType = useWatch({
    control,
    name: 'productType',
  });

  const [allProducts, setAllProducts] = useState<Array<ProductSchema>>([]);

  const clearForm = useCallback(() => {
    const productType = getValues('productType');
    reset();
    setValue('productType', productType);
  }, [reset, getValues, setValue]);

  const regenerateSchema = useCallback((_productType: ProductType) => {
    setSchema(generateSchema(_productType));
  }, []);

  useEffect(() => {
    clearForm();
    regenerateSchema(productType);
  }, [productType, clearForm, regenerateSchema]);

  const onSubmit = () => {
    const formValues = methods.getValues();
    setAllProducts(prev => [...prev, formValues]);
    clearForm();
  };

  return (
    <div className="flex items-center justify-center gap-48">
      <Form {...methods} schema={schema} className="flex max-w-[420px] flex-col gap-2">
        <FormControl name="productType" label="Product Type">
          <Select options={PRODUCT_TYPE_OPTIONS} hidePlaceholderOption />
        </FormControl>
        <div className="flex gap-2">
          <FormControl name="name" label="Name">
            <Input />
          </FormControl>
          <FormControl name="price" label="Price">
            <InputNumber />
          </FormControl>
        </div>
        <ControlFactory type={productType} />

        <SubmitButton productType={productType} onClick={handleSubmit(onSubmit)} />
      </Form>

      <ProductList products={allProducts} />
    </div>
  );
};
