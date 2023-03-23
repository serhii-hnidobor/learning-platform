import { AuthContainer } from 'components/auth/components/auth-container/auth-container';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { addDoc, auth, User, usersCollection } from 'api/firebase';
import { createToastNotification } from 'components/common/common';
import { SignUpForm } from 'components/auth/components/sign-up-form/sign-up-form';
import { UserSignUpFormValues } from 'types/user/user-sign-up-form-values';
import { FirebaseError } from '@firebase/util';
import { FireBaseErrorCode } from 'common/enum/api/api';
import { AppRoutes, AuthErrorMessages, AuthMessage } from 'common/enum/app/app';
import { useNavigate } from 'hooks/hooks';

const SignUpPage = () => {
  const navigate = useNavigate();

  const checkIsSignUpCorrectly = (createdUser: User | null) => {
    if (!createdUser) {
      throw new Error('sign up error new user not created');
    }

    return createdUser;
  };

  const onSubmit = async (data: UserSignUpFormValues) => {
    try {
      const { email, password, username } = data;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(usersCollection, {
        id: user.uid,
        name: username,
        authProvider: 'local',
        email,
      });

      const { currentUser } = auth;

      const checkedCurrentUser = checkIsSignUpCorrectly(currentUser);

      await sendEmailVerification(checkedCurrentUser);
      createToastNotification({
        type: 'success',
        title: 'Sign Up',
        message: AuthMessage.VERIFICATION_EMAIL_SEND,
      });
      await auth.signOut();
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
        e.code === FireBaseErrorCode.CREDENTIAL_ALREADY_USE ||
        e.code === FireBaseErrorCode.EMAIL_ALREADY_USE ||
        e.code === FireBaseErrorCode.ACCOUNT_EXIST_WITH_DIFFERENT_CREDENTIAL
      ) {
        createToastNotification({
          type: 'error',
          title: 'sign up error',
          message: AuthErrorMessages.CREDENTIAL_ALREADY_USE,
        });
        return;
      }

      createToastNotification({
        type: 'error',
        title: 'sign up error',
        message: AuthErrorMessages.UNKNOWN_ERROR,
      });
    }
  };

  const handleGoogleSuccess = async () => {
    const user = auth.currentUser;
    if (!user) {
      handleGoogleFail();
      return;
    }
    await addDoc(usersCollection, {
      id: user.uid,
      authProvider: 'google',
      email: user.email,
    });
    navigate(AppRoutes.ROOT, { replace: true });
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
      <AuthContainer title={'sign up'}>
        <SignUpForm
          handleSubmitEvent={onSubmit}
          handleGoogleSuccess={handleGoogleSuccess}
          handleGoogleFail={handleGoogleFail}
        />
      </AuthContainer>
    </div>
  );
};

export { SignUpPage };
