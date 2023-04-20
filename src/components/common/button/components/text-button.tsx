import { ReactNode } from 'react';
import useUnderlineAnimation from 'hooks/use-underline-animation';
import { Typography } from 'components/common/typography/typography';
import { animated } from '@react-spring/web';
import { TypographyVariantsType } from 'components/common/typography/cva-variants/cva-variants';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';
import dynamic from 'next/dynamic';

const PulseLoader = dynamic(import('react-spinners/PulseLoader'));

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
        style={{
          opacity: isLoading ? '0' : '100',
        }}
      >
        {children}
      </Typography>
      {isLoading && (
        <div className={'absolute right-0 top-0 z-10 h-full w-full'}>
          <div className={'flex h-full w-full items-center justify-center'}>
            <PulseLoader
              color={'#158FFF'}
              cssOverride={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              aria-label="pulse-loader"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <animated.span className={'block h-[2px]'} style={style} />
      )}
    </button>
  );
};

export { TextButton };
