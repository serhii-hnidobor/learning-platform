import { useState } from 'react';
import useAppForm from 'hooks/use-app-form';
import Button from 'components/common/button/button';
import { Input } from 'components/common/input/input';
import { SignInFormValues } from 'types/user/user-sign-in-form-values';
import { userSignIn } from 'common/validation-schemas/validation-schemas';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { Typography } from 'components/common/typography/typography';
import { concatClasses } from 'helpers/string/string';
import { AuthContainerLink } from 'components/auth/components/auth-container/link/auth-container-link';
import { AppRoutes } from 'common/enum/enum';
import { Providers } from 'types/auth/auth';
import { signIn } from 'next-auth/react';

interface SignInFormProps {
  handleSubmitEvent: (data: SignInFormValues) => Promise<void>;
  providers: Providers;
}

const SignInForm = ({ handleSubmitEvent, providers }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, errors, handleSubmit, isValid } =
    useAppForm<SignInFormValues>({
      defaultValues: { email: '' },
      validationSchema: userSignIn,
      mode: 'onTouched',
    });

  const onSubmit = (data: SignInFormValues) => {
    setIsLoading(true);
    handleSubmitEvent(data)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
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
          className={'mb-4 hover:bg-transparent'}
          labelWrapperTypographyProps={{
            color: 'white',
            styleName: 'body2Medium',
          }}
        />
        <div className={'mb-5 flex flex-col items-center justify-center'}>
          <Button
            ariaLabel={'sign in button'}
            disabled={!isValid}
            name="Sign in"
            isLoading={isLoading}
            className={'h-[44px] w-full'}
            textAlign={'center'}
          >
            Sign In
          </Button>
          <Typography
            as={'span'}
            color={'grey'}
            styleName={'body3Regular'}
            className={'my-4 inline-block'}
          >
            or continue with
          </Typography>
          {Object.values(providers).map((provider) => {
            if (provider.type === 'email') {
              return null;
            }

            return (
              <div key={provider.name} className={'w-full'}>
                <Button
                  ariaLabel={'sign in with google button'}
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
                  onClick={() => signIn(provider.id)}
                >
                  <Icon
                    name={IconName.GOOGLE}
                    width={24}
                    height={24}
                    intent={'base'}
                  />
                </Button>
              </div>
            );
          })}
        </div>
        <div className={'flex items-center justify-center'}>
          <AuthContainerLink
            redirectRoute={AppRoutes.SIGN_UP}
            title={'Sign up'}
            prompt={'Already have an account?'}
          />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
