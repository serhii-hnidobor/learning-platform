import { CourseDataType } from 'types/api/data';
import { CourseCardProps } from 'components/common/course-card/course-card';

/**
 * Converts an array of CourseDataType objects to an array of CourseCardProps objects.
 * @param data - The array of CourseDataType objects to convert.
 * @returns The converted array of CourseCardProps objects.
 */
export function convertCourseDataToCourseProps(
  data: CourseDataType[],
): CourseCardProps[] {
  return data.map((course) => {
    const { previewImgSrc, lessonNum, authorName, name, rate, id, popular } =
      course;
    return {
      previewImgSrc,
      lessonNum,
      authorName,
      name,
      rate,
      id,
      isPopular: popular,
    };
  });
}
