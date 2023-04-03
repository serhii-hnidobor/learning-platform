import { ComponentBaseProps } from 'types/html-elemet-props';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { concatClasses } from 'helpers/string/string';
import Skeleton from 'react-loading-skeleton';
import { getHalfStarIndex } from './helpres/get-half-star-index';
import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';

interface RatingProps extends ComponentBaseProps<'div'> {
  rating: number;
  loading?: false;
  textTypographyProps?: TypographyProps<HTMLSpanElement>;
}

interface RatingLoadingProps extends Partial<Omit<RatingProps, 'loading'>> {
  loading: true;
}

type RatingPropsType = RatingProps | RatingLoadingProps;

const Rating = ({
  rating = 0,
  textTypographyProps,
  className,
  loading = false,
  ...restContainerProps
}: RatingPropsType) => {
  const wrapperClassName = 'flex items-center gap-2';

  if (className && className.length) {
    concatClasses([wrapperClassName, className]);
  }

  if (rating < 0 || !rating) {
    rating = 0;
  } else if (rating > 5) {
    rating = 5;
  }

  const halfStarIndex = getHalfStarIndex(rating);

  const computeStar = (_: unknown, index: number) => {
    if (index === halfStarIndex) {
      return (
        <Icon
          name={IconName.HALF_STAR}
          stroke={'yellow'}
          strokeWidth={'1'}
          key={`rating-${rating}-half-start-${index}`}
        />
      );
    }

    if (
      (halfStarIndex && index < halfStarIndex) ||
      (!halfStarIndex && index <= rating - 1)
    ) {
      return (
        <Icon
          name={IconName.STAR}
          stroke={'yellow'}
          strokeWidth={'1'}
          key={`rating-${rating}-full-start-${index}`}
        />
      );
    }

    if (
      (halfStarIndex && index > halfStarIndex) ||
      (!halfStarIndex && index > rating - 1)
    ) {
      return (
        <Icon
          name={IconName.EMPTY_STAR}
          stroke={'yellow'}
          strokeWidth={'1'}
          key={`rating-${rating}-empty-start-${index}`}
        />
      );
    }
  };

  return (
    <div {...restContainerProps} className={wrapperClassName}>
      {loading ? (
        <Skeleton
          containerClassName={'w-[200px] block'}
          className={'w-[200px]'}
        />
      ) : (
        <Typography
          color={'yellow'}
          styleName={'body2Bold'}
          {...textTypographyProps}
          as="span"
        >
          {rating}
        </Typography>
      )}
      <div className={'flex items-center gap-[5px]'}>
        {loading ? (
          <Skeleton containerClassName={'max-w-[200px]'} />
        ) : (
          new Array(5).fill(null).map(computeStar)
        )}
      </div>
    </div>
  );
};

export { Rating, type RatingPropsType as RatingProps };
