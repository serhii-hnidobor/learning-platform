import { ProductInfoListItem } from './components/product-info-list-item/product-info-list-item';
import { AppRoutes, IconName } from 'common/enum/enum';
import { HeroLabel } from './components/hero-label/hero-label';
import { concatClasses } from 'helpers/string/string';
import { useRouter } from 'next/router';
import { Typography } from 'components/common/typography/typography';
import Button from 'components/common/button/button';
import { CircleDecoration } from 'components/common/circle-decoration/circle-decoration';
import { Avatar } from 'components/common/avatar/avatar';
import { Section } from 'components/common/section/section';

import HeroImg from 'assets/images/hero.webp';
const SectionHero = () => {
  const Router = useRouter();

  const handleLearnMoreClick = () => {
    if (Router.isReady) {
      Router.push(AppRoutes.BROWSE);
    }
  };

  return (
    <Section
      sectionClassName={concatClasses([
        'bg-gradient-135',
        'from-[#302F32_5.14%]',
        'to-[#242424_78.54%]',
      ])}
    >
      <div
        className={concatClasses([
          'grid',
          'gap-y-[72px]',
          'xl:grid-cols-2',
          'xl:grid-rows-[max-content_92px]',
          'sm:grid-rows-[max-content_92px_1fr]',
          'grid-rows-[max-content_auto]',
          'grid-cols-1',
          'relative',
        ])}
      >
        <div
          className={concatClasses([
            'max-w-[462px]',
            'h-fit',
            'justify-self-center',
            'xl:justify-self-start',
          ])}
        >
          <Typography
            as={'h1'}
            styleName={'h1'}
            className={'mb-5 !text-center xl:!text-left'}
            color={'white'}
          >
            Learn anything to improve your skills
          </Typography>
          <Typography
            as={'h2'}
            styleName={'body2Regular'}
            color={'grey'}
            className={'mb-14 !text-center xl:!text-left'}
          >
            LearningPlatform is an online learning site that provides tens of
            thousands of classes with experienced instructions.
          </Typography>
          <div
            className={concatClasses([
              'flex',
              'gap-9',
              'sm:justify-center',
              'sm:flex-row',
              'flex-col',
              'items-center',
            ])}
          >
            <ProductInfoListItem
              label={'Career-Oriented'}
              iconName={IconName.BAG}
            />
            <ProductInfoListItem
              label={'Creative Thinking'}
              iconName={IconName.BULB}
            />
          </div>
        </div>
        <div
          className={concatClasses([
            'flex',
            'items-center',
            'justify-center',
            'xl:justify-start',
            'flex-col',
            'gap-4',
            'h-fit',
            'sm:flex-row',
            'col-start-1',
            'row-start-2',
            'row-end-3',
          ])}
        >
          <Button
            size={'big'}
            intent={'primary'}
            className={'z-10'}
            ariaLabel={'get started button'}
            onClick={handleLearnMoreClick}
          >
            Get started
          </Button>
          <Button
            onClick={handleLearnMoreClick}
            intent={'textPrimary'}
            className={'z-10'}
            ariaLabel={'learn more about learning platform'}
          >
            Learn more
          </Button>
        </div>
        <CircleDecoration
          bumpPosition={'topLeft'}
          className="absolute left-[-203px] top-[20px] hidden sm:!block"
        />
        <CircleDecoration
          bumpPosition={'bottomRight'}
          isDark={true}
          className="absolute bottom-[-224px] right-[-154px] z-10 hidden sm:!block"
        />
        <div
          className={concatClasses([
            'xl:justify-self-end',
            'hidden',
            'md:block',
            'justify-self-center',
            'relative',
            'xl:row-start-1',
            'xl:row-end-3',
            'xl:col-start-2',
            'col-start-1',
            'row-start-3',
            'row-end-4',
            'w-[496px]',
            'h-[496px]',
          ])}
        >
          <div
            className={concatClasses([
              'z-0',
              'w-[496px]',
              'h-[496px]',
              'bg-transparent',
              'rounded-full',
              'absolute',
              'left-[-23px]',
              'top-[-21px]',
              'border',
              'border-blue',
              'border-solid',
            ])}
          />

          <div
            className={concatClasses([
              'z-0',
              'w-8',
              'h-8',
              'bg-blue/50',
              'absolute left-7',
              'bottom-[9px]',
              'rounded-full',
            ])}
          ></div>
          <HeroLabel
            label={'2k+'}
            variant="horizontal"
            className="absolute left-[-93px] top-[155px] z-20"
            description={'Video Courses'}
            iconName={IconName.COMPUTER}
          />
          <HeroLabel
            label={'250+'}
            variant="horizontal"
            className="absolute bottom-[40px] right-[-11px] z-20"
            description={'tutors'}
            iconName={IconName.USERS}
          />
          <HeroLabel
            label={'5k+'}
            description={'online courses'}
            progress={45}
            className="absolute right-[-17px] top-[-19px] z-20"
            variant={'vertical'}
          />
          <Avatar
            wrapperHtmlProps={{ className: 'z-10 absolute' }}
            src={HeroImg}
            alt={'young student woman with books'}
            background={'blue'}
          />
        </div>
      </div>
    </Section>
  );
};

export { SectionHero };
