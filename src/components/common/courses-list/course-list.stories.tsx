import { CoursesList } from './courses-list';
import { Meta, StoryObj } from '@storybook/react';
import { DataStatus } from 'common/enum/api/api';
import { CourseCardProps } from '../../common/course-card/course-card';
import { SkeletonWrapper } from '../../common/skeleton-wrapper/skeleton-wrapper';

const meta = {
  title: 'components/common/CoursesList',
  component: CoursesList,
  decorators: [
    (Story) => (
      <SkeletonWrapper>
        <Story />
      </SkeletonWrapper>
    ),
  ],
} satisfies Meta<typeof CoursesList>;

type Story = StoryObj<typeof CoursesList>;

export default meta;

export const CourseListLoadingState: Story = {
  args: {
    dataStatus: DataStatus.PENDING,
  },
};

export const CourseListErrorState: Story = {
  args: {
    dataStatus: DataStatus.FAILED,
  },
};

const courseListArray: CourseCardProps[] = [
  {
    name: 'The Complete Personal Development Course - 22 Courses in 1',
    rating: 4.6,
    author_name: 'Casey Abbott',
    lesson_num: 56,
    id: '345hft',
    titleColor: 'white',
    preview_img_src: 'https://loremflickr.com/280/184/abstract?lock=28379',
  },
  {
    name: 'The Complete Personal Development Course - 22 Courses in 1',
    rating: 4.6,
    author_name: 'Casey Abbott',
    lesson_num: 56,
    id: '345hft',
    titleColor: 'white',
    preview_img_src: 'https://loremflickr.com/280/184/abstract?lock=28379',
  },
  {
    name: 'The Complete Personal Development Course - 22 Courses in 1',
    rating: 4.6,
    author_name: 'Casey Abbott',
    lesson_num: 56,
    id: '345hft',
    titleColor: 'white',
    preview_img_src: 'https://loremflickr.com/280/184/abstract?lock=28379',
  },
  {
    name: 'The Complete Personal Development Course - 22 Courses in 1',
    rating: 4.6,
    author_name: 'Casey Abbott',
    lesson_num: 56,
    id: '345hft',
    titleColor: 'white',
    preview_img_src: 'https://loremflickr.com/280/184/abstract?lock=28379',
  },
];

export const CourseListDefaultState: Story = {
  args: {
    videoInfoArray: courseListArray,
    dataStatus: DataStatus.SUCCESS,
  },
};

export const CourseListEmptyState: Story = {
  args: {
    videoInfoArray: [],
    dataStatus: DataStatus.SUCCESS,
  },
};
