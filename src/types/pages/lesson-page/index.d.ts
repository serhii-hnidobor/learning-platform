import { getLessonById } from 'lib/lesson';
import { ArrayElement } from 'types/alias';

type LessonOfLessonPageI = ArrayElement<
  NonNullable<Awaited<ReturnType<typeof getLessonById>>>
> & {
  next_lesson: NextLessonI | null;
};

type FileAttachment = LessonOfLessonPageI['FileAttachment'];

type NextLessonI = {
  index: LessonOfLessonPageI['index'];
  name: LessonOfLessonPageI['name'];
  duration: number;
  id: LessonOfLessonPageI['id'];
};

export { type LessonOfLessonPageI, type FileAttachment, type NextLessonI };
