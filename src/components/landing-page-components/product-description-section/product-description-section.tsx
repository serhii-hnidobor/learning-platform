import { Typography } from 'components/common/typography/typography';
import { Section } from 'components/common/section/section';
import { ProductInfoCard } from './components/product-info-card/product-info-card';
import { IconName } from 'common/enum/enum';
import { concatClasses } from 'helpers/string/string';
import { useWindowDimensions } from 'hooks/hooks';

const ProductDescriptionSection = () => {
  const { screen } = useWindowDimensions();

  const isCardsVertical =
    screen === 'sm' ||
    screen === 'extra-small' ||
    screen === 'xs' ||
    screen === 'md' ||
    screen === 'lg';

  return (
    <Section
      contentWrapperClassName={concatClasses([
        'grid',
        'xl:grid-cols-3',
        'xl:grid-rows-none',
        'lg:grid-cols-2',
        'lg:grid-rows-2',
        'grid-rows-3',
        'grid-cols-[minmax(320px,500px)]',
        'md:grid-cols-[500px]',
        'justify-center',
        'gap-y-12',
        'gap-[178px]',
      ])}
      sectionClassName={'bg-blue/5 drop-shadow-xs'}
    >
      <header
        className={concatClasses([
          'lg:row-start-1',
          'lg:row-end-2',
          'lg:col-start-1',
          'lg:col-end-3',
          'lg:max-w-[500px]',
          'lg:justify-self-center',
          'xl:col-start-1',
          'xl:col-end-2',
        ])}
      >
        <Typography
          styleName="h2"
          color="black"
          as="h2"
          className={concatClasses(['xl:text-left', 'text-center', 'z-10'])}
        >
          {'Online Learning '}
          <Typography styleName="h2" color="blue" className={'lg:text-center'}>
            Designed
          </Typography>
          {' For Real Life'}
        </Typography>
      </header>
      <ProductInfoCard
        iconName={IconName.USER_SUCCESS}
        title={'User-friendly platform to learn'}
        iconProps={{ fill: 'transparent' }}
        variant={isCardsVertical ? 'vertical' : 'horizontal'}
        text={
          'Learning theory, computer-based training, online learning, m-learning,where mobile technology is used'
        }
      />

      <ProductInfoCard
        iconProps={{ fill: 'transparent' }}
        iconName={IconName.DEVICES}
        title={'Packed with modern technology'}
        variant={isCardsVertical ? 'vertical' : 'horizontal'}
        text={
          'Packed with modern technology, classroom learning which used to be done conventionally'
        }
      />
    </Section>
  );
};

export { ProductDescriptionSection };
