import { AuthContainer } from 'components/auth/components/auth-container/auth-container';
import { SignInFormValues } from 'types/user/user-sign-in-form-values';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'api/auth';
import { createToastNotification } from 'components/common/toast-notification/index';
import { AppRoutes, AuthErrorMessages } from 'common/enum/app/app';
import { FireBaseErrorCode } from 'common/enum/api/api';
import { useContext, useRouter } from 'hooks/hooks';
import { AppContext } from 'pages/_app';
import { appContextProvideCheck } from 'helpers/context/context';

import dynamic from 'next/dynamic';

const SignInForm = dynamic(
  import('components/auth/components/sign-in-form/sign-in-form'),
);

const SignInPage = () => {
  const appContext = useContext(AppContext);

  const Router = useRouter();

  const redirectRoute =
    typeof location === 'undefined'
      ? ''
      : new URLSearchParams(location.search).get('from') || AppRoutes.ROOT;

  const redirectPrev = () => {
    if (redirectRoute.length) {
      Router.replace(redirectRoute);
    }
  };

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const checkedAppContext = appContextProvideCheck(appContext);
      const { email, password } = data;
      const res = await signInWithEmailAndPassword(auth, email, password);

      const { currentUser } = auth;

      if (!currentUser?.emailVerified) {
        createToastNotification({
          type: 'error',
          title: 'sign in error',
          message: AuthErrorMessages.EMAIL_NOT_VERIFIED,
        });

        return;
      }

      const { uid } = res.user;

      checkedAppContext.setUser({ id: uid, email });

      redirectPrev();
    } catch (e: unknown) {
      const isKnownError = typeof e === 'object' && e !== null && 'code' in e;

      if (
        isKnownError &&
        (e?.code === FireBaseErrorCode.USER_NOT_FOUND ||
          e?.code === FireBaseErrorCode.WRONG_PASSWORD)
      ) {
        createToastNotification({
          type: 'error',
          title: 'sign in error',
          message: AuthErrorMessages.INVALID_CREDENTIAL,
        });
        return;
      }

      console.error(e);
      createToastNotification({
        type: 'error',
        title: 'sign up error',
        message: AuthErrorMessages.UNKNOWN_ERROR,
      });
      return;
    }
  };

  const handleGoogleSuccess = () => {
    redirectPrev();
  };

  const handleGoogleFail = () => {
    createToastNotification({
      title: 'google auth',
      type: 'error',
      message: AuthErrorMessages.GOOGLE_ERROR,
    });
  };

  return (
    <div className={'flex h-[100vh] items-center justify-center'}>
      <AuthContainer title={'sign in'}>
        <SignInForm
          handleSubmitEvent={onSubmit}
          handleGoogleFail={handleGoogleFail}
          handleGoogleSuccess={handleGoogleSuccess}
        />
      </AuthContainer>
    </div>
  );
};

export default SignInPage;
