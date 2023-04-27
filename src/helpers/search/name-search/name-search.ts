import { BrowsePageCourses } from 'types/pages/browse-page';

interface CourseNameSearchArgType {
  searchString: string;
  courseData: BrowsePageCourses;
}

async function courseNameSearch({
  searchString,
  courseData,
}: CourseNameSearchArgType) {
  if (!courseData || !courseData.length) {
    return null;
  }

  if (!searchString) {
    return courseData;
  }

  const { default: Fuse } = await import('fuse.js');

  const fuse = new Fuse(courseData, { keys: ['name'] });
  const searchResult = fuse.search(searchString).map((result) => result.item);

  return searchResult;
}

export { courseNameSearch as default, type CourseNameSearchArgType };
