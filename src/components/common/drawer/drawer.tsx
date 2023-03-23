import { concatClasses } from 'helpers/helpers';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useRef } from 'hooks/hooks';
import { createPortal } from 'react-dom';

interface DrawerProps {
  isOpen: boolean;
  contentContainerClassName?: string;
  children: JSX.Element[] | JSX.Element;
  setIsOpen: (newValue: boolean) => void;
  header: JSX.Element;
  isRight?: boolean;
}

const Drawer = ({
  isOpen,
  setIsOpen,
  children,
  header,
  contentContainerClassName,
  isRight = false,
}: DrawerProps) => {
  const [{ x }, api] = useSpring(() => {
    let xInitial = '0';

    if (!isOpen && isRight) {
      xInitial = '100%';
    } else if (!isOpen) {
      xInitial = '-100%';
    }

    return {
      x: xInitial,
      opacity: '0',
      config: { mass: 2, tension: 200, friction: 40 },
    };
  });

  if (isOpen) {
    api.start({ x: '0' });
  } else {
    api.start({ x: isRight ? '100%' : '-100%' });
  }

  const mainContentRef = useRef<HTMLDivElement>(null);

  const bind = useDrag(
    ({ down, swipe, movement: [mx] }) => {
      if ((!isRight && mx > 0) || (isRight && mx < 0)) {
        return;
      }

      if (swipe[0] < 0 && !isRight) {
        api.start({ x: '-100%' });
        setIsOpen(false);
        return;
      }

      if (swipe[0] < 0) {
        api.start({ x: '100%' });
        setIsOpen(false);
        return;
      }

      if (swipe[0] > 0) {
        api.start({ x: '0px' });
        setIsOpen(true);
        return;
      }

      if ((mx < -200 && !isRight) || (mx > 200 && isRight) || !down) {
        api.start({ x: isRight ? '100%' : '-100%' });
        setIsOpen(false);
        return;
      }

      api.start({ x: `${mx}px` });
    },
    { axis: 'x' },
  );

  let contentWrapperClassName = concatClasses([
    'w-full',
    'grow',
    'overflow-y-auto',
    'overflow-x-hidden',
  ]);

  if (contentContainerClassName && contentContainerClassName.length) {
    contentWrapperClassName = concatClasses([
      contentWrapperClassName,
      contentContainerClassName,
    ]);
  }

  return createPortal(
    <>
      {isOpen && (
        <div
          className={concatClasses([
            'absolute',
            isRight ? 'right-0' : 'left-0',
            isOpen ? 'block' : 'hidden',
            'top-0',
            'z-[9999]',
            'h-full',
            'w-screen',
            'bg-black/40',
            'cursor-pointer',
            'transition-all',
            '!user-select-none',
          ])}
          onClick={() => setIsOpen(false)}
        />
      )}
      <animated.div
        className={concatClasses([
          'fixed',
          'top-0',
          isRight ? 'right-0' : 'left-0',
          'sm:w-[512px]',
          '!user-select-none',
          'w-full',
          'overflow-hidden',
          'bottom-0',
          'transform ease-in-out',
          'z-[10000]',
          isOpen
            ? 'transition-opacity opacity-100 duration-500 translate-x-0'
            : `transition-all delay-500 opacity-0 ${
                isRight ? 'translate-x-full' : '-translate-x-full'
              }`,
        ])}
        style={{ x }}
      >
        <div
          className={concatClasses([
            'max-w-lg',
            isRight ? 'right-0' : 'left-0',
            'absolute',
            'bg-white',
            'h-full',
            'flex',
            'flex-col',
            'w-full',
            'shadow-xl',
            'delay-400',
            'duration-500',
            'ease-in-out',
            'transition-all',
            'transform',
            'touch-none',
            isOpen
              ? 'translate-x-0'
              : `${isRight ? 'translate-x-full' : '-translate-x-full'}`,
          ])}
          onClick={(event) => event.stopPropagation()}
          {...bind()}
          ref={mainContentRef}
        >
          <header className={'shrink-0'}>{header}</header>
          <div className={contentWrapperClassName}>{children}</div>
        </div>
      </animated.div>
    </>,
    document.body,
  );
};

export { Drawer, type DrawerProps };
