import {
  CourseDataType,
  CourseSectionType,
  LessonDataType,
  ReviewDataType,
  TagDataType,
  TopicDataType,
  UserDataType,
} from 'types/api/data';
import { CollectionName } from 'common/enum/api/api';

import { WhereFilterOp } from '@firebase/firestore-types';

export type DataObjectType<T> = T extends CollectionName.COURSES
  ? CourseDataType
  : T extends CollectionName.COURSE_SECTIONS
  ? CourseSectionType
  : T extends CollectionName.LESSONS
  ? LessonDataType
  : T extends CollectionName.TAGS
  ? TagDataType
  : T extends CollectionName.TOPICS
  ? TopicDataType
  : T extends CollectionName.USERS
  ? UserDataType
  : T extends CollectionName.REVIEWS
  ? ReviewDataType
  : never;

type DataFieldType =
  | keyof CourseDataType
  | keyof CourseSectionType
  | keyof LessonDataType
  | keyof TagDataType
  | keyof TopicDataType;

export interface GetDataArg {
  name: CollectionName;
  whereOptions?: {
    fieldName: DataFieldType;
    comparator: WhereFilterOp;
    value: unknown;
  };
}

async function getCollectionByName(name: CollectionName) {
  switch (name) {
    case CollectionName.COURSE_SECTIONS: {
      const { courseSectionsCollection } = await import('api/firebase');
      return courseSectionsCollection;
    }
    case CollectionName.COURSES: {
      const { coursesCollection } = await import('api/firebase');
      return coursesCollection;
    }
    case CollectionName.TAGS: {
      const { tagsCollection } = await import('api/firebase');
      return tagsCollection;
    }
    case CollectionName.TOPICS: {
      const { topicsCollection } = await import('api/firebase');
      return topicsCollection;
    }
    case CollectionName.LESSONS: {
      const { lessonsCollection } = await import('api/firebase');
      return lessonsCollection;
    }
    case CollectionName.USERS: {
      const { usersCollection } = await import('api/firebase');
      return usersCollection;
    }
    case CollectionName.REVIEWS: {
      const { reviewsCollection } = await import('api/firebase');
      return reviewsCollection;
    }
    default: {
      const exhaustiveCheck: never = name;
      throw new Error(exhaustiveCheck);
    }
  }
}

export const getData = async <T extends CollectionName>({
  name,
  whereOptions,
}: GetDataArg): Promise<DataObjectType<T>[]> => {
  const { getDocs, query, where } = await import('firebase/firestore/lite');

  const collection = await getCollectionByName(name);

  let queryObj;
  if (whereOptions) {
    const { value, fieldName, comparator } = whereOptions;
    queryObj = query(collection, where(fieldName, comparator, value));
  }

  const querySnapshot = await getDocs(queryObj ? queryObj : collection);
  const data: DataObjectType<T>[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as unknown as DataObjectType<T>);
  });

  return data;
};
