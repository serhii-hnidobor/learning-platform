import { joiResolver } from '@hookform/resolvers/joi';
import { ValidationSchema } from 'types/validation/validation-schema.type';

const getFormValidationResolver = <SchemaObjectType>(
  validationSchema: ValidationSchema<SchemaObjectType>,
) => {
  return joiResolver(validationSchema);
};

export { getFormValidationResolver };
