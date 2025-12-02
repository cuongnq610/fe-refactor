
/**
 * Validate number string based on the following options:
 * - allowDecimal: whether to allow decimal point
 * - allowNegative: whether to allow negative sign
 * The regex for number is constructed by three parts: negative part, integer part, and decimal part
 * 1. Negative part: "-?" (optional)
 * 2. Integer part: "\d*" (zero or more digits)
 * 3. Decimal part: "\.?\d*?" (optional decimal point followed by zero or more digits)
 * The final regex is built by combining these parts based on the options provided
 */
export const validateNumber = ({
    value,
    allowDecimal,
    allowNegative,
}: {
    value: string | number;
    allowNegative: boolean;
    allowDecimal: boolean;
}): boolean => {
    let valueStr = value.toString();

    const negativePart = '-?';
    const integerPart = '\\d*';
    const decimalPart = '\\.?\\d*?';

    let regexStr = '';

    if (allowNegative) {
        regexStr += negativePart;
    }

    regexStr += integerPart;

    if (allowDecimal) {
        regexStr += decimalPart;
    }
    const regex = new RegExp(`^${regexStr}$`, 'g');

    return regex.test(valueStr);
};