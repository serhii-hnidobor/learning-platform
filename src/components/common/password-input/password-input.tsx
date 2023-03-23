import { FormControlErrors } from 'types/form/form-control-error';
import { FormControl } from 'types/form/form-control';
import { FormControlPath } from 'types/form/form-control-path';
import { useFormControl, useId, useRef, useState } from 'hooks/hooks';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { FieldValues } from 'react-hook-form';
import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';
import {
  passwordInputVariants,
  passwordInputVariantsType,
} from './cva-variants/cva-variants';
import { concatClasses } from 'helpers/helpers';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { Button } from 'components/common/button/button';

interface PasswordInputProps<T> extends ComponentBaseProps<'input'> {
  control: FormControl<T>;
  errors: FormControlErrors;
  value?: string;
  label: string;
  name: FormControlPath<T>;
  wrapperClassName?: string;
  passwordInputWrapperClassName?: string;
  labelWrapperClassName?: string;
  labelWrapperTypographyProps?: Omit<
    TypographyProps<HTMLSpanElement>,
    'children'
  >;
  errorBoxClassName?: string;
  errorMessageTypographyProps?: TypographyProps<HTMLSpanElement>;
  placeholder?: string;
  state?: NonNullable<passwordInputVariantsType['state']>;
}

const PasswordInput = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder = '',
  errorBoxClassName,
  labelWrapperTypographyProps,
  labelWrapperClassName,
  passwordInputWrapperClassName,
  wrapperClassName,
  state = 'base',
  errorMessageTypographyProps,
  errors: _,
  className,
  ...restInputProps
}: PasswordInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useFormControl({ name, control });
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let passwordInputClassName = passwordInputVariants({ state });

  if (className && className.length) {
    passwordInputClassName = concatClasses([passwordInputClassName, className]);
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
              {...errorMessageTypographyProps}
              as={'span'}
              styleName={'body2Bold'}
            >
              {error.message}
            </Typography>
          )}
        </div>
        <div
          className={concatClasses([
            'input-wrapper',
            'relative',
            passwordInputWrapperClassName || '',
          ])}
        >
          <input
            {...restInputProps}
            {...field}
            autoComplete={'password input'}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={placeholder}
            className={passwordInputClassName}
            id={id}
          />
          <Button
            ariaLabel={'change password visibility'}
            intent={'inline'}
            type={'button'}
            className={'translate-y-negative-1/2 absolute right-2 top-[50%]'}
            isAnimated={false}
            onClick={() => {
              setIsPasswordVisible((prevValue) => !prevValue);
              if (inputRef && inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            <Icon
              name={isPasswordVisible ? IconName.EYE_CLOSE : IconName.EYE}
              stroke={'grey'}
              fill={'grey'}
              width={20}
              height={20}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { type PasswordInputProps, PasswordInput };
