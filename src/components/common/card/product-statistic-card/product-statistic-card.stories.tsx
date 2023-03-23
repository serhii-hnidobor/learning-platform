import type { Meta, StoryObj } from '@storybook/react';

import { ProductStatisticCard } from './product-statistic-card';
import { IconName } from 'common/enum/icons/icons';

const meta = {
  title: 'components/common/cards/product-statistic-card',
  component: ProductStatisticCard,
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: ['active', 'nonActive'],
      },
    },
  },
} satisfies Meta<typeof ProductStatisticCard>;

export default meta;

type Story = StoryObj<typeof ProductStatisticCard>;

const DefaultState: Story = {
  args: {
    state: 'nonActive',
    iconName: IconName.COMPUTER,
    statisticInfoTitle: 'Product',
    statisticText: 'this is cool platform',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

DefaultState.decorators = [
  (Story) => (
    <div className={'flex h-full w-full justify-center bg-white'}>
      <div className={'w-[384px]'}>
        <Story />
      </div>
    </div>
  ),
];

const ActiveState: Story = {
  args: {
    state: 'active',
    statisticInfoTitle: 'Product',
    iconName: IconName.COMPUTER,
    statisticText: 'this is cool platform',
  },
};

ActiveState.decorators = [
  (Story) => (
    <div className={'flex h-full w-full justify-center'}>
      <div className={'w-[384px]'}>
        <Story />
      </div>
    </div>
  ),
];

export {
  DefaultState as ProductStatisticCardDefaultStateStory,
  ActiveState as ProductStatisticActiveStateStory,
};
