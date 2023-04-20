import { collection, getFirestore } from 'firebase/firestore/lite';
import { CollectionName } from 'common/enum/enum';
import { getFirebaseConfig } from './helpers/get-firebase-config/get-firebase-config';
import { initializeApp } from 'firebase/app';

const firebaseConfig = getFirebaseConfig();

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const coursesCollection = collection(db, CollectionName.COURSES);
const lessonsCollection = collection(db, CollectionName.LESSONS);
const tagsCollection = collection(db, CollectionName.TAGS);
const topicsCollection = collection(db, CollectionName.TOPICS);

const reviewsCollection = collection(db, CollectionName.REVIEWS);
const courseSectionsCollection = collection(db, CollectionName.COURSE_SECTIONS);

export default function getCollection(name: CollectionName) {
  switch (name) {
    case CollectionName.COURSES: {
      return coursesCollection;
    }
    case CollectionName.REVIEWS: {
      return reviewsCollection;
    }
    case CollectionName.LESSONS: {
      return lessonsCollection;
    }
    case CollectionName.COURSE_SECTIONS: {
      return courseSectionsCollection;
    }
    case CollectionName.TAGS: {
      return tagsCollection;
    }
    case CollectionName.TOPICS: {
      return topicsCollection;
    }
    default: {
      const check: never = name;
      throw new Error(check);
    }
  }
}
