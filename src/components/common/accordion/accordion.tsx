import { IconName } from 'common/enum/enum';
import { Icon } from 'components/common/icon/icon';
import { useRef, useState } from 'react';
import { concatClasses } from 'helpers/string/string';
import useKeyPress from 'hooks/use-key-press';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';

interface AccordionProps extends Omit<ComponentBaseProps<'div'>, 'children'> {
  headerContent: JSX.Element;
  childrenContent: JSX.Element;
  loading?: false;
  onClick?: VoidFunction;
}

interface AccordionLoadingProps extends LoadingProps<AccordionProps> {
  headerContent: JSX.Element;
  loading: true;
}

type AccordionPropsType = AccordionProps | AccordionLoadingProps;

const Accordion = ({
  childrenContent,
  headerContent,
  loading,
  onClick,
  ...restWrapperProps
}: AccordionPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    if (!loading) {
      setIsOpen((prevValue) => !prevValue);
    }
    if (onClick) {
      onClick();
    }
  };

  const accordionRef = useRef<HTMLDivElement>(null);

  useKeyPress({
    keyArray: ['Enter'],
    callback: () => {
      const { current: accordion } = accordionRef;
      if (!accordionRef || !accordion || loading) {
        return;
      }
      if (accordion === document.activeElement) {
        handleClick();
      }
    },
  });

  useKeyPress({
    keyArray: ['Escape'],
    callback: () => {
      const { current: accordion } = accordionRef;
      if (!accordionRef || !accordion || loading) {
        return;
      }
      if (accordion === document.activeElement) {
        accordion.blur();
      }
    },
  });

  return (
    <>
      <div
        className={concatClasses([
          'accordion drawer-header',
          'flex items-center',
          'relative cursor-pointer',
        ])}
        tabIndex={0}
        ref={accordionRef}
        {...restWrapperProps}
        onClick={handleClick}
      >
        {headerContent}
        <Icon
          name={isOpen ? IconName.CHEVRON_UP : IconName.CHEVRON_DOWN}
          width={24}
          height={24}
          intent={'base'}
          className={'translate-y-negative-1/2 absolute right-0 top-[50%]'}
        />
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'}`}>{childrenContent}</div>
    </>
  );
};

export { Accordion as default, type AccordionPropsType };
