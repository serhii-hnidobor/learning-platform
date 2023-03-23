import { Avatar } from './avatar';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/common/avatar',
  component: Avatar,
  argTypes: {
    src: {
      defaultValue:
        'https://i.ibb.co/mSTrNQk/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink-t.png',
      controls: {
        type: 'string',
      },
    },
    alt: {
      controls: {
        type: 'string',
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['large'],
      },
    },
    rounded: {
      control: {
        type: 'select',
        options: ['full', 'base', 'none'],
      },
    },
    background: {
      control: {
        type: 'select',
        options: [
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
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;
export const AvatarLarge: Story = {
  args: {
    size: 'large',
  },
};

export const AvatarFullyRounded: Story = {
  args: {
    size: 'large',
    rounded: 'full',
  },
};

export const AvatarBaseRounded: Story = {
  args: {
    size: 'large',
    rounded: 'full',
  },
};
