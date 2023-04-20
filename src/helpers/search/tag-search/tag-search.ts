import { CourseDataType } from 'types/api/data';
import { convertCourseDataToCourseProps } from 'helpers/data/data';
import { CourseCardProps } from 'components/common/course-card/course-card';
import { CoursePropsDataType } from 'types/props/landing-page';
import isOneArrayContainAnother from 'helpers/array/is-one-array-contain-another';

/**
 * Searches for a course by tag.
 * usage example courseArray
 * @param courseArray - The courseArray to search.
 * @param tagArray - An array of tags to search for.
 * @returns An array of courses that match the given tag array or null if not find.
 */
export function tagSearch(
  courseArray: CourseDataType[] | null | CoursePropsDataType[],
  tagArray: string[] | null,
) {
  if (!courseArray || !courseArray.length || !tagArray || !tagArray.length) {
    return null;
  }

  const searchResult: CourseCardProps[] = [];

  courseArray.forEach((course) => {
    const { tags: courseTags } = course;
    const isTagArrContainCourseTags = isOneArrayContainAnother(
      courseTags,
      tagArray,
      false,
    );

    if (isTagArrContainCourseTags) {
      searchResult.push(course);
    }
  });

  return convertCourseDataToCourseProps(searchResult);
}
