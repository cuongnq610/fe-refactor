import classNames, { type ArgumentArray } from 'classnames';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for combining Tailwind classes with proper merging.
 * Uses classnames for conditional logic and tailwind-merge to handle conflicts.
 */
export const cn = (...inputs: ArgumentArray) => {
    return twMerge(classNames(inputs));
};
