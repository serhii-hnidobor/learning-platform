import { CollectionName } from 'common/enum/api/api';

interface TagDataType extends Record<string, unknown> {
  id: string;
  courseId: string[];
  name: string;
}

interface TopicDataType extends TagDataType {}

interface CourseSectionType extends TagDataType {
  duration: number;
  lessonsNum: number;
  youtubeEmbedId: string;
  index: number;
}

interface ReviewDataType extends Record<string, unknown> {
  id: string;
  reviewAuthorAvatarSrc: string;
  reviewText: string;
  reviewAuthorName: string;
}

interface CourseDataType extends Record<string, unknown> {
  authorName: string;
  detailedDescription: string;
  description: string;
  id: string;
  name: string;
  popular: boolean;
  previewImgSrc: string;
  topics: string[];
  lessonNum: number;
  rate: number;
  tags: string[];
  whatLearn: string[];
  youtubeEmbedId: string;
}

type NextLessonType = {
  duration: number;
  id: string;
  index: number;
  name: string;
} | null;

type FileAttachmentType = {
  fileName: string;
  fileUrl: string;
  fileSize: number;
};

interface LessonDataType extends Record<string, unknown> {
  id: string;
  duration: number;
  description: string;
  courseId: string;
  name: string;
  sectionId: string;
  textContent: string;
  youtubeEmbedId: string | null;
  index: number;
  sectionIndex: number;
  nextLesson: NextLessonType | null;
  attachment: FileAttachmentType | null;
}

type DataType =
  | LessonDataType
  | CourseDataType
  | CourseSectionType
  | TopicDataType
  | TagDataType;

type DataFieldType =
  | keyof CourseDataType
  | keyof CourseSectionType
  | keyof LessonDataType
  | keyof TagDataType
  | keyof TopicDataType;

type FirebaseComparatorType = '==';
type WhereOptionsType = {
  fieldName: DataFieldType;
  comparator: FirebaseComparatorType;
  value: unknown;
};

type DataObjectType<T> = T extends CollectionName.COURSES
  ? CourseDataType
  : T extends CollectionName.COURSE_SECTIONS
  ? CourseSectionType
  : T extends CollectionName.LESSONS
  ? LessonDataType
  : T extends CollectionName.TAGS
  ? TagDataType
  : T extends CollectionName.TOPICS
  ? TopicDataType
  : T extends CollectionName.REVIEWS
  ? ReviewDataType
  : never;

export {
  type LessonDataType,
  type CourseDataType,
  type TopicDataType,
  type ReviewDataType,
  type CourseSectionType,
  type TagDataType,
  type DataType,
  type UserDataType,
  type NextLessonType,
  type CourseProgressData,
  type FileAttachmentType,
  type FirebaseComparatorType,
  type WhereOptionsType,
  type DataObjectType,
  type DataFieldType,
};
