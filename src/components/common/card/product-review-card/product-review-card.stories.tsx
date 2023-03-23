import type { Meta, StoryObj } from '@storybook/react';

import { ProductReviewCard } from './product-review-card';

const meta = {
  title: 'components/common/cards/product-review-card',
  component: ProductReviewCard,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['active', 'nonActive'],
      },
    },
  },
} satisfies Meta<typeof ProductReviewCard>;

export default meta;

type Story = StoryObj<typeof ProductReviewCard>;

const avatarSrc =
  'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/463.jpg';

const DefaultState: Story = {
  args: {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
};

const ActiveState: Story = {
  args: {
    variant: 'active',
    reviewText: 'Lorem ipsum set alamet dolor',
    reviewAuthorName: 'somebody',
    reviewAuthorAvatarSrc: avatarSrc,
  },
};

export {
  DefaultState as ProductReviewCardDefaultStateStory,
  ActiveState as ProductReviewActiveStateStory,
};
