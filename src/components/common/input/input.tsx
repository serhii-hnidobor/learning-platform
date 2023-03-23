import { FormControlErrors } from 'types/form/form-control-error';
import { FormControl } from 'types/form/form-control';
import { FormControlPath } from 'types/form/form-control-path';
import { useFormControl, useId } from 'hooks/hooks';
import { ReactElement } from 'react';
import { FieldValues } from 'react-hook-form';
import { Typography, TypographyProps } from 'components/common/common';
import { inputVariants, InputVariantsType } from './cva-variants/cva-variants';
import { concatClasses } from 'helpers/helpers';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface InputProps<T> extends ComponentBaseProps<'input'> {
  control: FormControl<T>;
  errors: FormControlErrors;
  value?: string;
  label: string;
  name: FormControlPath<T>;
  wrapperClassName?: string;
  errorBoxClassName?: string;
  errorMessageTypographyProps?: TypographyProps<HTMLSpanElement>;
  placeholder?: string;
  state?: NonNullable<InputVariantsType['state']>;
  labelProps?: TypographyProps<HTMLSpanElement>;
  type?: 'text' | 'email' | 'date' | 'password';
  labelWrapperClassName?: string;
  labelWrapperTypographyProps?: Omit<
    TypographyProps<HTMLSpanElement>,
    'children'
  >;
}

const Input = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder = '',
  type = 'text',
  labelWrapperTypographyProps,
  labelWrapperClassName,
  errorBoxClassName,
  wrapperClassName,
  state = 'base',
  className,
  errors: _,
  errorMessageTypographyProps,
  ...restInputProps
}: InputProps<T>): ReactElement | null => {
  const {
    field,
    fieldState: { error },
  } = useFormControl({ name, control });
  const id = useId();

  let inputClassName = inputVariants({ state });

  if (className && className.length) {
    inputClassName = concatClasses([inputClassName, className]);
  }

  return (
    <div className={wrapperClassName}>
      <div className={labelWrapperClassName}>
        <label htmlFor={id}>
          <Typography {...labelWrapperTypographyProps}>{label}</Typography>
        </label>
      </div>
      <div className={'relative pt-6'}>
        <div
          className={concatClasses([
            'absolute',
            'top-0',
            errorBoxClassName || '',
          ])}
        >
          {error && (
            <Typography
              color={'orange-red'}
              styleName={'body2Bold'}
              {...errorMessageTypographyProps}
              as={'span'}
            >
              {error.message}
            </Typography>
          )}
        </div>
        <input
          autoComplete={'input'}
          {...restInputProps}
          {...field}
          type={type}
          placeholder={placeholder}
          className={inputClassName}
          id={id}
        />
      </div>
    </div>
  );
};

export { type InputProps, Input };
