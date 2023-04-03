import { buttonVariants } from './cva-variants/cva-variants';
import {
  typographyVariants,
  TypographyVariantsType,
} from 'components/common/typography/cva-variants/cva-variants';
import { MouseEvent, ReactNode } from 'react';
import { concatClasses } from 'helpers/string/string';
import { ThreeDots } from 'react-loader-spinner';
import { useButtonAnimation } from 'hooks/use-button-animation/use-button-animation';
import { animated } from '@react-spring/web';
import { TextButton } from 'components/common/button/components/text-button';
import { getButtonTypographyVariant } from './helper/get-button-typography-variant';
import {
  ButtonHTMLProps,
  ButtonIntentType,
  ButtonSizeType,
  ButtonStateType,
} from 'components/common/button/type/button';

interface ButtonProps extends ButtonHTMLProps {
  size?: ButtonSizeType;
  intent?: ButtonIntentType;
  invertedColor?: boolean;
  isLoading?: boolean;
  isAnimated?: boolean;
  children: ReactNode;
  ariaLabel: string;
  disabled?: boolean;
  textColor?: NonNullable<TypographyVariantsType['color']>;
  textAlign?: NonNullable<TypographyVariantsType['align']>;
  type?: 'reset' | 'button' | 'submit';
  textTransform?: NonNullable<TypographyVariantsType['textTransform']>;
}

const Button = ({
  className,
  children,
  size,
  intent,
  disabled = false,
  isLoading = false,
  textAlign,
  textTransform,
  isAnimated = true,
  ariaLabel,
  ...restButtonProps
}: ButtonProps) => {
  const {
    style,
    ref: animationRef,
    onMouseUp,
    onMouseDown,
  } = useButtonAnimation<HTMLButtonElement>();

  //if text button render button with different underline animation
  let isTextButton = false;

  // if it's text button font style must be always body2bold
  if (intent === 'textPrimary' || intent === 'textSecondary') {
    size = 'medium';
    isTextButton = true;
  }

  let state: ButtonStateType;

  if (isLoading) {
    state = 'loading';
    // disable animation for disabled button
    isAnimated = false;
  } else if (disabled) {
    state = 'disabled';
    // disable animation for disabled button
    isAnimated = false;
  } else {
    state = 'base';
  }

  const typographyStyleName = getButtonTypographyVariant(size);
  let buttonClassName = buttonVariants({
    size,
    intent,
    state: state,
  });

  buttonClassName = concatClasses([
    typographyVariants({
      align: textAlign,
      textTransform,
      styleName: typographyStyleName,
    }),
    buttonClassName,
  ]);

  if (className && className.length) {
    buttonClassName = concatClasses([buttonClassName, className]);
  }

  if (isTextButton) {
    return (
      <TextButton
        buttonClassName={buttonClassName}
        typographyStyleName={typographyStyleName}
        disabled={disabled}
        isLoading={isLoading}
        children={children}
        {...restButtonProps}
      />
    );
  }

  const mouseDownHandler = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    onMouseDown();
    const { onMouseDown: restButtonPropsHandler } = restButtonProps;
    if (restButtonPropsHandler) {
      restButtonPropsHandler(event);
    }
  };

  const mouseUpHandler = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    onMouseUp();
    const { onMouseUp: restButtonPropsHandler } = restButtonProps;
    if (restButtonPropsHandler) {
      restButtonPropsHandler(event);
    }
  };

  return (
    <animated.button
      {...restButtonProps}
      className={buttonClassName}
      disabled={disabled}
      style={isAnimated ? style : undefined}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      ref={animationRef}
      aria-label={ariaLabel}
    >
      <span className={`block ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      {isLoading && (
        <div className={'absolute right-0 top-0 z-10 h-full w-full'}>
          <ThreeDots
            height="70%"
            width="70%"
            radius="9"
            color="#158FFF"
            ariaLabel="three-dots-loading"
            wrapperClass={'h-full w-full flex justify-center items-center'}
            visible={true}
          />
        </div>
      )}
    </animated.button>
  );
};

export { Button as default, type ButtonProps };
