import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { getRequiredFields } from '@/utils';

import { type ZodTypeAny } from 'zod';

// Define the type for the context value
type SchemaContextType = {
  schema: ZodTypeAny | undefined;
  requiredFields: string[];
};

const SchemaContext = createContext<SchemaContextType | undefined>(undefined);

export type SchemaProviderProps = PropsWithChildren & {
  schema?: ZodTypeAny;
};

export const SchemaProvider: FC<SchemaProviderProps> = ({ schema, children }) => {
  // Derive required fields directly from prop - no need for internal state
  const requiredFields = useMemo(() => {
    return schema ? getRequiredFields(schema) : [];
  }, [schema]);

  return (
    <SchemaContext.Provider
      value={{
        schema,
        requiredFields,
      }}
    >
      {children}
    </SchemaContext.Provider>
  );
};

export const useSchema = () => {
  const context = useContext(SchemaContext);
  if (context === undefined) {
    throw new Error('useSchema must be used within a SchemaProvider');
  }
  return context;
};
