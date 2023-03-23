import '../public/index.css';
import React from 'react';
import { MemoryRouter } from 'react-router';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
export const decorators = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (Story) => (
    <MemoryRouter initialEntries={['/']}>
      <Story />
    </MemoryRouter>
  ),
];