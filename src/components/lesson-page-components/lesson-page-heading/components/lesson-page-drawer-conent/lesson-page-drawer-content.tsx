import { useContext, useDataFetch } from 'hooks/hooks';
import { CollectionName, DataStatus } from 'common/enum/enum';
import {
  CoursePageAccordion,
  CoursePageAccordionLoading,
} from 'components/course-page-components/course-page-accordion/course-page-accordion';
import { concatClasses } from 'helpers/helpers';
import { LessonPageContext } from 'pages/lesson-page/lesson-page';

interface LessonPageDrawerContentProps {
  courseId: string;
}

const LessonPageDrawerContent = ({
  courseId,
}: LessonPageDrawerContentProps) => {
  const { data: courseSectionData, dataStatus: courseSectionDataStatus } =
    useDataFetch<CollectionName.COURSE_SECTIONS>({
      name: CollectionName.COURSE_SECTIONS,
      whereOptions: {
        fieldName: 'courseId',
        comparator: '==',
        value: courseId,
      },
    });

  const lessonPageContext = useContext(LessonPageContext);

  if (!lessonPageContext) {
    throw new Error('try to use LessonPageContext without lesson page content');
  }

  const { setIsError } = lessonPageContext;

  let content: JSX.Element[] | null;

  if (courseSectionData && courseSectionDataStatus === DataStatus.SUCCESS) {
    content = courseSectionData.map((section, index) => {
      const { name, lessonsNum, duration, id: courseSectionId } = section;
      return (
        <CoursePageAccordion
          name={name}
          key={`${section.id}-section-${index}`}
          lessonNum={lessonsNum}
          duration={duration}
          handleError={() => setIsError(true)}
          courseSectionId={courseSectionId}
        />
      );
    });
  } else if (
    courseSectionDataStatus === DataStatus.PENDING ||
    courseSectionDataStatus === DataStatus.IDLE
  ) {
    content = new Array(4).map((_, index) => {
      return (
        <CoursePageAccordionLoading
          key={`loading-lesson-page-accordion-${index}`}
        />
      );
    });
  } else {
    // if error
    setIsError(true);
    content = null;
  }

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
      {content}
    </div>
  );
};

export { LessonPageDrawerContent, type LessonPageDrawerContentProps };
