import { getCourses, getReviews, getTags } from 'lib/landing';
import { ArrayElement } from 'types/alias';
export type LandingPageCourseI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getCourses>>>
>;

export type LandingPageCourses = LandingPageCourseI[] | null;

export type ReviewI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getReviews>>>
>;
export type TagsI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getTags>>>
>;
