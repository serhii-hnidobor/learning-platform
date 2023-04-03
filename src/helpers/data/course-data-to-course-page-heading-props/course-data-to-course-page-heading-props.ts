import { CourseDataType } from 'types/api/data';

/**
 * Transforms a course data object to course page heading props.
 *
 * @param data - The course data object to transform.
 * @returns course page heading props.
 */
export function courseDataToCoursePageHeadingProps(data: CourseDataType) {
  const { authorName, name, rate, youtubeEmbedId, description } = data;
  return {
    authorName,
    name,
    rate,
    youtubeEmbedId,
    description,
  };
}
