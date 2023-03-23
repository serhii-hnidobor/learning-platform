import React from 'react';

import { Button, type ButtonProps } from './button';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'components/common/Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
    },
    intent: {
      control: {
        type: 'select',
        options: [
          'primary',
          'primaryInvert',
          'secondary',
          'regularOutlined',
          'base',
          'regularSolid',
          'textPrimary',
          'textSecondary',
          'inline',
        ],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'big', 'large'],
      },
    },
  },
} satisfies Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (args) => {
  return <Button {...args} />;
};

export const ButtonPrimary = Template.bind({});

ButtonPrimary.args = {
  intent: 'primary',
  disabled: false,
  size: 'medium',
  children: 'cool button',
};

export const ButtonPrimaryInvert = Template.bind({});

ButtonPrimaryInvert.args = {
  intent: 'primaryInvert',
  disabled: false,
  size: 'medium',
  children: 'cool button',
};

export const ButtonSecondary = Template.bind({});

ButtonSecondary.args = {
  intent: 'secondary',
  disabled: false,
  size: 'medium',
  children: 'cool button',
};

export const ButtonRegularSolid = Template.bind({});

ButtonRegularSolid.args = {
  intent: 'regularSolid',
  disabled: false,
  size: 'medium',
  children: 'cool button',
};

export const ButtonRegularOutlined = Template.bind({});

ButtonRegularOutlined.args = {
  intent: 'regularOutlined',
  disabled: false,
  size: 'medium',
  children: 'cool button',
};

export const ButtonSmall = Template.bind({});

ButtonSmall.args = {
  intent: 'primary',
  disabled: false,
  size: 'small',
  children: 'cool button',
};

export const ButtonMedium = Template.bind({});

ButtonMedium.args = {
  intent: 'primary',
  disabled: false,
  size: 'medium',
  children: 'cool button',
};

export const ButtonLarge = Template.bind({});

ButtonLarge.args = {
  intent: 'primary',
  disabled: false,
  size: 'large',
  children: 'cool button',
};

export const ButtonDisabled = Template.bind({});

ButtonDisabled.args = {
  disabled: true,
  children: 'disabled',
};

export const TextPrimaryButton = Template.bind({});

TextPrimaryButton.args = {
  intent: 'textPrimary',
  children: 'cool button',
};

export const TextSecondaryButton = Template.bind({});

TextSecondaryButton.args = {
  intent: 'textSecondary',
  children: 'cool button',
};

export const TextSecondaryButtonDisabled = Template.bind({});

TextSecondaryButtonDisabled.args = {
  disabled: true,
  intent: 'textPrimary',
  children: 'text button disabled',
};

export const InlineButton = Template.bind({});

InlineButton.args = {
  disabled: false,
  children: 'inline button',
};

export const DefaultButton = Template.bind({});
