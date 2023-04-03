import {
  productStatisticCardVariants,
  ProductStatisticCardVariantsType,
} from 'components/common/card/product-statistic-card/cva-variants/cva-variants';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/string';
import { IconProps, Icon } from 'components/common/icon/icon';
import { Typography } from 'components/common/typography/typography';
import { useHoverScaleAnimation } from 'hooks/hooks';
import { animated } from '@react-spring/web';
import { IconName } from 'common/enum/icons/icons';

interface ProductStatisticCardProps extends ComponentBaseProps<'div'> {
  state: NonNullable<ProductStatisticCardVariantsType['state']>;
  iconName: IconName;
  iconProps?: Omit<IconProps, 'intent' | 'iconName'>;
  statisticInfoTitle: string;
  statisticText: string;
}

const ProductStatisticCard = ({
  state,
  className,
  iconProps,
  iconName,
  statisticInfoTitle,
  statisticText,
  ...restWrapperProps
}: ProductStatisticCardProps) => {
  const { style: animationStyle, ref: animationRef } =
    useHoverScaleAnimation<HTMLDivElement>();

  let wrapperClassName = productStatisticCardVariants({ state });

  if (className && className.length) {
    wrapperClassName = concatClasses([className, wrapperClassName]);
  }

  return (
    <animated.div
      {...restWrapperProps}
      className={wrapperClassName}
      ref={animationRef}
      style={animationStyle}
    >
      <Icon
        {...iconProps}
        intent={'rounded'}
        name={iconName}
        width={20}
        height={20}
        strokeWidth={'2'}
      />
      <Typography
        as={'h5'}
        styleName={'body1Bold'}
        className={'line-clamp-1 inline-block self-center'}
      >
        {statisticInfoTitle}
      </Typography>
      <Typography
        as={'p'}
        styleName={'body2Regular'}
        color={'grey'}
        className={'line-clamp-3 col-start-2'}
      >
        {statisticText}
      </Typography>
    </animated.div>
  );
};

export { ProductStatisticCard, type ProductStatisticCardProps };
