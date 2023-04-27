'use client';

import { Typography } from 'components/common/typography/typography';
import { ProductStatisticElement } from './components/product-statistic-element/product-statistic-element';
import { ProductStatisticCard } from 'components/common/card/product-statistic-card/product-statistic-card';
import { IconName } from 'common/enum/icons/icons';
import { concatClasses } from 'helpers/string/string';
import { Section } from 'components/common/section/section';

const ProductAdvantages = () => {
  return (
    <Section
      contentWrapperClassName={concatClasses([
        'grid',
        '2xl:grid-cols-[322px_auto]',
        'grid-cols-1',
        'justify-items-center',
      ])}
      sectionClassName={'bg-black bg-opacity-2'}
    >
      <div
        className={concatClasses([
          '2xl:max-w-[250px]',
          'mb-12',
          '2xl:mb-0',
          'sm:max-w-[625px]',
          'max-w-[320px]',
          '2xl:max-w-full',
        ])}
      >
        <div className={concatClasses(['mb-6'])}>
          <Typography
            as={'h2'}
            styleName={'h3'}
            className={'text-center 2xl:text-left'}
            color={'black'}
          >
            Why must choose learningPlatform
          </Typography>
        </div>
        <div className={concatClasses(['mb-9'])}>
          <Typography
            as={'h3'}
            styleName={'body2Regular'}
            className={'text-center 2xl:text-left'}
            color={'grey'}
          >
            LearningPlatform is biggest platform to learning anything to improve
            your skill with 350+ online video course
          </Typography>
        </div>
        <hr className={'mb-9 h-px border-0 bg-black/10'} />
        <div
          className={concatClasses([
            'flex gap-9',
            'justify-center',
            '2xl:justify-start',
          ])}
        >
          <ProductStatisticElement title={'350+'} description={'Courses'} />
          <ProductStatisticElement title={'16'} description={'Categories'} />
          <ProductStatisticElement title={'20k+'} description={'Students'} />
        </div>
      </div>
      <div
        className={concatClasses([
          'grid',
          'lg:grid-cols-[384px_384px]',
          'grid-cols[384px]',
          'gap-8',
          'justify-end',
        ])}
      >
        <ProductStatisticCard
          state={'nonActive'}
          iconName={IconName.FLAME}
          className={'max-w-[405px] lg:max-w-full'}
          statisticInfoTitle={'Lifetime Access'}
          statisticText={
            'Only buy one time you can watch it anytime, any where, lorem ipsum dolot sit amet'
          }
        />
        <ProductStatisticCard
          state={'nonActive'}
          iconName={IconName.SCHOOL}
          className={'max-w-[405px] lg:max-w-full'}
          statisticInfoTitle={'Expert Teachers'}
          statisticText={
            'Only buy one time you can watch it anytime, any where, lorem ipsum dolot sit amet'
          }
        />
        <ProductStatisticCard
          state={'nonActive'}
          iconName={IconName.ROCKET}
          statisticInfoTitle={'Practical Learning'}
          className={'max-w-[405px] lg:max-w-full'}
          statisticText={
            'Only buy one time you can watch it anytime, any where, lorem ipsum dolot sit amet'
          }
        />
        <ProductStatisticCard
          state={'nonActive'}
          iconName={IconName.FLAME}
          className={'max-w-[405px] lg:max-w-full'}
          statisticInfoTitle={'Video Lessons'}
          statisticText={
            'Only buy one time you can watch it anytime, any where, lorem ipsum dolot sit amet'
          }
        />
      </div>
    </Section>
  );
};

export { ProductAdvantages as default };
