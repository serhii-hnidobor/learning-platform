import { CourseCard } from './course-card';
import { Meta, StoryObj } from '@storybook/react';
import { SkeletonWrapper } from '../../common/skeleton-wrapper/skeleton-wrapper';

const meta = {
  title: 'components/common/CourseCard',
  component: CourseCard,
} satisfies Meta<typeof CourseCard>;

type Story = StoryObj<typeof CourseCard>;

export default meta;

export const CourseCardLoadingState: Story = {
  args: {
    loading: true,
  },
};

CourseCardLoadingState.decorators = [
  (Story) => (
    <SkeletonWrapper>
      <div className={'max-w-[300px]'}>
        <Story />
      </div>
    </SkeletonWrapper>
  ),
];

export const CourseCardDefaultState: Story = {
  args: {
    name: 'The Complete Personal Development Course - 22 Courses in 1',
    rate: 4.6,
    authorName: 'Casey Abbott',
    lessonNum: 56,
    id: '345hft',
    titleColor: 'black',
    previewImgSrc: 'https://loremflickr.com/280/184/abstract?lock=28379',
  },
};

CourseCardDefaultState.decorators = [
  (Story) => (
    <div className={'max-w-[300px]'}>
      <Story />
    </div>
  ),
];

export const CourseCardWhiteTitle: Story = {
  args: {
    name: 'The Complete Personal Development Course - 22 Courses in 1',
    rate: 4.6,
    authorName: 'Casey Abbott',
    lessonNum: 56,
    id: '345hft',
    titleColor: 'white',
    previewImgSrc: 'https://loremflickr.com/280/184/abstract?lock=28379',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

CourseCardWhiteTitle.decorators = [
  (Story) => (
    <div className={'max-w-[300px]'}>
      <Story />
    </div>
  ),
];
