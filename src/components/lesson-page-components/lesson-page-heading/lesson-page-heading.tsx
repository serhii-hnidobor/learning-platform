import {
  Button,
  Drawer,
  Icon,
  Section,
  Typography,
} from 'components/common/common';
import { concatClasses, randomInt } from 'helpers/helpers';
import Skeleton from 'react-loading-skeleton';
import { LoadingProps } from 'types/html-elemet-props';
import { NextLessonType } from 'types/api/data';
import { IconName } from 'common/enum/enum';
import { useNavigate, useState } from 'hooks/hooks';
import YouTube from 'react-youtube';
import { getDurationString } from 'helpers/time/time';
import { LessonPageDrawerHeader } from './components/lesson-page-drawer-header/lesson-page-drawer-header';
import { LessonPageDrawerContent } from './components/lesson-page-drawer-conent/lesson-page-drawer-content';

interface LessonPageHeadingProps {
  sectionIndex: number;
  index: number;
  courseId: string;
  textContent: string;
  youtubeEmbedId: string | null;
  name: string;
  loading?: false;
  description: string;
  nextLesson: NextLessonType | null;
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
  sectionIndex,
  name,
  description,
  nextLesson,
  loading,
  youtubeEmbedId,
  courseId,
}: LessonPageHeaderProps) => {
  const navigate = useNavigate();

  const [isNeedDrawer, setIsNeedDrawer] = useState(false);

  let drawer: JSX.Element | null;

  if (!courseId || loading) {
    drawer = null;
  } else {
    drawer = (
      <Drawer
        isOpen={isNeedDrawer}
        setIsOpen={setIsNeedDrawer}
        isRight={true}
        header={
          <LessonPageDrawerHeader
            progress={randomInt(0, 100)}
            handleClose={() => setIsNeedDrawer((prev) => !prev)}
          />
        }
        children={<LessonPageDrawerContent courseId={courseId} />}
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
            styleName={'h3'}
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

        {youtubeEmbedId && (
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
        )}
        <div>
          {loading ? (
            <Skeleton
              containerClassName={'w-[135px] block mb-3'}
              className={'h-full w-full'}
            />
          ) : (
            <Typography
              as="h4"
              color={'grey'}
              styleName={'body2Medium'}
              className={'mb-3 block'}
            >
              Section {sectionIndex} · Lesson {index}
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
        {nextLesson && (
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
                  Next · Lesson {nextLesson.index}
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
                  {nextLesson.name}
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
                    {getDurationString(nextLesson.duration)}
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
                onClick={() => {
                  if (nextLesson) {
                    navigate(`/lesson/${nextLesson.id}`);
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
