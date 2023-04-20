import { CourseDataType } from 'types/api/data';
import { convertCourseDataToCourseProps } from '../../data/data';

interface CourseNameSearchArgType {
  searchString: string;
  courseData: CourseDataType[] | null;
}

async function courseNameSearch({
  searchString,
  courseData,
}: CourseNameSearchArgType) {
  if (!courseData || !courseData.length) {
    return null;
  }

  if (!searchString) {
    return convertCourseDataToCourseProps(courseData);
  }

  const { default: Fuse } = await import('fuse.js');

  const fuse = new Fuse(courseData, { keys: ['name'] });
  const searchResult: CourseDataType[] = fuse
    .search(searchString)
    .map((result) => result.item);

  return convertCourseDataToCourseProps(searchResult);
}

export { courseNameSearch as default, type CourseNameSearchArgType };
