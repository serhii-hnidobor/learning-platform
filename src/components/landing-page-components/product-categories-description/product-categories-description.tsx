import { Carousel } from 'components/common/carousel/carousel';
import { IconName } from 'common/enum/icons/icons';
import { ProductShortInfoCardProps } from 'components/common/card/product-short-info-card/product-short-info-card';
import { Section } from 'components/common/section/section';

//Data for static landing page section
const cards: ProductShortInfoCardProps[] = [
  {
    variant: 'nonActive',
    infoTitle: 'Web Development',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'User Experience',
    infoText: 'Lessons on design that cover the most recent developments.',
    iconName: IconName.TOOLS,
  },
  {
    variant: 'nonActive',
    infoTitle: 'Marketing',
    infoText: 'Marketing courses that cover the most recent marketing trends',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'User Experience2',
    infoText: 'Lessons on design that cover the most recent developments.',
    iconName: IconName.TOOLS,
  },
  {
    variant: 'nonActive',
    infoTitle: 'Marketing2',
    infoText: 'Marketing courses that cover the most recent marketing trends',
    iconName: IconName.BROWSER,
  },
  {
    variant: 'nonActive',
    infoTitle: 'Web Development2',
    infoText:
      'Classes in development that cover the most recent advancements in web.',
    iconName: IconName.BROWSER,
  },
];

const ProductCategoriesDescription = () => {
  return (
    <Section sectionClassName={'bg-white !pb-0'}>
      <Carousel
        child={cards}
        title={'Fostering a playful & engaging learning environment'}
      />
    </Section>
  );
};

export { ProductCategoriesDescription as default };
