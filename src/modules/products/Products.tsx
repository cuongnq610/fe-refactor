import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Form, FormControl, Select } from '@/components';
import { Input, InputNumber } from '@/components';
import { PRODUCT_TYPE_OPTIONS } from '@/constants';

import { zodResolver } from '@hookform/resolvers/zod';

import { ControlFactory, ProductList, SubmitButton } from './components';
import {
  DEFAULT_PRODUCT_TYPE,
  type ProductSchema,
  generateSchema,
  getDefaultValues,
} from './schema';

export const Products = () => {
  const [schema, setSchema] = useState(generateSchema(DEFAULT_PRODUCT_TYPE));

  const methods = useForm<ProductSchema>({
    defaultValues: getDefaultValues(DEFAULT_PRODUCT_TYPE),
    resolver: zodResolver(schema),
  });

  const { control, reset, handleSubmit } = methods;

  const productType = useWatch({
    control,
    name: 'productType',
  });

  const [allProducts, setAllProducts] = useState<Array<ProductSchema>>([]);

  // When product type changes, update schema and reset form with new defaults
  useEffect(() => {
    const newSchema = generateSchema(productType);
    setSchema(newSchema);
    reset(getDefaultValues(productType));
  }, [productType, reset]);

  const onSubmit = () => {
    const formValues = methods.getValues();
    setAllProducts(prev => [...prev, formValues]);
    reset(getDefaultValues(productType));
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
