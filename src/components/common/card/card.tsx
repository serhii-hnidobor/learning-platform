import {
  AllCardPropsTypes,
  isProductReviewCardProps,
  isProductShortInfoCardProps,
  isProductStatisticCardProps,
} from './card-props-type-check';
import { ProductStatisticCard } from './product-statistic-card/product-statistic-card';
import { ProductReviewCard } from './product-review-card/product-review-card';
import { ProductShortInfoCard } from './product-short-info-card/product-short-info-card';

export const Card = (props: AllCardPropsTypes) => {
  let Card: JSX.Element | null = null;
  if (isProductReviewCardProps(props)) {
    Card = <ProductReviewCard {...props} />;
  } else if (isProductStatisticCardProps(props)) {
    Card = <ProductStatisticCard {...props} />;
  } else if (isProductShortInfoCardProps(props)) {
    Card = <ProductShortInfoCard {...props} />;
  }

  return Card;
};
