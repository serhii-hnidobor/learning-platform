import { collection, getFirestore, addDoc } from 'firebase/firestore/lite';
import { CollectionName } from 'common/enum/enum';

import app from './app';

const db = getFirestore(app);

const coursesCollection = collection(db, CollectionName.COURSES);
const lessonsCollection = collection(db, CollectionName.LESSONS);
const tagsCollection = collection(db, CollectionName.TAGS);
const topicsCollection = collection(db, CollectionName.TOPICS);

const reviewsCollection = collection(db, CollectionName.REVIEWS);
const courseSectionsCollection = collection(db, CollectionName.COURSE_SECTIONS);

const usersCollection = collection(db, CollectionName.USERS);

export {
  coursesCollection,
  courseSectionsCollection,
  topicsCollection,
  tagsCollection,
  lessonsCollection,
  usersCollection,
  reviewsCollection,
  addDoc,
  db,
};
