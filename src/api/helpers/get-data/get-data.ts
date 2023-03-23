import {
  CourseDataType,
  CourseSectionType,
  LessonDataType,
  ReviewDataType,
  TagDataType,
  TopicDataType,
  UserDataType,
} from 'types/api/data';
import { getDocs, query, where } from 'firebase/firestore/lite';
import {
  coursesCollection,
  courseSectionsCollection,
  lessonsCollection,
  reviewsCollection,
  tagsCollection,
  topicsCollection,
  usersCollection,
} from 'api/firebase';
import { WhereFilterOp } from '@firebase/firestore-types';
import { CollectionName } from 'common/enum/api/api';

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

function getCollectionByName(name: CollectionName) {
  switch (name) {
    case CollectionName.COURSE_SECTIONS: {
      return courseSectionsCollection;
    }
    case CollectionName.COURSES: {
      return coursesCollection;
    }
    case CollectionName.TAGS: {
      return tagsCollection;
    }
    case CollectionName.TOPICS: {
      return topicsCollection;
    }
    case CollectionName.LESSONS: {
      return lessonsCollection;
    }
    case CollectionName.USERS: {
      return usersCollection;
    }
    case CollectionName.REVIEWS: {
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
  const collection = getCollectionByName(name);

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
