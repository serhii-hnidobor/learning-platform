import { LessonDataType } from 'types/api/data';

/**
 * Converts lesson data to the props required by the AccordionLessonItem component.
 *
 * @param data The lesson data to convert.
 * @returns The props required by the AccordionLessonItem component.
 */

export function convertLessonDataToAccordionLessonItemProps(
  data: LessonDataType,
) {
  const { youtubeEmbedId, duration, name, index: number, id } = data;

  return {
    isTextLesson: Boolean(youtubeEmbedId),
    duration,
    name,
    index: number,
    id,
  };
}
