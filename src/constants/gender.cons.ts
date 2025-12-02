import type { Option } from "@/components";

export const GENDER = {
    Male: 'Male',
    Female: 'Female',
    Unisex: 'Unisex'
}

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