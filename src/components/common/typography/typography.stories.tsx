import { Typography } from './typography';
import { Meta } from '@storybook/react';

export default {
  title: 'components/common/Typography',
  component: Typography,
  argTypes: {
    as: {
      control: {
        type: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'span', 'p', 'li'],
      },
    },
    styleName: {
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'body1ExtraBold',
          'body1Bold',
          'body1Regular',
          'body2ExtraBold',
          'body2Bold',
          'body2Medium',
          'body2Regular',
          'body3Bold',
          'body3Regular',
        ],
      },
    },
    textTransform: {
      control: {
        type: 'select',
        options: ['uppercase', 'lowercase', 'normal-case', 'capitalize'],
      },
    },
    color: {
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
} satisfies Meta<typeof Typography>;

export const H1 = {
  args: { children: 'Typography h1', styleName: 'h1', as: 'h1' },
};

export const H2 = {
  args: { children: 'Typography h2', styleName: 'h2', as: 'h2' },
};

export const H3 = {
  args: { children: 'Typography h3', styleName: 'h3', as: 'h3' },
};

export const H4 = {
  args: { children: 'Typography h1', styleName: 'h4', as: 'h4' },
};

export const H5 = {
  args: { children: 'Typography h5', styleName: 'h5', as: 'h5' },
};

export const Body1ExtraBold = {
  args: {
    children: 'Typography body1ExtraBold',
    styleName: 'body1ExtraBold',
    as: 'span',
  },
};

export const Body1Bold = {
  args: {
    children: 'Typography body1Bold',
    styleName: 'body1Bold',
    as: 'span',
  },
};

export const Body1Regular = {
  args: {
    children: 'Typography body1Regular',
    styleName: 'body1Regular',
    as: 'span',
  },
};

export const Body2ExtraBold = {
  args: {
    children: 'Typography body2ExtraBold',
    styleName: 'body2ExtraBold',
    as: 'span',
  },
};

export const Body2Bold = {
  args: {
    children: 'Typography body2Bold',
    styleName: 'body2Bold',
    as: 'span',
  },
};

export const Body2Medium = {
  args: {
    children: 'Typography body2Medium',
    styleName: 'body2Medium',
    as: 'span',
  },
};

export const Body2Regular = {
  args: {
    children: 'Typography body2Regular',
    styleName: 'body2Regular',
    as: 'span',
  },
};
export const Body3Bold = {
  args: {
    children: 'Typography body3Bold',
    styleName: 'body3Bold',
    as: 'span',
  },
};

export const Body3Regular = {
  args: {
    children: 'Typography body3Regular',
    styleName: 'body3Regular',
    as: 'span',
  },
};

export const Black = {
  args: {
    children: 'black',
    styleName: 'body1Regular',
    color: 'black',
    as: 'span',
  },
};

export const Dark = {
  args: {
    children: 'dark',
    styleName: 'body1Regular',
    color: 'dark',
    as: 'span',
  },
};

export const Grey = {
  args: {
    children: 'grey',
    styleName: 'body1Regular',
    color: 'grey',
    as: 'span',
  },
};

export const GreyLight = {
  args: {
    children: 'grey-light',
    styleName: 'body1Regular',
    color: 'grey-light',
    as: 'span',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const White = {
  args: {
    children: 'white',
    styleName: 'body1Regular',
    color: 'white',
    as: 'span',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Blue = {
  args: {
    children: 'blue',
    styleName: 'body1Regular',
    color: 'blue',
    as: 'span',
  },
};

export const BlueLight = {
  args: {
    children: 'blue-light',
    styleName: 'body1Regular',
    color: 'blue-light',
    as: 'span',
  },
};

export const Yellow = {
  args: {
    children: 'yellow',
    styleName: 'body1Regular',
    color: 'yellow',
    as: 'span',
  },
};

export const YellowLight = {
  args: {
    children: 'yellow-light',
    styleName: 'body1Regular',
    color: 'yellow-light',
    as: 'span',
  },
};

export const Green = {
  args: {
    children: 'green',
    styleName: 'body1Regular',
    color: 'green',
    as: 'span',
  },
};
