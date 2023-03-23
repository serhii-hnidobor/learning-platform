import { LessonDataType } from 'types/api/data';

/**
 * Converts lesson data to props for rendering the Lesson component.
 *
 * @param data - The lesson data to convert.
 * @returns The props for rendering the Lesson component.
 */
export function convertLessonDataToProps(data: LessonDataType) {
  const {
    index,
    sectionIndex,
    textContent,
    name,
    youtubeEmbedId,
    nextLesson,
    description,
    courseId,
  } = data;

  return {
    index,
    sectionIndex,
    textContent,
    name,
    youtubeEmbedId,
    nextLesson,
    description,
    courseId,
  };
}
