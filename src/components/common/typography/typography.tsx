import { type TypographyAsType, TypographyHTMLElementType } from 'types/styles';
import { createElement, HTMLAttributes, ReactNode } from 'react';

import {
  typographyVariants,
  type TypographyVariantsType,
} from './cva-variants/cva-variants';
import { concatClasses } from 'helpers/string/string';

type TypographyElementHTMLProps<ElementType> = Omit<
  HTMLAttributes<ElementType>,
  'as' | 'children' | 'key'
>;

interface TypographyProps<ElementType extends TypographyHTMLElementType>
  extends TypographyElementHTMLProps<ElementType> {
  styleName?: NonNullable<TypographyVariantsType['styleName']>;
  textTransform?: NonNullable<TypographyVariantsType['textTransform']>;
  color?: NonNullable<TypographyVariantsType['color']>;
  children: ReactNode;
  className?: string;
  href?: string;
  truncate?: NonNullable<TypographyVariantsType['truncate']>;
  as?: TypographyAsType;
  align?: NonNullable<TypographyVariantsType['align']>;
}

const Typography = <HTMLElementType extends TypographyHTMLElementType>({
  color,
  styleName,
  textTransform,
  children,
  className,
  as = 'span',
  align,
  truncate,
  ...restProps
}: TypographyProps<HTMLElementType>) => {
  let typographyClassName = typographyVariants({
    textTransform,
    color,
    styleName,
    align,
    truncate,
  });

  if (className && className.length) {
    typographyClassName = concatClasses([typographyClassName, className]);
  }

  return createElement(
    as,
    {
      ...restProps,
      className: typographyClassName,
    },
    children,
  );
};

export { Typography, type TypographyProps };
