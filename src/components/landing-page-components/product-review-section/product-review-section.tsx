import { Carousel } from 'components/common/carousel/carousel';
import { FetchFailedBanner, Section } from 'components/common/common';
import { useDataFetch } from 'hooks/hooks';
import { CollectionName, DataStatus } from 'common/enum/api/api';
import { ProductReviewPropsType } from 'components/common/card/product-review-card/product-review-card';

const ProductReviewSection = () => {
  const { data: reviewsData, dataStatus: reviewsDataStatus } =
    useDataFetch<CollectionName.REVIEWS>({ name: CollectionName.REVIEWS });

  let content: JSX.Element;

  if (
    reviewsDataStatus === DataStatus.PENDING ||
    reviewsDataStatus === DataStatus.IDLE
  ) {
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
  } else if (reviewsDataStatus === DataStatus.FAILED || !reviewsData) {
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
