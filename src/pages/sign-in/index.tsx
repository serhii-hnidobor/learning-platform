import { AuthContainer } from 'components/auth/components/auth-container/auth-container';
import { SignInFormValues } from 'types/user/user-sign-in-form-values';
import { createToastNotification } from 'components/common/toast-notification/index';
import { AuthErrorMessages, AuthMessage } from 'common/enum/app/app';

import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getCsrfToken, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import fetch from 'helpers/api/fetch';

const SignInForm = dynamic(
  import('components/auth/components/sign-in-form/sign-in-form'),
);

const SignInPage = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const Router = useRouter();

  const [error, setError] = useState<string | string[]>();

  useDeepCompareEffect(() => {
    setError(Router.query.error);
    if (Router.query) {
      Router.replace('/sign-in', undefined, { shallow: true });
    }
  }, [Router.query]);

  const handleError = () => {
    createToastNotification({
      type: 'error',
      title: 'sign up error',
      message: AuthErrorMessages.UNKNOWN_ERROR,
    });
  };

  useEffect(() => {
    if (error && typeof error === 'string') {
      handleError();
    }
  }, [error]);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signin/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          csrfToken,
          callbackUrl: `${window.location.origin}/browse`,
        }),
      });

      createToastNotification({
        type: 'success',
        title: 'Sign In',
        message: AuthMessage.VERIFICATION_EMAIL_SEND,
      });
    } catch {
      handleError();
      return;
    }
  };

  return (
    <div className={'flex h-[100vh] items-center justify-center'}>
      <AuthContainer title={'sign in'}>
        <SignInForm handleSubmitEvent={onSubmit} providers={providers} />
      </AuthContainer>
    </div>
  );
};

export default SignInPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const csrfToken = await getCsrfToken(context);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], csrfToken, session },
  };
}
