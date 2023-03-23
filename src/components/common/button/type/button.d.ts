import { ButtonVariantsType } from '../cva-variants/cva-variants';
import { HTMLProps } from 'react';

type ButtonSizeType = NonNullable<ButtonVariantsType['size']>;
type ButtonIntentType = NonNullable<ButtonVariantsType['intent']>;
type ButtonHTMLProps = Omit<
  HTMLProps<HTMLButtonElement>,
  'size' | 'aria-label'
>;
type ButtonStateType = NonNullable<ButtonVariantsType['state']>;

export {
  type ButtonIntentType,
  type ButtonStateType,
  type ButtonSizeType,
  type ButtonHTMLProps,
};
