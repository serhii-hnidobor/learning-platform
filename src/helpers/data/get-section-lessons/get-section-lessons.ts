import { CoursePageLessons } from 'types/pages/course-page';

function getSectionLessons(lessonData: CoursePageLessons, sectionId: string) {
  return lessonData.filter((lesson) => lesson.section_id === sectionId);
}

export { getSectionLessons };
