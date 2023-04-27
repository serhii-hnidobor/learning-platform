import { getCourses, getTopics } from 'lib/browse-page';
import { ArrayElement } from 'types/alias';

export type BrowsePageCourseI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getCourses>>>
>;

export type BrowsePageCourses = BrowsePageCourseI[] | null;

export type TopicI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getTopics>>>
>;
