import { Carousel } from 'components/common/carousel/carousel';
import { Section } from 'components/common/section/section';
import { ProductReviewPropsType } from 'components/common/card/product-review-card/product-review-card';
import { ErrorProps, LoadingProps } from 'types/html-elemet-props';
import { ReviewI } from 'types/pages/landing-page';

interface ProductReviewSectionBaseProps {
  reviewsData: ReviewI[];
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
  let reviewsProps: ProductReviewPropsType[];

  if (loading) {
    reviewsProps = new Array(3).fill(null).map(() => {
      return {
        loading: true,
        review_text: null,
      };
    });
  }

  reviewsProps = reviewsData
    ? reviewsData.map((review) => {
        return {
          ...review,
          loading: false,
        };
      })
    : [];

  const isSuccessFetch = !error && reviewsData && reviewsData?.length;

  return (
    <Section sectionClassName={`bg-white ${isSuccessFetch ? '!pb-0' : ''}`}>
      <Carousel
        child={reviewsProps}
        error={error}
        title={'People say about learning'}
        description={
          'Global learning platform that provides international quality learning'
        }
      />
    </Section>
  );
};

export { ProductReviewSection as default };
