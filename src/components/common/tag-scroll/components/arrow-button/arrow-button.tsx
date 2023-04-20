import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useContext, useEffect, useState } from 'react';
import { ControlButton } from 'components/common/control-button/control-button';
import { concatClasses } from 'helpers/string/string';
import { ComponentBaseProps } from 'types/html-elemet-props';
import {
  leftButtonBoxVariants,
  LeftButtonBoxVariantsType,
  rightButtonBoxVariant,
  RightButtonBoxVariantType,
} from './cva-variants/cva-variants';

type OnClickFuncType = (visibleElementsWithSeparators?: string[]) => void;

interface ArrowButtonProps extends Omit<ComponentBaseProps<'div'>, 'onClick'> {
  handleClick?: OnClickFuncType;
  bloorEdge?: boolean;
  isProductReviewSection?: boolean;
}

const LeftArrowButton = ({
  handleClick,
  className,
  bloorEdge = false,
  isProductReviewSection = false,
  ...restWrapperProps
}: ArrowButtonProps) => {
  const {
    isFirstItemVisible,
    scrollPrev,
    initComplete,
    visibleElementsWithSeparators,
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );

  let buttonState: NonNullable<LeftButtonBoxVariantsType['state']>;

  if (disabled) {
    buttonState = 'disabled';
  } else if (bloorEdge && !isProductReviewSection) {
    buttonState = 'bloorEdge';
  } else if (bloorEdge && isProductReviewSection) {
    buttonState = 'productReviewSectionBlurEdge';
  } else {
    buttonState = 'base';
  }

  const buttonWrapperCvaClassName = leftButtonBoxVariants({
    state: buttonState,
  });

  let wrapperClassName = concatClasses([
    'flex items-center',
    'justify-center',
    'relative',
    buttonWrapperCvaClassName,
  ]);

  if (className && className.length) {
    wrapperClassName = concatClasses([className, wrapperClassName]);
  }

  useEffect(() => {
    setDisabled(isFirstItemVisible);
  }, [isFirstItemVisible]);

  return (
    <div {...restWrapperProps} className={wrapperClassName}>
      <ControlButton
        className={concatClasses(['z-20'])}
        state={disabled ? 'nonActiveGrey' : 'activeGrey'}
        onClick={() =>
          handleClick
            ? handleClick(visibleElementsWithSeparators)
            : scrollPrev()
        }
        isLeft={true}
      />
    </div>
  );
};

const RightArrowButton = ({
  handleClick,
  className,
  bloorEdge = false,
  isProductReviewSection,
  ...restWrapperProps
}: ArrowButtonProps) => {
  const {
    isLastItemVisible,
    scrollNext,
    visibleElements,
    visibleElementsWithSeparators,
  } = useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !visibleElements.length && isLastItemVisible,
  );

  let buttonState: NonNullable<RightButtonBoxVariantType['state']>;

  if (disabled) {
    buttonState = 'disabled';
  } else if (bloorEdge && !isProductReviewSection) {
    buttonState = 'bloorEdge';
  } else if (bloorEdge && isProductReviewSection) {
    buttonState = 'productReviewSectionBlurEdge';
  } else {
    buttonState = 'base';
  }

  const buttonWrapperCvaClassName = rightButtonBoxVariant({
    state: buttonState,
  });

  let wrapperClassName = concatClasses([
    'flex',
    'items-center',
    'justify-center',
    buttonWrapperCvaClassName,
  ]);

  if (className && className.length) {
    wrapperClassName = concatClasses([className, wrapperClassName]);
  }

  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <div {...restWrapperProps} className={wrapperClassName}>
      <ControlButton
        className={concatClasses(['z-20'])}
        state={disabled ? 'nonActiveGrey' : 'activeGrey'}
        onClick={() =>
          handleClick
            ? handleClick(visibleElementsWithSeparators)
            : scrollNext()
        }
        isLeft={false}
      />
    </div>
  );
};

export { RightArrowButton, LeftArrowButton, type ArrowButtonProps };
