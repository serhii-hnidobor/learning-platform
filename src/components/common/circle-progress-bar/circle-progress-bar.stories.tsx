import { CircleProgressBar } from './circle-progress-bar';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/common/CircleProgressBar',
  component: CircleProgressBar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small'],
      },
    },
    progress: {
      control: {
        type: 'number',
        minValue: 0,
        maxValue: 100,
      },
    },
    progressLineColor: {
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
    circleBackgroundColor: {
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
    progressLineWidth: {
      control: {
        type: 'select',
        options: ['1', '2', '3', '4'],
      },
    },
  },
} satisfies Meta<typeof CircleProgressBar>;

type Story = StoryObj<typeof CircleProgressBar>;

export default meta;

export const CircleProgressBarSmall: Story = {
  args: {
    size: 'small',
    circleBackgroundColor: 'dark',
    progressLineColor: 'blue',
    progress: 75,
  },
};
