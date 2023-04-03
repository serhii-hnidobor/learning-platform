import {
  User,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import app from './app';

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
interface SignInWithGoogleArg {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
const signInWithGoogle = async ({
  onSuccess,
  onError,
}: SignInWithGoogleArg) => {
  try {
    await signInWithPopup(auth, googleProvider);
    onSuccess();
  } catch (e: unknown) {
    console.error(e);
    onError();
  }
};

export { type User, signInWithGoogle, auth };
