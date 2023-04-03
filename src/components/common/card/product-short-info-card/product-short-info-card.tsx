import { ComponentBaseProps } from 'types/html-elemet-props';
import { useHoverScaleAnimation } from 'hooks/hooks';
import {
  ProductShortInfoCardVariants,
  type ProductShortInfoCardVariantsType,
} from 'components/common/card/product-short-info-card/cva-variants/cva-variants';
import { concatClasses } from 'helpers/string/string';
import { Icon, IconProps } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { Typography } from 'components/common/typography/typography';
import { animated } from '@react-spring/web';

interface ProductShortInfoCardProps extends ComponentBaseProps<'div'> {
  variant?: NonNullable<ProductShortInfoCardVariantsType['variant']>;
  iconName: IconName;
  infoTitle: string;
  infoText: string;
  iconProps?: Omit<IconProps, 'name'>;
}

const ProductShortInfoCard = ({
  variant,
  className,
  iconName,
  infoText,
  infoTitle,
  iconProps,
  ...restWrapperProps
}: ProductShortInfoCardProps) => {
  const { style: animationStyle, ref: animationRef } =
    useHoverScaleAnimation<HTMLDivElement>();

  let wrapperClassName = ProductShortInfoCardVariants({ variant });

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  return (
    <animated.div
      {...restWrapperProps}
      className={`${wrapperClassName} h-[220px]`}
      ref={animationRef}
      style={animationStyle}
    >
      <header className={'mb-6 flex items-center gap-5'}>
        <Icon
          name={iconName}
          intent={variant === 'nonActive' ? 'squared' : 'squaredInverted'}
          strokeWidth={'2'}
          {...iconProps}
        />
        <Typography
          as="h2"
          styleName="h4"
          color={variant === 'nonActive' ? 'black' : 'white'}
        >
          {infoTitle}
        </Typography>
      </header>
      <Typography
        as="h2"
        styleName="body2Regular"
        color={variant === 'nonActive' ? 'grey' : 'white'}
      >
        {infoText}
      </Typography>
    </animated.div>
  );
};

export { ProductShortInfoCard, type ProductShortInfoCardProps };
