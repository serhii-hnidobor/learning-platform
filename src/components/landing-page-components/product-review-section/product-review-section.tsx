import { Carousel } from 'components/common/carousel/carousel';
import { Section } from 'components/common/section/section';
import { ProductReviewPropsType } from 'components/common/card/product-review-card/product-review-card';
import { ReviewDataType } from 'types/api/data';
import { ErrorProps, LoadingProps } from 'types/html-elemet-props';
import dynamic from 'next/dynamic';

const FetchFailedBanner = dynamic(
  import('components/common/fetch-failed-banner/fetch-failed-banner'),
);

interface ProductReviewSectionBaseProps {
  reviewsData: ReviewDataType[];
  loading?: false;
  error?: false;
}

interface ProductReviewSectionLoadingProps
  extends LoadingProps<ProductReviewSectionBaseProps> {
  loading: true;
}

interface ProductReviewSectionErrorProps
  extends ErrorProps<ProductReviewSectionBaseProps> {
  error: true;
}

type ProductReviewSection =
  | ProductReviewSectionBaseProps
  | ProductReviewSectionLoadingProps
  | ProductReviewSectionErrorProps;

const ProductReviewSection = ({
  reviewsData,
  loading,
  error,
}: ProductReviewSection) => {
  let content: JSX.Element;

  if (loading) {
    const reviewsLoadingCardsProps = new Array(3).fill(null).map(() => {
      return {
        loading: true,
        reviewText: null,
      };
    });

    content = (
      <Carousel
        child={reviewsLoadingCardsProps as ProductReviewPropsType[]}
        title={'People say about learning'}
        description={
          'Global learning platform that provides international quality learning'
        }
      />
    );
  } else if (error || !reviewsData) {
    content = <FetchFailedBanner status={'error'} />;
  } else if (!reviewsData.length) {
    content = <FetchFailedBanner status={'empty'} />;
  } else {
    content = (
      <Carousel
        child={reviewsData as ProductReviewPropsType[]}
        title={'People say about learning'}
        description={
          'Global learning platform that provides international quality learning'
        }
      />
    );
  }
  return <Section sectionClassName={'bg-white !pb-0'}>{content}</Section>;
};

export { ProductReviewSection };
