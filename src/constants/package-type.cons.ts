import type { Option } from "@/components"

export const PACKAGE_TYPE = {
    Can: 'Can',
    PlasticBottle: 'PlasticBottle',
    GlassBottle: 'GlassBottle'
} as const

export const PACKAGE_TYPE_VALUES = Object.values(PACKAGE_TYPE);

export const PACKAGE_TYPE_OPTIONS: Option[] = [
    {
        value: PACKAGE_TYPE.Can,
        label: 'Can'
    },
    {
        value: PACKAGE_TYPE.PlasticBottle,
        label: 'Plastic Bottle'
    },
    {
        value: PACKAGE_TYPE.GlassBottle,
        label: 'Glass Bottle'
    },
]