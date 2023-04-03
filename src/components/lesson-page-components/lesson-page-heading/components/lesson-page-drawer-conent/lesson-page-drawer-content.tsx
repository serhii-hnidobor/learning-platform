import { CoursePageAccordion } from 'components/course-page-components/course-page-accordion/course-page-accordion';
import { concatClasses } from 'helpers/string/string';
import { CourseSectionType } from 'types/api/data';
import {
  getSectionLessons,
  LessonDataArgType,
} from 'helpers/data/get-section-lessons/get-section-lessons';

interface LessonPageDrawerContentProps {
  lessonData: LessonDataArgType[];
  courseSectionData: CourseSectionType[];
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
        const { name, lessonsNum, duration, id: courseSectionId } = section;

        const sectionLesson = getSectionLessons(lessonData, courseSectionId);

        return (
          <CoursePageAccordion
            name={name}
            key={`${section.id}-section-${index}`}
            lessonNum={lessonsNum}
            duration={duration}
            lessonData={sectionLesson}
          />
        );
      })}
    </div>
  );
};

export { LessonPageDrawerContent, type LessonPageDrawerContentProps };
