import { Button, Rating, Section, Typography } from 'components/common/common';
import YouTube from 'react-youtube';
import { concatClasses } from 'helpers/helpers';
import Skeleton from 'react-loading-skeleton';
import { CourseShortInfoList } from './components/course-short-info-list';

interface CoursePageHeadingProps {
  authorName: string;
  rate: number;
  name: string;
  youtubeEmbedId: string;
  description: string;
  loading?: false;
  error?: false;
}

interface CoursePageHeadingPropsLoadingProps
  extends Partial<Omit<CoursePageHeadingProps, 'loading'>> {
  loading: true;
}

type CoursePageHeaderProps =
  | CoursePageHeadingProps
  | CoursePageHeadingPropsLoadingProps;

const CoursePageHeading = ({
  authorName,
  name,
  rate,
  youtubeEmbedId,
  description,
  loading,
}: CoursePageHeaderProps) => {
  let ratingComponent: JSX.Element;

  if (loading) {
    ratingComponent = <Rating loading={true} />;
  } else {
    ratingComponent = <Rating rating={rate} />;
  }

  return (
    <Section
      sectionClassName={concatClasses([
        'bg-gradient-135',
        'from-[#302F32_5.14%]',
        'to-[#242424_78.54%]',
      ])}
      contentWrapperClassName={concatClasses([
        'grid',
        'xl:grid-cols-[632px_1fr]',
        'grid-cols-1',
        'auto-rows-min',
        'justify-self-center',
        'gap-x-9',
        'xl:justify-self-start',
        '2xl:gap-x-[124px]',
        'xl:gap-x-[20px]',
        'gap-y-8',
      ])}
    >
      <div className={'border-b border-b-white/10 pb-8'}>
        <div
          className={concatClasses([
            'main-drawer-header-container',
            'xl:max-w-[632px]',
            'mb-6',
            'w-full',
          ])}
        >
          {loading ? (
            <Skeleton />
          ) : (
            <Typography
              as={'h1'}
              styleName={'h3'}
              color={'white'}
              className={'text-center xl:text-left '}
            >
              {name}
            </Typography>
          )}
        </div>
        <div
          className={concatClasses([
            'sub-drawer-header',
            'xl:max-w-[408px]',
            'w-full',
            'mb-[50px]',
          ])}
        >
          {loading ? (
            <Skeleton count={2} />
          ) : (
            <Typography
              as={'h2'}
              styleName={'body2Regular'}
              color={'white'}
              className={'text-center xl:text-left '}
            >
              {description}
            </Typography>
          )}
        </div>
        <div
          className={concatClasses([
            'flex',
            'gap-8',
            'xl:justify-start',
            'md:flex-row',
            'justify-center',
            'flex-col',
            'items-center',
          ])}
        >
          {loading ? (
            <Skeleton
              className={'h-[44px] w-[147px] rounded'}
              containerClassName={'block'}
            />
          ) : (
            <Button
              intent={'primary'}
              size={'medium'}
              ariaLabel={'enroll for free button'}
            >
              Enroll for free
            </Button>
          )}
          {ratingComponent}
          <div className={'flex items-center'}>
            {loading ? (
              <Skeleton
                containerClassName={'w-[200px]'}
                className={'h-[50%]'}
              />
            ) : (
              <Typography
                as={'span'}
                styleName={'body2Regular'}
                color={'white'}
              >
                {authorName}
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div
        className={concatClasses([
          'aspect-video',
          'xl:row-start-1',
          'max-w-[780px]',
          'w-full',
          'justify-self-center',
          'xl:row-end-3',
          'xl:col-start-2',
        ])}
      >
        {loading ? (
          <Skeleton
            containerClassName={'aspect-video w-full block'}
            className={'aspect-video w-full'}
          />
        ) : (
          <YouTube
            videoId={youtubeEmbedId}
            className={concatClasses([
              'relative',
              'w-full',
              'height-[0px]',
              'overflow-hidden',
              'mb-[50px]',
              'aspect-video',
            ])}
            iframeClassName={concatClasses([
              'w-full',
              'h-full',
              'absolute',
              'top-0',
              'left-0',
            ])}
          />
        )}
      </div>
      <CourseShortInfoList
        loading={loading}
        downloadableResourceNum={10}
        duration={500}
        articleNum={1}
      />
    </Section>
  );
};

export { CoursePageHeading, type CoursePageHeaderProps };
