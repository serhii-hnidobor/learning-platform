import { ProductCategoriesDescription } from 'components/landing-page-components/product-categories-description/product-categories-description';
import { ProductPreviewSection } from 'components/landing-page-components/product-preview-section/product-preview-section';
import { ProductReviewSection } from 'components/landing-page-components/product-review-section/product-review-section';
import { ProductAdvantages } from 'components/landing-page-components/product-advantages/product-advantages';
import { ProductDescriptionSection } from 'components/landing-page-components/product-description-section/product-description-section';
import { SectionHero } from 'components/landing-page-components/hero-section/section-hero';
import { useEffect } from 'hooks/hooks';
import { sessionStorageService } from 'services/services';
import { SessionStorageKeys } from 'common/enum/session-storage/session-storage-keys';

export const LandingPage = () => {
  /*
   * it use for prevent redirect loop from protected route (see sign in page)
   * when no authorized try return by change url in sign in page and go to this page
   * prev route on session storage don't delete so if user try again to go on
   * protected route he redirects to root but not to sign in
   * because protected route get prev route from session storage and think that user
   * redirect back from sign in page this effect fix it
   */

  useEffect(() => {
    sessionStorageService.remove(SessionStorageKeys.PREV_ROUTE);
  }, []);

  return (
    <>
      <SectionHero />
      <ProductDescriptionSection />
      <ProductCategoriesDescription />
      <ProductPreviewSection />
      <ProductAdvantages />
      <ProductReviewSection />
    </>
  );
};
