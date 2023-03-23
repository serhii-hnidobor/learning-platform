const typographyAsValues = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'span',
  'p',
  'li',
  'a',
] as const;

type TypographyAsTuple = typeof typographyAsValues;

/**
 * all html element that can be used to display typography names type union
 *
 * @example
 * h1-h6 name for HTMLHeaderElement
 * span name for HTMLSpanElement
 * p name for HTMLParagraphElement
 * li name for HTMLLIElement
 *
 **/
type TypographyAsType = TypographyAsTuple[number];

/**
 * all html element that can be used to display typography type
 **/
type TypographyHTMLElementType =
  | HTMLSpanElement
  | HTMLHeadingElement
  | HTMLLIElement
  | HTMLParagraphElement
  | HTMLAnchorElement;

enum Screens {
  'extra-small' = 'extra-small',
  'xs' = 'xs',
  'sm' = 'sm',
  'md' = 'md',
  'lg' = 'lg',
  'xl' = 'xl',
  '2xl' = '2xl',
}

export {
  type TypographyAsType,
  typographyAsValues,
  type TypographyHTMLElementType,
  Screens,
};
