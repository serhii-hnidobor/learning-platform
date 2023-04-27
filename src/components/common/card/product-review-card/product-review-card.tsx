import {
  productReviewCardVariants,
  type ProductReviewCardVariantsType,
} from 'components/common/card/product-review-card/cva-variants/cva-variants';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import useHoverScaleAnimation from 'hooks/use-hover-scale-animation';
import { concatClasses } from 'helpers/string/string';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { Typography } from 'components/common/typography/typography';
import { Avatar } from 'components/common/avatar/avatar';
import { animated } from '@react-spring/web';
import Skeleton from 'react-loading-skeleton';

interface ProductReviewCardProps extends ComponentBaseProps<'div'> {
  variant?: NonNullable<ProductReviewCardVariantsType['variant']>;
  review_text: string;
  review_author_name: string;
  review_author_avatar_src: string;
  loading?: false;
}

interface ProductReviewCardLoadingProps
  extends LoadingProps<Omit<ProductReviewCardProps, 'review_text'>> {
  // for correct detect review card props
  review_text: string | null;
  loading: true;
}

type ProductReviewPropsType =
  | ProductReviewCardProps
  | ProductReviewCardLoadingProps;
const ProductReviewCard = ({
  variant = 'nonActive',
  className,
  review_text,
  review_author_name,
  review_author_avatar_src,
  loading,
  ...restWrapperProps
}: ProductReviewPropsType) => {
  const { ref: cardAnimationRef, style } =
    useHoverScaleAnimation<HTMLDivElement>();
  let wrapperClassName = productReviewCardVariants({ variant });

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  return (
    <animated.div
      {...restWrapperProps}
      className={wrapperClassName}
      ref={cardAnimationRef}
      style={style}
    >
      <header className={'mb-6'}>
        <Icon
          width={36}
          height={36}
          name={IconName.QUOTE}
          fill={variant === 'active' ? 'blue' : 'grey'}
          stroke={'transparent'}
          intent={'base'}
        />
      </header>

      <div className={'mb-7'}>
        {loading ? (
          <div>
            <Skeleton count={2} containerClassName={'w-[300px]'} />
            <Skeleton containerClassName={'w[230px]'} />
          </div>
        ) : (
          <Typography
            as={'p'}
            styleName={'body2Regular'}
            color={'grey'}
            className={'line-clamp-3'}
          >
            {review_text}
          </Typography>
        )}
      </div>
      <div className={'grid grid-cols-[32px_auto] items-center gap-x-3'}>
        {loading ? (
          <Skeleton
            circle={true}
            containerClassName={'w-[30px] h-[30px] flex'}
            height={'100%'}
            className={'h-full w-full'}
          />
        ) : (
          <Avatar
            size={'small'}
            background={'inherit'}
            src={review_author_avatar_src}
            alt={review_author_name}
            rounded={'full'}
          />
        )}
        {loading ? (
          <Skeleton containerClassName={'w-[93px]'} />
        ) : (
          <Typography
            as={'span'}
            styleName={'body2Bold'}
            color={'black'}
            className={'truncate'}
            title={review_author_name}
          >
            {review_author_name}
          </Typography>
        )}
      </div>
    </animated.div>
  );
};

export { ProductReviewCard, type ProductReviewPropsType };
