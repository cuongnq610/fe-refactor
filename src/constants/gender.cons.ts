import type { Option } from "@/components";

export const GENDER = {
    Male: 'Male',
    Female: 'Female',
    Unisex: 'Unisex'
} as const

export const GENDER_VALUES = Object.values(GENDER);

export const GENDER_OPTIONS: Option[] = [
    {
        label: 'Male',
        value: GENDER.Male
    },
    {
        label: 'Female',
        value: GENDER.Female
    },
    {
        label: 'Unisex',
        value: GENDER.Unisex
    },
]