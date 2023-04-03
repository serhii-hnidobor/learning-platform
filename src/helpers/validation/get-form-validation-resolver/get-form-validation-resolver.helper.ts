import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationSchema } from 'types/validation/validation-schema.type';

const getFormValidationResolver = <SchemaObjectType>(
  validationSchema: ValidationSchema<SchemaObjectType>,
) => {
  return yupResolver(validationSchema);
};

export { getFormValidationResolver };
