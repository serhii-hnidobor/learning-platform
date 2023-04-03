import { ProductCategoriesDescription } from 'components/landing-page-components/product-categories-description/product-categories-description';
import { ProductPreviewSection } from 'components/landing-page-components/product-preview-section/product-preview-section';
import { ProductReviewSection } from 'components/landing-page-components/product-review-section/product-review-section';
import { ProductAdvantages } from 'components/landing-page-components/product-advantages/product-advantages';
import { ProductDescriptionSection } from 'components/landing-page-components/product-description-section/product-description-section';
import { SectionHero } from 'components/landing-page-components/hero-section/section-hero';
import { getData } from '../hooks/use-data-fetch/helper/getData/getData';
import { CollectionName } from '../common/enum/api/api';
import { CourseDataType, ReviewDataType, TagDataType } from 'types/api/data';

interface LandingPageProps {
  courseData: CourseDataType[];
  tagData: TagDataType[];
  reviewData: ReviewDataType[];
}

const LandingPage = ({ courseData, tagData, reviewData }: LandingPageProps) => {
  return (
    <>
      <SectionHero />
      <ProductDescriptionSection />
      <ProductCategoriesDescription />
      <ProductPreviewSection tagData={tagData} courseCardData={courseData} />
      <ProductAdvantages />
      <ProductReviewSection reviewsData={reviewData} />
    </>
  );
};

export default LandingPage;

export async function getStaticProps() {
  const courseData = await getData({ name: CollectionName.COURSES });
  const tagData = await getData({ name: CollectionName.TAGS });
  const reviewData = await getData({ name: CollectionName.REVIEWS });

  return {
    props: {
      courseData,
      tagData,
      reviewData,
    },
    revalidate: 10,
  };
}
