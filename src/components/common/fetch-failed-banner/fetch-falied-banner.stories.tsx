import FetchFailedBanner from './fetch-failed-banner';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/common/FetFailedBanner',
  component: FetchFailedBanner,
} satisfies Meta<typeof FetchFailedBanner>;

type Story = StoryObj<typeof FetchFailedBanner>;

export default meta;

export const FetchFailedBannerErrorState: Story = {
  args: {
    status: 'error',
  },
};

export const FetchFailedBannerEmptyState: Story = {
  args: {
    status: 'empty',
  },
};
