import { SignInForm } from 'components/auth/components/sign-in-form/sign-in-form';
import { AuthContainer } from 'components/auth/components/auth-container/auth-container';
import { SignInFormValues } from 'types/user/user-sign-in-form-values';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'api/firebase';
import { createToastNotification } from 'components/common/common';
import { FirebaseError } from '@firebase/util';
import {
  AppRoutes,
  AuthErrorMessages,
  ProtectedRoutes,
} from 'common/enum/app/app';
import { FireBaseErrorCode } from 'common/enum/api/api';
import { useContext, useEffect, useLocation, useNavigate } from 'hooks/hooks';
import { AppContext } from 'components/app/app';
import { appContextProvideCheck } from 'helpers/helpers';
import { sessionStorageService } from 'services/services';
import { SessionStorageKeys } from 'common/enum/session-storage/session-storage-keys';

const SignInPage = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectRoute =
    new URLSearchParams(location.search).get('from') || AppRoutes.ROOT;

  /*
   * it use for prevent redirect loop from protected route
   * when no authorized go to protected route redirect to sign in
   * then don't sign in and try return to prev page by press prev button in browser
   * in this case he redirects back to protected route and then redirect back to sign in
   * i don't found any other way to get access to prev route when user go back by
   * browse button with rect route v6 this code set prev route and protected route
   * can access to it and prevent redirect loop
   */

  useEffect(() => {
    const formRoute = redirectRoute.match(/(?<=\/).+?(?=\/)/);

    if (!formRoute) {
      return;
    }

    if (
      formRoute[0] === ProtectedRoutes.LESSON ||
      formRoute[0] === ProtectedRoutes.COURSE
    ) {
      sessionStorageService.save(
        SessionStorageKeys.PREV_ROUTE,
        AppRoutes.SIGN_IN,
      );
    }
  }, [redirectRoute]);

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
      navigate(redirectRoute, { replace: true });
    } catch (e) {
      if (!(e instanceof FirebaseError)) {
        console.error(e);
        createToastNotification({
          type: 'error',
          title: 'sign up error',
          message: AuthErrorMessages.UNKNOWN_ERROR,
        });
        return;
      }

      if (
        e.code === FireBaseErrorCode.USER_NOT_FOUND ||
        e.code === FireBaseErrorCode.WRONG_PASSWORD
      ) {
        createToastNotification({
          type: 'error',
          title: 'sign in error',
          message: AuthErrorMessages.INVALID_CREDENTIAL,
        });
        return;
      }

      createToastNotification({
        type: 'error',
        title: 'sign in error',
        message: AuthErrorMessages.UNKNOWN_ERROR,
      });
    }
  };

  const handleGoogleSuccess = () => {
    sessionStorageService.remove(SessionStorageKeys.PREV_ROUTE);
    navigate(redirectRoute, { replace: true });
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

export { SignInPage };
