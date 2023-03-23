import { Rating } from './rating';
import { Meta, StoryObj } from '@storybook/react';
import { SkeletonWrapper } from '../../common/skeleton-wrapper/skeleton-wrapper';

const meta = {
  title: 'components/common/Rating',
  component: Rating,
  decorators: [
    (Story) => (
      <SkeletonWrapper>
        <div className={'max-w-[122px]'}>
          <Story />
        </div>
      </SkeletonWrapper>
    ),
  ],
} satisfies Meta<typeof Rating>;

type Story = StoryObj<typeof Rating>;

export default meta;

export const RatingDefault: Story = {
  args: {
    rating: 3.5,
  },
};

export const RatingLoading: Story = {
  args: {
    loading: true,
  },
};
