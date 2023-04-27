import type { Meta, StoryObj } from '@storybook/react';

import { CourseAccordionHeaderContent } from './header-content';
import { SkeletonWrapper } from 'components/common/skeleton-wrapper/skeleton-wrapper';
import docs from './header-content.mdx';

const meta = {
  title: 'course-page-components/accordion/accordion-header',
  component: CourseAccordionHeaderContent,
  decorators: [
    (story) => (
      <SkeletonWrapper>
        <div style={{ maxWidth: '500px' }}>{story()}</div>
      </SkeletonWrapper>
    ),
  ],
  parameters: {
    docs: { page: docs },
  },
} satisfies Meta<typeof CourseAccordionHeaderContent>;

export default meta;

type Story = StoryObj<typeof CourseAccordionHeaderContent>;

const LoadingState: Story = {
  args: {
    loading: true,
  },
};

const DefaultState: Story = {
  args: {
    lesson_num: 30,
    name: 'make course section great again',
    duration: 80,
  },
};

export {
  LoadingState as CourseAccordionHeaderLoadingState,
  DefaultState as CourseAccordionHeaderDefaultState,
};
