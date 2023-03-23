import { useAppForm, useState } from 'hooks/hooks';
import { Button } from 'components/common/button/button';
import { Input } from 'components/common/input/input';
import { PasswordInput } from 'components/common/password-input/password-input';
import { userSignUp } from 'common/validation-schemas/user/user-sign-up.validation-schema';
import { UserSignUpFormValues } from 'types/user/user-sign-up-form-values';
import { concatClasses } from 'helpers/helpers';
import { Typography } from 'components/common/typography/typography';
import { signInWithGoogle } from 'api/firebase';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { AuthContainerLink } from 'components/auth/components/auth-container/link/auth-container-link';
import { AppRoutes } from 'common/enum/enum';

interface SignUpFormProps {
  handleSubmitEvent: (data: UserSignUpFormValues) => Promise<void>;
  handleGoogleFail: VoidFunction;
  handleGoogleSuccess: VoidFunction;
}

export const SignUpForm = ({
  handleSubmitEvent,
  handleGoogleSuccess,
  handleGoogleFail,
}: SignUpFormProps) => {
  const { control, errors, handleSubmit, isValid } =
    useAppForm<UserSignUpFormValues>({
      defaultValues: {
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
      },
      validationSchema: userSignUp,
      mode: 'onTouched',
    });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: UserSignUpFormValues) => {
    setIsLoading(true);
    handleSubmitEvent(data)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const labelTypographyProps = {
    color: 'white' as const,
    styleName: 'body2Medium' as const,
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
        <Input
          control={control}
          errors={errors}
          state={errors.email ? 'validationError' : 'base'}
          name="email"
          label="Email"
          placeholder="username@gmail.com"
          className={'mb-4'}
          labelWrapperTypographyProps={labelTypographyProps}
        />
        <Input
          control={control}
          errors={errors}
          state={errors.username ? 'validationError' : 'base'}
          name="username"
          label="User name"
          placeholder="username"
          className={'mb-4'}
          labelWrapperTypographyProps={labelTypographyProps}
        />
        <div className={'grid grid-cols-1 gap-x-5 md:grid-cols-2'}>
          <PasswordInput
            control={control}
            errors={errors}
            state={errors.password ? 'validationError' : 'base'}
            name="password"
            label="Password"
            placeholder="******"
            wrapperClassName={'mb-6'}
            labelWrapperTypographyProps={labelTypographyProps}
          />
          <PasswordInput
            control={control}
            errors={errors}
            state={errors.passwordConfirm ? 'validationError' : 'base'}
            name="passwordConfirm"
            label="Confirm password"
            placeholder="******"
            wrapperClassName={'mb-6'}
            labelWrapperTypographyProps={labelTypographyProps}
          />
        </div>
        <div className={'mb-5 flex flex-col items-center justify-center'}>
          <Button
            ariaLabel={'sign up button'}
            disabled={!isValid}
            isLoading={isLoading}
            name="Sign up"
            className={'h-[44px] w-full'}
            textAlign={'center'}
            type={'submit'}
          >
            Sign Up
          </Button>
          <Typography
            as={'span'}
            color={'grey'}
            styleName={'body3Regular'}
            className={'my-4 inline-block'}
          >
            or continue with
          </Typography>

          <Button
            ariaLabel={'sign up with google button'}
            intent={'base'}
            className={concatClasses([
              'flex',
              'h-[44px]',
              'w-full',
              'justify-center',
              'bg-white',
              'px-[15px]',
              'py-[10px]',
            ])}
            type={'button'}
            onClick={() =>
              signInWithGoogle({
                onError: handleGoogleFail,
                onSuccess: handleGoogleSuccess,
              })
            }
          >
            <Icon
              name={IconName.GOOGLE}
              width={24}
              height={24}
              intent={'base'}
            />
          </Button>
        </div>
        <div className={'flex justify-center'}>
          <AuthContainerLink
            redirectRoute={AppRoutes.SIGN_IN}
            title={'Sign In'}
            prompt={'change you mind?'}
          />
        </div>
      </form>
    </>
  );
};
