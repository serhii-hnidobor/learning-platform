import {
  DeepPartial,
  Mode,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';

import { getFormValidationResolver } from 'helpers/validation/validation';
import { FormControlErrors } from 'types/form/form-control-error';
import { FormControl } from 'types/form/form-control';
import { ValidationSchema } from 'types/validation/validation-schema.type';
import { FormControlValues } from 'types/form/form-control-values';

type UseAppFormArgs<T> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema<T>;
  mode?: Mode;
};
type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  isValid: boolean;
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
};

/**
 * Hook that provides a set of methods and state for building and validating
 * forms. Uses the react-hook-form library internally.
 *
 * @param validationSchema - A Yup schema object used for form validation.
 * @param defaultValues - Default values for the form fields.
 * @param mode - The mode of the form validation. Can be 'onSubmit', 'onBlur', or 'onChange'.
 *
 * @return An object containing the following properties and methods:
 * - handleSubmit: The submit function for the form.
 * - control: The form control object provided by react-hook-form.
 * - register: A function for registering form inputs with react-hook-form.
 * - errors: The validation errors for the form.
 * - isValid: Whether the form is currently valid or not.
 * - reset: A function for resetting the form to its default values.
 * - getValues: A function for getting the current values of the form.
 * - setValue: A function for setting the value of a specific form field.
 *
 * @typeParam T - A generic type parameter that specifies the shape of the form
 * values object.
 */

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
  mode = 'onSubmit',
}: UseAppFormArgs<T>): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<T>({
    defaultValues,
    resolver: validationSchema
      ? getFormValidationResolver(validationSchema)
      : undefined,
    mode,
  });

  return {
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    control,
    register,
    errors,
    isValid,
    reset,
    getValues,
    setValue,
  };
};

export { useAppForm };
