import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/string';
import { AccordionLessonItem } from '../accordion-lesson-item/accordion-lesson-item';
import dynamic from 'next/dynamic';
import { CoursePageAccordionLessonType } from '../../type/course-page-lesson';

const FetchFailedBanner = dynamic(
  import('components/common/fetch-failed-banner/fetch-failed-banner'),
);

interface CourseAccordionItemWrapperProps extends ComponentBaseProps<'div'> {
  loading?: false;
  lessonData: CoursePageAccordionLessonType[] | null;
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
      const { index: lessonIndex, id } = lesson;

      if (!index) {
        return (
          <div key={`short-lesson-info-${id}`}>
            <hr
              className={
                'bg-grey/10 relative top-[-24px] h-[2px] w-full border-0'
              }
            />
            <AccordionLessonItem
              {...lesson}
              onClick={() => {
                if (handleLessonClick) {
                  handleLessonClick(id);
                }
              }}
              number={lessonIndex}
              loading={false}
            />
          </div>
        );
      }

      return (
        <AccordionLessonItem
          {...lesson}
          onClick={() => {
            if (handleLessonClick) {
              handleLessonClick(id);
            }
          }}
          key={`short-lesson-info-${id}`}
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
