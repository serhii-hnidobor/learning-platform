import { Footer } from './footer';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/common/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export default meta;

export const FooterDefault: Story = {};
