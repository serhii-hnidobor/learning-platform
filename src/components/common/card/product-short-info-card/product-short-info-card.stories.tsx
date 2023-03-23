import type { Meta, StoryObj } from '@storybook/react';

import { ProductShortInfoCard } from './product-short-info-card';
import { IconName } from 'common/enum/icons/icons';

const meta = {
  title: 'components/common/cards/product-short-info-card',
  component: ProductShortInfoCard,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['active', 'nonActive'],
      },
    },
  },
} satisfies Meta<typeof ProductShortInfoCard>;

export default meta;

type Story = StoryObj<typeof ProductShortInfoCard>;

const DefaultState: Story = {
  args: {
    variant: 'nonActive',
    infoTitle: 'Product',
    iconName: IconName.COMPUTER,
    infoText: 'this is cool platform',
  },
};

const ActiveState: Story = {
  args: {
    variant: 'active',
    infoTitle: 'Product',
    infoText: 'this is cool platform',
    iconName: IconName.COMPUTER,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export {
  DefaultState as ProductShortInfoCardDefaultStateStory,
  ActiveState as ProductShortInfoActiveStateStory,
};
