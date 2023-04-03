import React from 'react';
import Drawer, { DrawerProps } from './drawer';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'hooks/hooks';
import Button from '../button/button';

export default {
  title: 'components/common/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

const Template: StoryFn<DrawerProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  return (
    <div>
      <Button
        intent="primary"
        ariaLabel="drawer open button"
        onClick={toggleDrawer}
      >
        {isOpen ? 'close' : 'open'}
      </Button>
      <Drawer
        {...args}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={<p>Place for header</p>}
        children={<p>place for main content</p>}
      />
    </div>
  );
};

export const DrawerDefault = Template.bind({});
