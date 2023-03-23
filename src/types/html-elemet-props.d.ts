import {
  ComponentBaseProps,
  ComponentPropsWithoutRef,
  ElementType,
} from 'react';

/**
 * Type of all html element attributes for common react component such as button icon e.c.t
 * @typeParam ElementType - html element type
 * @typeParam ParentReactElementProps - common react component that implement this html element props
 **/

type AllHtmlElementProps<
  ElType extends ElementType,
  ParentReactElementProps extends object,
> = Omit<ComponentBaseProps<ElType>, keyof ParentReactElementProps>;

/**
 * Type of component loading props it's allows not to pass any parameters except loading param
 * in case component loading state flag
 * @typeParam BaseElementProps - component base props it must include loading state key
 * @typeParam loadingPropertyKey - loading prop key
 */

type LoadingProps<
  BaseElementProps extends object,
  loadingPropertyKey extends string = 'loading',
> = Partial<Omit<BaseElementProps, loadingPropertyKey>>;

/**
 * Type of component error props it's allows not to pass any parameters except error param
 * in case component error state flag
 * @typeParam BaseElementProps - component base props it must include error state key
 * @typeParam errorPropertyKey - error prop key
 */

type ErrorProps<
  BaseElementProps extends object,
  errorPropertyKey extends string = 'error',
> = Partial<Omit<BaseElementProps, errorPropertyKey>>;

/**
 * Type of base props for a component that doesn't expect to receive children property.
 * It is based on the ComponentBaseProps type but removes the children and key properties.
 * @typeParam T - the target element type.
 */

type ComponentBaseProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  'children' | 'key'
>;

export {
  type AllHtmlElementProps,
  type ErrorProps,
  type LoadingProps,
  type ComponentBaseProps,
};
