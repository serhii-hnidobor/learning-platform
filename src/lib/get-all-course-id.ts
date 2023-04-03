import { getData } from 'hooks/use-data-fetch/helper/getData/getData';
import { CollectionName } from 'common/enum/api/api';

async function getAllCourseId() {
  const courseData = await getData<CollectionName.COURSES>({
    name: CollectionName.COURSES,
  });

  return courseData.map((course) => {
      return {
        params: {
          id: course.id,
        },
      };
    });
}

export default getAllCourseId;