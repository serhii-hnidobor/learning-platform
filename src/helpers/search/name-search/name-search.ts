import Fuse from 'fuse.js';
import { CourseDataType } from 'types/api/data';
import { convertCourseDataToCourseProps } from '../../data/data';

interface CourseNameSearchArgType {
  searchString: string;
  courseData: CourseDataType[] | null;
}

function courseNameSearch({
  searchString,
  courseData,
}: CourseNameSearchArgType) {
  if (!courseData || !courseData.length) {
    return null;
  }

  const fuse = new Fuse(courseData, { keys: ['name'] });
  const searchResult: CourseDataType[] = fuse
    .search(searchString)
    .map((result) => result.item);

  return convertCourseDataToCourseProps(searchResult);
}

export { courseNameSearch, type CourseNameSearchArgType };
