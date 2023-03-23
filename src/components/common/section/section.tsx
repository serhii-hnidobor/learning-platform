import { ReactNode } from 'react';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/helpers';

interface SectionProps
  extends Omit<ComponentBaseProps<'section'>, 'className'> {
  sectionClassName?: string;
  contentWrapperClassName?: string;
  children: ReactNode | ReactNode[];

  isFooter?: boolean;
  contentWrapperProps?: ComponentBaseProps<'div'>;
}

const Section = ({
  sectionClassName,
  contentWrapperClassName,
  contentWrapperProps,
  children,
  isFooter = false,
  ...restSectionProps
}: SectionProps) => {
  let initialSectionClassName = concatClasses([
    'lg:px-28',
    'xl:pt-28',
    'xl:pb-[116px]',
    'sm:px-8',
    'py-[72px]',
    'px-4',
    'w-full',
    'flex',
    'justify-center',
  ]);

  let initialContentWrapperClassName = '2xl:w-[1497px] w-full';

  if (sectionClassName) {
    initialSectionClassName = concatClasses([
      initialSectionClassName,
      sectionClassName,
    ]);
  }

  if (contentWrapperClassName) {
    initialContentWrapperClassName = concatClasses([
      initialContentWrapperClassName,
      contentWrapperClassName,
    ]);
  }

  if (isFooter) {
    return (
      <footer {...restSectionProps} className={initialSectionClassName}>
        <div
          {...contentWrapperProps}
          className={initialContentWrapperClassName}
        >
          {children}
        </div>
      </footer>
    );
  }

  return (
    <section {...restSectionProps} className={initialSectionClassName}>
      <div {...contentWrapperProps} className={initialContentWrapperClassName}>
        {children}
      </div>
    </section>
  );
};

export { Section, type SectionProps };
