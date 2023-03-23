import React from 'react';

import { Icon, IconProps } from './icon';
import { Meta, StoryFn } from '@storybook/react';
import { IconName } from 'common/enum/icons/icons';

export default {
  title: 'components/common/Icon',
  component: Icon,
  argTypes: {
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    name: {
      control: {
        type: 'select',
        options: Object.keys(IconName),
      },
    },
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
    stroke: {
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
    intent: {
      control: {
        type: 'select',
        options: ['rounded', 'squared', 'roundedPrimary'],
      },
    },
    strokeWidth: {
      control: {
        type: 'select',
        options: ['0', '1', '2'],
      },
    },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<IconProps> = (args) => {
  return <Icon {...args} />;
};

export const Logo = Template.bind({});

Logo.args = { name: IconName.LOGO, width: 30, height: 30 };

export const RoundedIcon = Template.bind({});
RoundedIcon.args = {
  name: IconName.USER_SUCCESS,
  width: 19,
  height: 19,
  intent: 'rounded',
};

export const SquaredIcon = Template.bind({});
SquaredIcon.args = {
  name: IconName.USER_SUCCESS,
  width: 19,
  height: 19,
  intent: 'squared',
};

export const RoundedPrimaryIcon = Template.bind({});
RoundedPrimaryIcon.args = {
  name: IconName.USER_SUCCESS,
  width: 19,
  height: 19,
  intent: 'squared',
};

export const SquaredTranslucentIcon = Template.bind({});
SquaredTranslucentIcon.args = {
  name: IconName.USER_SUCCESS,
  width: 19,
  height: 19,
  intent: 'squaredTranslucent',
};
