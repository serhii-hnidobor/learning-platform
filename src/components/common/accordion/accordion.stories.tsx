import type { Meta, StoryObj } from '@storybook/react';

import Accordion from './accordion';
import { CourseAccordionHeaderContent } from '../../course-page-components/course-page-accordion/components/header-content/header-content';
import { SkeletonWrapper } from '../skeleton-wrapper/skeleton-wrapper';
import { ComponentType } from 'react';
import { AccordionLessonItem } from '../../course-page-components/course-page-accordion/components/accordion-lesson-item/accordion-lesson-item';

const meta = {
  title: 'components/common/Accordion',
  component: Accordion,
  decorators: [
    (story) => (
      <SkeletonWrapper>
        <div style={{ maxWidth: '1440px' }}>{story()}</div>
      </SkeletonWrapper>
    ),
  ],
  subcomponents: {
    CourseAccordionHeaderContent:
      CourseAccordionHeaderContent as ComponentType<unknown>,
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof Accordion>;

export const AccordionLoading: Story = {
  args: {
    loading: true,
    headerContent: (
      <CourseAccordionHeaderContent
        loading={true}
        duration={100}
        name={'test'}
        lessonNum={200}
      />
    ),
  },
};

export const AccordionCoursePage: Story = {
  args: {
    headerContent: (
      <CourseAccordionHeaderContent
        duration={100}
        name={'test'}
        lessonNum={200}
      />
    ),
    childrenContent: (
      <>
        {new Array(10).fill(null).map((_, index) => {
          return (
            <AccordionLessonItem
              loading={false}
              key={`accordion-content-${index}`}
              duration={40}
              isTextLesson={Boolean(index % 2)}
              id={String(index)}
              number={index}
              name={'test'}
              onClick={() => undefined}
            />
          );
        })}
      </>
    ),
  },
};
