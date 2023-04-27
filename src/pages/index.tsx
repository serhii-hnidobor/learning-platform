import { ProductDescriptionSection } from 'components/landing-page-components/product-description-section/product-description-section';
import { SectionHero } from 'components/landing-page-components/hero-section/section-hero';
import { GetServerSidePropsContext } from 'next';
import { LandingPageCourses, ReviewI, TagsI } from 'types/pages/landing-page';
import { getReviews, getCourses, getTags } from 'lib/landing';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import ProductCategoriesDescription from 'components/landing-page-components/product-categories-description/product-categories-description';
import ProductAdvantages from 'components/landing-page-components/product-advantages/product-advantages';
import ProductReviewSection from 'components/landing-page-components/product-review-section/product-review-section';
import ProductPreviewSection from 'components/landing-page-components/product-preview-section/product-preview-section';

interface LandingPageProps {
  courseData: LandingPageCourses;
  tagData: TagsI[];
  reviewData: ReviewI[];
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
  const session = await getServerSession(context.req, context.res, authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken || '';

  const reviewsData = getReviews(supabaseAccessToken);
  const coursesData = getCourses(supabaseAccessToken);
  const tagsData = getTags(supabaseAccessToken);

  const [reviews, courses, tags] = await Promise.all([
    reviewsData,
    coursesData,
    tagsData,
  ]);

  return {
    props: {
      courseData: courses,
      tagData: tags,
      reviewData: reviews,
      session,
    },
  };
}
