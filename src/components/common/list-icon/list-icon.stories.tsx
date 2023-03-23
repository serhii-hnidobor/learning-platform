import { ListIcon } from './list-icon';
import { Meta, StoryObj } from '@storybook/react';
import { IconName } from 'common/enum/icons/icons';
import { SkeletonWrapper } from '../../common/skeleton-wrapper/skeleton-wrapper';

const meta = {
  title: 'components/common/ListIcon',
  component: ListIcon,
  decorators: [
    (Story) => (
      <SkeletonWrapper>
        <Story />
      </SkeletonWrapper>
    ),
  ],
} satisfies Meta<typeof ListIcon>;

type Story = StoryObj<typeof ListIcon>;

export default meta;

export const ListIconDefault: Story = {
  args: {
    children: ['test1', 'test2', 'test3', 'test4'],
    iconName: IconName.CHECK,
  },
};

export const ListIconLoadingState: Story = {
  args: {
    loading: true,
  },
};
