import isOneArrayContainAnother from 'helpers/array/is-one-array-contain-another';
import { LandingPageCourseI } from 'types/pages/landing-page';
import { BrowsePageCourseI } from 'types/pages/browse-page';
import resultWithoutTagAndTopic from 'helpers/data/remove-topic-and-tag-from-browse-page-course';
export const resultWithoutTag = ({ Tag: _, ...rest }: LandingPageCourseI) =>
  rest;

function getTagSearchResult(
  searchResult: BrowsePageCourseI | LandingPageCourseI,
) {
  if ('Topic' in searchResult) {
    return resultWithoutTagAndTopic(searchResult);
  }

  return resultWithoutTag(searchResult);
}

/**
 * Searches for a course by tag.
 * usage example courseArray
 * @param courseArray - The courseArray to search.
 * @param tagArray - An array of tags to search for.
 * @returns An array of courses that match the given tag array or null if not find.
 */
export function tagSearch(
  courseArray: BrowsePageCourseI[] | LandingPageCourseI[],
  tagArray: string[] | null,
) {
  if (!courseArray || !courseArray.length || !tagArray || !tagArray.length) {
    return null;
  }

  const searchResult = courseArray.filter((course) => {
    const { Tag: courseTagsData } = course;

    if (!courseTagsData) {
      return;
    }

    if (
      !Array.isArray(courseTagsData) &&
      tagArray.includes(courseTagsData.id)
    ) {
      return true;
    }

    if (!Array.isArray(courseTagsData)) {
      return;
    }

    const courseTags = courseTagsData.map((course) => course.id);

    const isTagArrContainCourseTags = isOneArrayContainAnother(
      courseTags,
      tagArray,
      false,
    );

    if (isTagArrContainCourseTags) {
      return true;
    }
  });

  return searchResult.map((course) => getTagSearchResult(course));
}
