import { TagScroll } from 'components/common/tag-scroll/components/tag-scroll/tag-scroll';
import { Meta } from '@storybook/react';

export default {
  title: 'components/common/Horizontal-scroll',
  component: TagScroll,
} satisfies Meta<typeof TagScroll>;

export const HorizontalScrollBase = {
  args: {
    tagsArray: [
      {
        name: 'test',
        id: '1',
      },
    ],
  },
};
