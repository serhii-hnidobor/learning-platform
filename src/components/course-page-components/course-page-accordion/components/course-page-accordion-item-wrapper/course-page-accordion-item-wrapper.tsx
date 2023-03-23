import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import { LessonDataType } from 'types/api/data';
import {
  concatClasses,
  convertLessonDataToAccordionLessonItemProps,
} from 'helpers/helpers';
import { AccordionLessonItem } from '../accordion-lesson-item/accordion-lesson-item';
import { FetchFailedBanner } from 'components/common/common';

interface CourseAccordionItemWrapperProps extends ComponentBaseProps<'div'> {
  loading?: false;
  lessonData: LessonDataType[] | null;
  handleLessonClick: (lessonIndex: string) => void;
}

interface CourseAccordionItemWrapperLoadingProps
  extends LoadingProps<CourseAccordionItemWrapperProps> {
  loading: true;
}

type CourseAccordionItemPropsType =
  | CourseAccordionItemWrapperLoadingProps
  | CourseAccordionItemWrapperProps;

const CourseAccordionItemWrapper = ({
  lessonData,
  loading,
  className,
  handleLessonClick,
  ...restProps
}: CourseAccordionItemPropsType) => {
  let computedClassName = 'flex flex-col gap-6 my-6';

  if (className && className.length) {
    computedClassName = concatClasses([computedClassName, className]);
  }

  let content: JSX.Element[] | JSX.Element;

  if (lessonData && lessonData.length) {
    content = lessonData.map((lesson, index) => {
      const props = convertLessonDataToAccordionLessonItemProps(lesson);

      const { index: lessonIndex, id } = props;

      return (
        <AccordionLessonItem
          {...props}
          onClick={() => {
            if (handleLessonClick) {
              handleLessonClick(id);
            }
          }}
          key={`short-lesson-info-${index}`}
          number={lessonIndex}
          loading={false}
        />
      );
    });
  } else if (loading) {
    content = new Array(10)
      .fill(null)
      .map((_, index) => (
        <AccordionLessonItem
          key={`short-lesson-info-${index}`}
          loading={true}
        />
      ));
  } else if (lessonData && !lessonData.length) {
    content = <FetchFailedBanner status={'empty'} />;
  } else {
    content = <FetchFailedBanner status={'error'} />;
  }

  return (
    <div {...restProps} className={computedClassName}>
      {content}
    </div>
  );
};

export { CourseAccordionItemWrapper, type CourseAccordionItemPropsType };
