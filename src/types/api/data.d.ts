interface TagDataType {
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

interface ReviewDataType {
  id: string;
  reviewAuthorAvatarSrc: string;
  reviewText: string;
  reviewAuthorName: string;
}

interface CourseDataType {
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

interface LessonDataType {
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

interface UserDataType {
  id: string;
  name: string;
  email: string;
}

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
};
