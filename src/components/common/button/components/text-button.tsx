import { ReactNode } from 'react';
import { useUnderlineAnimation } from 'hooks/use-underline-animation/use-underline-animation';
import { Typography } from 'components/common/typography/typography';
import { ThreeDots } from 'react-loader-spinner';
import { animated } from '@react-spring/web';
import { TypographyVariantsType } from 'components/common/typography/cva-variants/cva-variants';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';

interface TextButtonProps extends ComponentBaseProps<'button'> {
  children: ReactNode;
  buttonClassName: string;
  typographyStyleName: NonNullable<TypographyVariantsType['styleName']>;
  disabled: boolean;
  isLoading: boolean;
}

/*
 * component for button with underline animation
 *  (regular button uses hover scale animation)
 */

const TextButton = ({
  children,
  buttonClassName,
  typographyStyleName,
  isLoading,
  disabled,
  ...restButtonProps
}: TextButtonProps) => {
  const { ref, style } = useUnderlineAnimation<HTMLButtonElement>();
  return (
    <button
      {...restButtonProps}
      ref={ref}
      className={concatClasses([isLoading ? 'relative' : '', buttonClassName])}
      disabled={disabled}
    >
      <Typography
        styleName={typographyStyleName}
        as="span"
        textTransform={'capitalize'}
      >
        {children}
      </Typography>
      {isLoading && (
        <div className={'absolute right-0 top-0 z-10 h-[70%] w-[70%]'}>
          <ThreeDots
            height="15"
            width="15"
            radius="9"
            color="#158FFF"
            ariaLabel="three-dots-loading"
            wrapperClass={'h-full w-full flex justify-center items-center'}
            visible={true}
          />
        </div>
      )}
      <animated.span className={'block h-[2px]'} style={style} />
    </button>
  );
};

export { TextButton };
