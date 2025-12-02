import type { FC } from 'react';

import { FormControl, Input, Select } from '@/components';
import { GENDER_OPTIONS, PACKAGE_TYPE_OPTIONS, PRODUCT_TYPE } from '@/constants';
import type { ProductType } from '@/types';

export type ControlFactoryProps = {
  type: ProductType;
};

export const ControlFactory: FC<ControlFactoryProps> = ({ type }) => {
  switch (type) {
    case PRODUCT_TYPE.Shampoo:
      return (
        <>
          <div className="flex gap-2">
            <FormControl name="brand" label="Brand" className="w-1/2">
              <Input />
            </FormControl>
            <FormControl name="scent" label="Scent" className="w-1/2">
              <Input />
            </FormControl>
          </div>
          <div className="flex gap-2">
            <FormControl name="bottleSize" label="Bottle Size" className="w-1/2">
              <Input />
            </FormControl>
          </div>
        </>
      );
    case PRODUCT_TYPE.Shoes:
      return (
        <>
          <div className="flex gap-2">
            <FormControl name="brand" label="Brand" className="w-1/2">
              <Input />
            </FormControl>
            <FormControl name="shoeSize" label="Shoe size" className="w-1/2">
              <Input />
            </FormControl>
          </div>
          <div className="flex gap-2">
            <FormControl name="shoeColor" label="Shoe color" className="w-1/2">
              <Input />
            </FormControl>
            <FormControl name="gender" label="Gender" className="w-1/2">
              <Select options={GENDER_OPTIONS} />
            </FormControl>
          </div>
        </>
      );

    case PRODUCT_TYPE.Soda:
      return (
        <>
          <div className="flex gap-2">
            <FormControl name="brand" label="Brand" className="w-1/2">
              <Input />
            </FormControl>
            <FormControl name="flavor" label="Flavor" className="w-1/2">
              <Input />
            </FormControl>
          </div>
          <div className="flex gap-2">
            <FormControl name="packageType" label="Package type" className="w-1/2">
              <Select options={PACKAGE_TYPE_OPTIONS} />
            </FormControl>
            <FormControl name="servingSize" label="Serving Size" className="w-1/2">
              <Input />
            </FormControl>
          </div>
        </>
      );

    default:
      return null;
  }
};
