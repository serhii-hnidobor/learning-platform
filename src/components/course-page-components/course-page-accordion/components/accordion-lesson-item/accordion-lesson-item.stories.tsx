import type { Meta, StoryObj } from '@storybook/react';

import { AccordionLessonItem } from './accordion-lesson-item';
import { SkeletonWrapper } from 'components/common/skeleton-wrapper/skeleton-wrapper';

const meta = {
  title: 'course-page-components/accordion/accordion-content-item',
  component: AccordionLessonItem,
  decorators: [
    (story) => (
      <SkeletonWrapper>
        <div style={{ maxWidth: '500px' }}>{story()}</div>
      </SkeletonWrapper>
    ),
  ],
} satisfies Meta<typeof AccordionLessonItem>;

export default meta;

type Story = StoryObj<typeof AccordionLessonItem>;

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const DefaultState: Story = {
  args: {
    id: 'mega id',
    number: 10,
    duration: 70,
    name: 'default accordion lesson item state',
    isTextLesson: undefined,
  },
};

export const TextLessonState: Story = {
  args: {
    id: 'mega id',
    number: 10,
    duration: 70,
    name: 'text lesson',
    isTextLesson: true,
  },
};
