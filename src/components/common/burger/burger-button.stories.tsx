import type { Meta, StoryObj } from '@storybook/react';

import { Burger } from '../../common/common';

const meta = {
  title: 'components/common/burger',
  component: Burger,
  argTypes: {
    fill: {
      control: {
        type: 'select',
        options: [
          'transparent',
          'black',
          'dark',
          'grey',
          'grey-light',
          'white',
          'blue',
          'blue-light',
          'yellow',
          'yellow-light',
          'green',
        ],
      },
    },
  },
} satisfies Meta<typeof Burger>;

export default meta;

type Story = StoryObj<typeof Burger>;

const DefaultState: Story = {
  args: {
    isOpen: true,
    onOpen: () => undefined,
    onClose: () => undefined,
  },
};

export { DefaultState as BurgerDefaultState };
