import { SearchBox } from './search-box';
import { Meta, StoryObj } from '@storybook/react';
import { IconName } from 'common/enum/icons/icons';

const meta = {
  title: 'components/common/Rating',
  component: SearchBox,
  decorators: [
    (Story) => (
      <div className={'max-w-[800px]'}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBox>;

type Story = StoryObj<typeof SearchBox>;

export default meta;

const searchData = [
  { id: '1', name: 'course1' },
  { id: '2', name: 'course2' },
  { id: '3', name: 'course3' },
];

export const SearchBoxDefault: Story = {
  args: {
    items: searchData,
    inputProps: {
      placeholder: 'Search for anything',
      iconName: IconName.SEARCH,
    },
    handleSearch: () => undefined,
    handleAutocompleteSelect: () => undefined,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
