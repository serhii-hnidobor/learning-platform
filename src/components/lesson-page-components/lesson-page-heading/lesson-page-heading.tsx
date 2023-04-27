import { concatClasses } from 'helpers/string/string';
import Skeleton from 'react-loading-skeleton';
import { LoadingProps } from 'types/html-elemet-props';
import { useState } from 'react';
import { getDurationString } from 'helpers/time/time';
import { LessonPageDrawerHeader } from './components/lesson-page-drawer-header/lesson-page-drawer-header';
import { LessonPageDrawerContent } from './components/lesson-page-drawer-conent/lesson-page-drawer-content';
import { Section } from 'components/common/section/section';
import { Typography } from 'components/common/typography/typography';
import Button from 'components/common/button/button';
import { IconName } from 'common/enum/enum';
import { Icon } from 'components/common/icon/icon';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { CoursePageLessonI, CourseSectionI } from 'types/pages/course-page';
import { NextLessonI } from 'types/pages/lesson-page';

const Drawer = dynamic(import('components/common/drawer/drawer'));

interface LessonPageHeadingProps {
  lessonData: CoursePageLessonI[];
  courseSectionData: CourseSectionI[];
  section_index: number;
  index: number;
  course_id: string;
  text_content: string;
  youtube_embed_id: string | null;
  name: string;
  loading?: false;
  next_lesson: NextLessonI | null;
  description: string;
}

interface LessonPageHeadingPropsLoadingProps
  extends LoadingProps<LessonPageHeadingProps> {
  loading: true;
}

type LessonPageHeaderProps =
  | LessonPageHeadingPropsLoadingProps
  | LessonPageHeadingProps;

const LessonPageHeading = ({
  index,
  section_index,
  name,
  description,
  loading,
  youtube_embed_id,
  course_id,
  lessonData,
  next_lesson,
  courseSectionData,
}: LessonPageHeaderProps) => {
  const Router = useRouter();

  const [isNeedDrawer, setIsNeedDrawer] = useState(false);

  let drawer: JSX.Element | null;

  if (!course_id || loading) {
    drawer = null;
  } else {
    drawer = (
      <Drawer
        isOpen={isNeedDrawer}
        setIsOpen={setIsNeedDrawer}
        isRight={true}
        header={
          <LessonPageDrawerHeader
            progress={50}
            handleClose={() => setIsNeedDrawer((prev) => !prev)}
          />
        }
        children={
          <LessonPageDrawerContent
            lessonData={lessonData}
            courseSectionData={courseSectionData}
          />
        }
      />
    );
  }

  return (
    <>
      {drawer}
      <Section
        sectionClassName={concatClasses([
          'bg-gradient-135',
          'from-[#302F32_5.14%]',
          'to-[#242424_78.54%]',
        ])}
        contentWrapperClassName={concatClasses([
          'grid',
          'xl:grid-cols-2',
          'grid-cols-1',
          'auto-rows-min',
          'justify-self-center',
          'gap-x-9',
          'xl:justify-self-start',
          'xl:gap-x-[124px]',
          'gap-y-12',
        ])}
      >
        {loading ? (
          <Skeleton
            containerClassName={concatClasses([
              'xl:max-w-[632px]',
              'mb-6',
              'w-full',
            ])}
          />
        ) : (
          <Typography
            as={'h1'}
            styleName={'h2'}
            color={'white'}
            className={'text-center xl:text-left'}
          >
            {name}
          </Typography>
        )}
        <div className={'justify-self-end'}>
          {loading ? (
            <Skeleton
              containerClassName={concatClasses([
                'h-[48px]',
                'w-[147px]',
                'rounded',
                'block',
              ])}
              className={'h-full w-full'}
            />
          ) : (
            <Button
              ariaLabel={'show lessons button'}
              intent={'secondary'}
              onClick={() =>
                setIsNeedDrawer((prev) => {
                  return !prev;
                })
              }
            >
              Show Lessons
            </Button>
          )}
        </div>

        {youtube_embed_id && (
          <div
            className={concatClasses([
              'aspect-video',
              'xl:col-start-1',
              'xl:col-end-3',
              'w-full',
              'justify-self-center',
            ])}
          >
            {loading ? (
              <Skeleton
                containerClassName={'aspect-video w-full block'}
                className={'aspect-video w-full'}
              />
            ) : (
              <LiteYouTubeEmbed
                title={name}
                id={youtube_embed_id}
                wrapperClass={concatClasses([
                  'relative',
                  'yt-lite',
                  'w-full',
                  'height-[0px]',
                  'overflow-hidden',
                  'mb-[50px]',
                  'aspect-video',
                  'bg-no-repeat',
                  'bg-cover',
                  'bg-center',
                ])}
                iframeClass={concatClasses([
                  'w-full',
                  'h-full',
                  'absolute',
                  'top-0',
                  'left-0',
                ])}
              />
            )}
          </div>
        )}
        <div>
          {loading ? (
            <Skeleton
              containerClassName={'w-[135px] block mb-3'}
              className={'h-full w-full'}
            />
          ) : (
            <Typography
              as={'h2'}
              color={'grey'}
              styleName={'body2Medium'}
              className={'mb-3 block'}
            >
              Section {section_index} · Lesson {index}
            </Typography>
          )}
          {loading ? (
            <Skeleton
              containerClassName={'w-[250px] max-w-[450px] block mb-3'}
              className={'h-full w-full'}
            />
          ) : (
            <Typography as={'h3'} className={'mb-6 block'} color={'white'}>
              {name}
            </Typography>
          )}
          {loading ? (
            <Skeleton count={3} />
          ) : (
            <Typography as={'span'} styleName={'body2Regular'} color={'grey'}>
              {description}
            </Typography>
          )}
        </div>
        {next_lesson && (
          <div
            className={concatClasses([
              'sm:w-[440px]',
              'w-full',
              'py-6',
              'pr-6',
              'pl-9',
              'rounded-xl',
              'border',
              'border-white',
              'border-opacity-15',
              'sm:gap-y-0',
              'gap-y-4',
              'flex',
              'sm:flex-row',
              'flex-col',
              'sm:items-start',
              'items-center',
              'sm:justify-between',
              'justify-center',
              'justify-self-end',
            ])}
          >
            <div className={'mt-3 w-full sm:max-w-[200px]'}>
              {loading ? (
                <Skeleton containerClassName={'block !w-[100px]'} />
              ) : (
                <Typography
                  as={'span'}
                  color={'grey'}
                  className={'mb-1 block text-center sm:text-left'}
                  styleName={'body3Regular'}
                >
                  Next · Lesson {next_lesson.index}
                </Typography>
              )}
              {loading ? (
                <Skeleton className={'mb-[18px] block w-[75%]'} />
              ) : (
                <Typography
                  as="h4"
                  color={'white'}
                  className={'mb-[18px] block text-center sm:text-left'}
                  styleName={'body2Regular'}
                >
                  {next_lesson.name}
                </Typography>
              )}
              <div
                className={
                  'flex items-center justify-center gap-2 sm:justify-start'
                }
              >
                {loading ? (
                  <Skeleton
                    containerClassName={'w-[18px] h-[18px] flex'}
                    height={'100%'}
                    circle={true}
                  />
                ) : (
                  <Icon
                    name={IconName.CLOCK}
                    width={18}
                    height={18}
                    stroke={'grey'}
                  />
                )}
                {loading ? (
                  <Skeleton containerClassName={'w-[40px]'} />
                ) : (
                  <Typography
                    as={'span'}
                    styleName={'body3Regular'}
                    color={'grey'}
                    className={'text-center sm:text-left'}
                  >
                    {getDurationString(next_lesson.duration)}
                  </Typography>
                )}
              </div>
            </div>

            {loading ? (
              <Skeleton
                containerClassName={'block w-[137px] h-[46px]'}
                className={'h-full w-full'}
              />
            ) : (
              <Button
                ariaLabel={'go to next lesson'}
                intent={'regularOutlined'}
                onClick={async () => {
                  if (Router.isReady && next_lesson) {
                    await Router.push(`/lesson/${next_lesson.id}`);
                  }
                }}
              >
                Next Lesson
              </Button>
            )}
          </div>
        )}
      </Section>
    </>
  );
};

export { LessonPageHeading, type LessonPageHeaderProps };
