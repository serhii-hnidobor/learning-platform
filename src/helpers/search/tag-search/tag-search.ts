import { CourseDataType } from 'types/api/data';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';
import { convertCourseDataToCourseProps } from 'helpers/data/data';
import { CourseCardProps } from 'components/common/course-card/course-card';
import { CoursePropsDataType } from 'types/props/landing-page';

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
    if (!isEqual(difference(tagArray, courseTags), tagArray)) {
      searchResult.push(course);
    }
  });

  return convertCourseDataToCourseProps(searchResult);
}
