import { ZodArray, ZodNullable, ZodObject, ZodOptional, ZodDefault, type ZodTypeAny } from 'zod';

/**
 * Recursively gets all required field paths from a Zod schema
 * Handles nested objects, arrays, and unwraps optional/nullable/default types
 * 
 * NOTE: Uses `as any` for Zod internal _def properties because Zod doesn't
 * export these types publicly. This is a known limitation - if Zod changes
 * internals, this function may need updates.
 * 
 * @param schema - Zod schema to analyze
 * @param path - Current path traversal (used internally for recursion)
 * @returns Array of required field paths (e.g., ["name", "address.street", "items[0].id"])
 */
export const getRequiredFields = (schema: ZodTypeAny, path: string[] = []): string[] => {
  const requiredFields: string[] = [];

  // Unwrap optional/nullable/default wrappers
  let unwrapped: ZodTypeAny = schema;
  let isOptionalOrDefault = false;
  
  while (unwrapped instanceof ZodOptional || unwrapped instanceof ZodNullable || unwrapped instanceof ZodDefault) {
    if (unwrapped instanceof ZodOptional || unwrapped instanceof ZodNullable) {
      isOptionalOrDefault = true;
    } else if (unwrapped instanceof ZodDefault) {
      // Fields with defaults are not required
      isOptionalOrDefault = true;
    }
    unwrapped = (unwrapped._def as any).innerType;
  }

  // If field is optional/nullable/has default and path exists, don't add it
  if (isOptionalOrDefault && path.length > 0) {
    return requiredFields;
  }

  if (unwrapped instanceof ZodObject) {
    const shape = unwrapped.shape;
    for (const key in shape) {
      requiredFields.push(...getRequiredFields(shape[key], [...path, key]));
    }
  } else if (unwrapped instanceof ZodArray) {
    // For arrays, use index notation [0] for clarity
    const elementSchema = (unwrapped._def as any).type as ZodTypeAny;
    const arrayPath = path.length > 0 ? path.join('.') : '';
    const childPaths = getRequiredFields(elementSchema, []);
    
    childPaths.forEach(childPath => {
      if (arrayPath) {
        requiredFields.push(`${arrayPath}[0].${childPath}`);
      } else {
        requiredFields.push(`[0].${childPath}`);
      }
    });
  } else {
    // All other types (enum, string, number, boolean, etc.) are required if not optional/nullable/default
    if (path.length > 0) {
      requiredFields.push(path.join('.'));
    }
  }

  return requiredFields;
};