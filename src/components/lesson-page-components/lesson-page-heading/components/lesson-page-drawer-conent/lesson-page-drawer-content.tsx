import { CoursePageAccordion } from 'components/course-page-components/course-page-accordion/course-page-accordion';
import { concatClasses } from 'helpers/string/string';
import { getSectionLessons } from 'helpers/data/get-section-lessons/get-section-lessons';
import { CoursePageLessonI, CourseSectionI } from 'types/pages/course-page';

interface LessonPageDrawerContentProps {
  lessonData: CoursePageLessonI[];
  courseSectionData: CourseSectionI[];
}

const LessonPageDrawerContent = ({
  lessonData,
  courseSectionData,
}: LessonPageDrawerContentProps) => {
  return (
    <div
      className={concatClasses([
        'md:p-12',
        'px-3',
        'py-12',
        'flex',
        'flex-col',
        'gap-6',
      ])}
    >
      {courseSectionData.map((section, index) => {
        const { name, lessons_num, duration, id: courseSectionId } = section;

        const sectionLesson = getSectionLessons(lessonData, courseSectionId);

        return (
          <CoursePageAccordion
            name={name}
            key={`${section.id}-section-${index}`}
            lesson_num={lessons_num}
            duration={duration}
            lessonData={sectionLesson}
          />
        );
      })}
    </div>
  );
};

export { LessonPageDrawerContent, type LessonPageDrawerContentProps };
