import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getRequiredFields } from '@/utils';

import { type ZodTypeAny } from 'zod';

// Define the type for the context value
type SchemaContextType = {
  schema: ZodTypeAny | undefined;
  requiredFields: string[];
  setSchema: (schema: ZodTypeAny) => void;
};

const SchemaContext = createContext<SchemaContextType | undefined>({
  schema: undefined,
  requiredFields: [],
  setSchema: () => {},
});

export type SchemaProviderProps = PropsWithChildren & {
  schema?: ZodTypeAny;
};

export const SchemaProvider: FC<SchemaProviderProps> = ({ schema: schemaProps, children }) => {
  const [schema, setSchema] = useState<ZodTypeAny | undefined>(schemaProps);

  useEffect(() => {
    setSchema(schemaProps);
  }, [schemaProps]);

  const requiredFields = useMemo(() => {
    return schema ? getRequiredFields(schema) : [];
  }, [schema]);

  return (
    <SchemaContext.Provider
      value={{
        schema,
        setSchema,
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
