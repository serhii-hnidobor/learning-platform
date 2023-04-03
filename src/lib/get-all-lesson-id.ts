import { getData } from 'hooks/use-data-fetch/helper/getData/getData';
import { CollectionName } from 'common/enum/api/api';

async function getAllLessonId() {
  const lessonData = await getData<CollectionName.LESSONS>({
    name: CollectionName.LESSONS,
  });

  return lessonData.map((lesson) => {
      return {
        params: {
          id: lesson.id,
        },
      };
    });
}

export default getAllLessonId;
