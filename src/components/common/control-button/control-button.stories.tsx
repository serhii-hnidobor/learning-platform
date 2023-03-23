import { ControlButton } from './control-button';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/common/ControlButton',
  component: ControlButton,
} satisfies Meta<typeof ControlButton>;

type Story = StoryObj<typeof ControlButton>;

export default meta;

export const LeftControlButton: Story = {
  args: {
    isLeft: true,
    state: 'active',
  },
};

export const RightControlButton: Story = {
  args: {
    isLeft: false,
    state: 'active',
  },
};

export const ActiveControlButton: Story = {
  args: {
    isLeft: true,
    state: 'active',
  },
};

export const ActiveGreyControlButton: Story = {
  args: {
    state: 'activeGrey',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const NonActiveControlButton: Story = {
  args: {
    isLeft: true,
    state: 'nonActive',
  },
};

export const NonActiveGreyControlButton: Story = {
  args: {
    state: 'nonActiveGrey',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
