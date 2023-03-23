import { CourseDataType } from 'types/api/data';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';
import { convertCourseDataToCourseProps } from 'helpers/data/data';

/**
 * Searches for a course by tag.
 * usage example courseArray
 * @param courseArray - The courseArray to search.
 * @param tagArray - An array of tags to search for.
 * @returns An array of courses that match the given tag array or null if not find.
 */
export function tagSearch(
  courseArray: CourseDataType[] | null,
  tagArray: string[] | null,
) {
  if (!courseArray || !courseArray.length || !tagArray || !tagArray.length) {
    return null;
  }

  const searchResult: CourseDataType[] = [];

  courseArray.forEach((course) => {
    const { tags: courseTags } = course;
    if (!isEqual(difference(tagArray, courseTags), tagArray)) {
      searchResult.push(course);
    }
  });

  return convertCourseDataToCourseProps(searchResult);
}
