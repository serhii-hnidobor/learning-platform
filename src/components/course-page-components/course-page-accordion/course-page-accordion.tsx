import { Accordion } from 'components/common/common';
import { CourseAccordionHeaderContent } from './components/header-content/header-content';
import { useDataFetch, useNavigate } from 'hooks/hooks';
import { CollectionName, DataStatus } from 'common/enum/api/api';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { CourseAccordionItemWrapper } from './components/course-page-accordion-item-wrapper/course-page-accordion-item-wrapper';

interface CoursePageAccordionProps extends ComponentBaseProps<'div'> {
  name: string;
  lessonNum: number;
  duration: number;
  courseSectionId: string;
  onClick?: VoidFunction;
  handleError: VoidFunction;
}

const CoursePageAccordionLoading = () => {
  return (
    <Accordion
      headerContent={<CourseAccordionHeaderContent loading={true} />}
      loading={true}
    />
  );
};

const CoursePageAccordion = ({
  name,
  duration,
  lessonNum,
  courseSectionId,
  handleError,
  ...restWrapperProps
}: CoursePageAccordionProps) => {
  const navigate = useNavigate();

  const { data: lessonData, dataStatus: lessonDataStatus } =
    useDataFetch<CollectionName.LESSONS>({
      name: CollectionName.LESSONS,
      whereOptions: {
        fieldName: 'sectionId',
        comparator: '==',
        value: courseSectionId,
      },
    });

  const loading =
    lessonDataStatus === DataStatus.PENDING ||
    lessonDataStatus === DataStatus.IDLE;

  let accordionChildren: JSX.Element;
  let accordionHeader: JSX.Element;

  if (loading) {
    accordionChildren = <CourseAccordionItemWrapper loading={true} />;
    accordionHeader = <CourseAccordionHeaderContent loading={true} />;
  } else if (lessonData && lessonDataStatus === DataStatus.SUCCESS) {
    accordionChildren = (
      <CourseAccordionItemWrapper
        lessonData={lessonData}
        handleLessonClick={(lessonIndex) => navigate(`/lesson/${lessonIndex}`)}
      />
    );
    accordionHeader = (
      <CourseAccordionHeaderContent
        name={name}
        duration={duration}
        lessonNum={lessonNum}
      />
    );
  } else {
    handleError();
    throw Error('failed to load lessons data');
  }

  return (
    <Accordion
      headerContent={accordionHeader}
      childrenContent={accordionChildren}
      {...restWrapperProps}
    />
  );
};

export { CoursePageAccordion, CoursePageAccordionLoading };
