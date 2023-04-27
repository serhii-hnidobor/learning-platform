import { ProductReviewPropsType } from 'components/common/card/product-review-card/product-review-card';
import { ProductShortInfoCardProps } from 'components/common/card/product-short-info-card/product-short-info-card';
import { ProductStatisticCardProps } from 'components/common/card/product-statistic-card/product-statistic-card';

type AllCardPropsTypes =
  | ProductReviewPropsType
  | ProductShortInfoCardProps
  | ProductStatisticCardProps;

const isProductReviewCardProps = (
  props: AllCardPropsTypes,
): props is ProductReviewPropsType => {
  return (<ProductReviewPropsType>props).review_text !== undefined;
};

const isProductStatisticCardProps = (
  props: AllCardPropsTypes,
): props is ProductStatisticCardProps => {
  return (<ProductStatisticCardProps>props).statisticInfoTitle !== undefined;
};

const isProductShortInfoCardProps = (
  props: AllCardPropsTypes,
): props is ProductShortInfoCardProps => {
  return (<ProductShortInfoCardProps>props).infoTitle !== undefined;
};

export {
  isProductReviewCardProps,
  isProductStatisticCardProps,
  isProductShortInfoCardProps,
  type AllCardPropsTypes,
};
