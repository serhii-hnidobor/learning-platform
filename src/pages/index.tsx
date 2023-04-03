import { ProductCategoriesDescription } from 'components/landing-page-components/product-categories-description/product-categories-description';
import { ProductPreviewSection } from 'components/landing-page-components/product-preview-section/product-preview-section';
import { ProductReviewSection } from 'components/landing-page-components/product-review-section/product-review-section';
import { ProductAdvantages } from 'components/landing-page-components/product-advantages/product-advantages';
import { ProductDescriptionSection } from 'components/landing-page-components/product-description-section/product-description-section';
import { SectionHero } from 'components/landing-page-components/hero-section/section-hero';
import { getData } from 'hooks/use-data-fetch/helper/getData/getData';
import { CollectionName } from 'common/enum/api/api';
import { ReviewDataType, TagDataType } from 'types/api/data';
import { convertCourseDataToCourseProps } from 'helpers/data/data';
import { CoursePropsDataType } from 'types/props/landing-page';

interface LandingPageProps {
  courseData: CoursePropsDataType[];
  tagData: TagDataType[];
  reviewData: ReviewDataType[];
}

const LandingPage = ({ courseData, tagData, reviewData }: LandingPageProps) => {
  return (
    <>
      <SectionHero />
      <ProductDescriptionSection />
      <ProductCategoriesDescription />
      <ProductPreviewSection
        tagData={tagData}
        courseCardProposes={courseData}
      />
      <ProductAdvantages />
      <ProductReviewSection reviewsData={reviewData} />
    </>
  );
};

export default LandingPage;

export async function getStaticProps() {
  const courseData = await getData<CollectionName.COURSES>({
    name: CollectionName.COURSES,
  });
  const tagData = await getData<CollectionName.TAGS>({
    name: CollectionName.TAGS,
  });
  const reviewData = await getData<CollectionName.REVIEWS>({
    name: CollectionName.REVIEWS,
  });

  const popularCourses = courseData.slice(0, 5);

  const trimmedCourseData = convertCourseDataToCourseProps(popularCourses).map(
    (course, index) => {
      return {
        ...course,
        tags: courseData[index].tags,
      };
    },
  );

  return {
    props: {
      courseData: trimmedCourseData,
      tagData,
      reviewData,
    },
    revalidate: 3600,
  };
}
