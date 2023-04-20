import { ProductDescriptionSection } from 'components/landing-page-components/product-description-section/product-description-section';
import { SectionHero } from 'components/landing-page-components/hero-section/section-hero';
import { getData } from 'lib/getData';
import { CollectionName } from 'common/enum/api/api';
import { ReviewDataType, TagDataType } from 'types/api/data';
import { convertCourseDataToCourseProps } from 'helpers/data/data';
import { CoursePropsDataType } from 'types/props/landing-page';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import createFirebaseCache from '../lib/cache/create-firebase-cache';

const ProductCategoriesDescription = dynamic(
  import(
    'components/landing-page-components/product-categories-description/product-categories-description'
  ),
);
const ProductPreviewSection = dynamic(
  import(
    'components/landing-page-components/product-preview-section/product-preview-section'
  ),
);
const ProductReviewSection = dynamic(
  import(
    'components/landing-page-components/product-review-section/product-review-section'
  ),
);
const ProductAdvantages = dynamic(
  import(
    'components/landing-page-components/product-advantages/product-advantages'
  ),
);

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: courseData, isFromCache: isCoursesFromCache } =
    await getData<CollectionName.COURSES>({
      name: CollectionName.COURSES,
    });
  
  console.info(`is use cache ${isCoursesFromCache}`);

  const { data: tagData, isFromCache: isTagsFromCache } =
    await getData<CollectionName.TAGS>({
      name: CollectionName.TAGS,
    });
  const { data: reviewData, isFromCache: isReviewsFromCache } =
    await getData<CollectionName.REVIEWS>({
      name: CollectionName.REVIEWS,
    });

  const session = await getSession(context);

  const popularCourses = courseData.slice(0, 5);

  const trimmedCourseData = convertCourseDataToCourseProps(popularCourses).map(
    (course, index) => {
      return {
        ...course,
        tags: courseData[index].tags,
      };
    },
  );

  context.res.on('finish', () => {
    if (!isCoursesFromCache) {
      createFirebaseCache(CollectionName.COURSES);
    }
    if (!isTagsFromCache) {
      createFirebaseCache(CollectionName.TAGS);
    }
    if (!isReviewsFromCache) {
      createFirebaseCache(CollectionName.REVIEWS);
    }
  });

  return {
    props: {
      courseData: trimmedCourseData,
      tagData,
      reviewData,
      session,
    },
  };
}
