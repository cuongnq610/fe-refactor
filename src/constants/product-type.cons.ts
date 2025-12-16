import type { Option } from "@/components"

export const PRODUCT_TYPE = {
    Soda: 'Soda',
    Shampoo: 'Shampoo',
    Shoes: 'Shoes'
} as const

export const PRODUCT_TYPE_VALUES = Object.values(PRODUCT_TYPE);

export const PRODUCT_TYPE_OPTIONS: Option[] = [
    {
        label: 'Soda',
        value: PRODUCT_TYPE.Soda
    },
    {
        label: 'Shampoo',
        value: PRODUCT_TYPE.Shampoo
    },
    {
        label: 'Shoes',
        value: PRODUCT_TYPE.Shoes
    },
]