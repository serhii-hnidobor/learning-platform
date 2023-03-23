import { animated, useSpring } from '@react-spring/web';
import { concatClasses } from 'helpers/helpers';
import { ComponentBaseProps } from 'types/html-elemet-props';
import {
  burgerVariants,
  BurgerVariantsType,
} from './cva-variants/cva-variants';

interface BurgerProps extends ComponentBaseProps<'div'> {
  onOpen: VoidFunction;
  onClose: VoidFunction;
  fill?: NonNullable<BurgerVariantsType['fill']>;
  isOpen: boolean;
}

const Burger = ({
  onOpen,
  onClose,
  fill,
  className,
  isOpen,
  ...restWrapperProps
}: BurgerProps) => {
  const first = useSpring({
    transform: isOpen
      ? 'translate(5px, 32px) rotate(-45deg)'
      : 'translate(2px, 7px) rotate(0deg)',
  });
  const second = useSpring({
    transform: isOpen
      ? 'translate(10px, 4px) rotate(45deg)'
      : 'translate(2px, 19px) rotate(0deg)',
  });
  const third = useSpring({
    transform: isOpen
      ? 'translate(5px, 32px) rotate(-45deg)'
      : 'translate(2px, 31px) rotate(0deg)',
  });

  let wrapperClassName = 'p-2 cursor-pointer';

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  const burgerClassName = burgerVariants({ fill: fill || 'white-light' });

  const handleClick = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div {...restWrapperProps} className={wrapperClassName}>
      <svg
        onClick={handleClick}
        width="40"
        height="32"
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.rect
          className={burgerClassName}
          width="40"
          height="4"
          rx="2"
          style={first}
        />
        <animated.rect
          className={burgerClassName}
          width="40"
          height="4"
          rx="2"
          style={second}
        />
        <animated.rect
          className={burgerClassName}
          width="40"
          height="4"
          rx="2"
          style={third}
        />
      </svg>
    </div>
  );
};

export { type BurgerProps, Burger };
