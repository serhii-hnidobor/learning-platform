import { getCourse, getCourseLessons, getCourseSection } from 'lib/course-page';
import { ArrayElement } from 'alias';

type CoursePageLessonI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getCourseLessons>>>
>;

type CoursePageCourseDataI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getCourse>>>
>;

export type CourseSectionI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getCourseSection>>>
>;

export type CoursePageLessons = CoursePageLessonI[];
export type CoursePageCourse = CoursePageCourseDataI[];
