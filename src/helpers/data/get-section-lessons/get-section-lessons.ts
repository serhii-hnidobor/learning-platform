import { CoursePageAccordionLessonType } from 'components/course-page-components/course-page-accordion/type/course-page-lesson';

type LessonDataArgType = CoursePageAccordionLessonType & {
  sectionId: string;
};

function getSectionLessons(lessonData: LessonDataArgType[], sectionId: string) {
  return lessonData
    .filter((lesson) => lesson.sectionId === sectionId)
    .map((lesson) => {
      const { index, duration, id, isTextLesson, name } = lesson;
      return { index, duration, id, isTextLesson, name };
    });
}

export { getSectionLessons, type LessonDataArgType };
