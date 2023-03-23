import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore/lite';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { CollectionName } from 'common/enum/enum';
import { getFirebaseConfig } from './helpers/helpers';

const firebaseConfig = getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const coursesCollection = collection(db, CollectionName.COURSES);
const lessonsCollection = collection(db, CollectionName.LESSONS);
const tagsCollection = collection(db, CollectionName.TAGS);
const topicsCollection = collection(db, CollectionName.TOPICS);

const reviewsCollection = collection(db, CollectionName.REVIEWS);
const courseSectionsCollection = collection(db, CollectionName.COURSE_SECTIONS);

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

const usersCollection = collection(db, CollectionName.USERS);

export {
  coursesCollection,
  courseSectionsCollection,
  topicsCollection,
  tagsCollection,
  lessonsCollection,
  usersCollection,
  reviewsCollection,
  auth,
  addDoc,
  signInWithGoogle,
  db,
  type User,
};
