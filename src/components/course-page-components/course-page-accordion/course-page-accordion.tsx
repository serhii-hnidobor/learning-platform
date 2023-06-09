import Accordion from 'components/common/accordion/accordion';
import { CourseAccordionHeaderContent } from './components/header-content/header-content';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { CourseAccordionItemWrapper } from './components/course-page-accordion-item-wrapper/course-page-accordion-item-wrapper';
import { useRouter } from 'next/router';
import { CoursePageAccordionLessonType } from './type/course-page-lesson';

interface CoursePageAccordionProps extends ComponentBaseProps<'div'> {
  name: string;
  lesson_num: number;
  lessonData: CoursePageAccordionLessonType[];
  duration: number;
  onClick?: VoidFunction;
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
  lesson_num,
  lessonData,
  ...restWrapperProps
}: CoursePageAccordionProps) => {
  const Router = useRouter();

  const accordionChildren = (
    <CourseAccordionItemWrapper
      lessonData={lessonData}
      handleLessonClick={(lessonIndex) => {
        if (Router.isReady) {
          Router.push(`/lesson/${lessonIndex}`);
        }
      }}
    />
  );
  const accordionHeader = (
    <CourseAccordionHeaderContent
      name={name}
      duration={duration}
      lesson_num={lesson_num}
    />
  );

  return (
    <Accordion
      headerContent={accordionHeader}
      childrenContent={accordionChildren}
      {...restWrapperProps}
    />
  );
};

export { CoursePageAccordion, CoursePageAccordionLoading };
