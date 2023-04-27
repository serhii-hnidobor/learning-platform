import { ProductDescriptionSection } from 'components/landing-page-components/product-description-section/product-description-section';
import { SectionHero } from 'components/landing-page-components/hero-section/section-hero';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { LandingPageCourses, ReviewI, TagsI } from 'types/pages/landing-page';
import { getReviews, getCourses, getTags } from 'lib/landing';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

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
