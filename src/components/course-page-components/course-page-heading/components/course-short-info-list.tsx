import Skeleton from 'react-loading-skeleton';
import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { Typography } from 'components/common/typography/typography';
import { concatClasses } from 'helpers/helpers';
import { getDurationString } from 'helpers/time/time';

interface CourseShortInfoListProps {
  duration: number;
  articleNum: number;
  downloadableResourceNum: number;
  loading?: false;
}

interface CourseShortInfoLoadingProps
  extends Partial<Omit<CourseShortInfoListProps, 'loading'>> {
  loading: true;
}

type CourseShortInfoPropsType =
  | CourseShortInfoListProps
  | CourseShortInfoLoadingProps;
const CourseShortInfoList = ({
  duration,
  articleNum,
  downloadableResourceNum,
  loading,
}: CourseShortInfoPropsType) => {
  return (
    <div
      className={concatClasses([
        'course-short-info',
        'grid',
        'auto-rows-min',
        'gap-y-6',
        'gap-x-22',
        'h-fit',
        'xl:justify-items-start',
        'justify-items-center',
        'md:grid-cols-2',
        'grid-cols-1',
      ])}
    >
      <div
        className={concatClasses([
          'flex',
          'xl:items-start',
          'items-center',
          'gap-4',
        ])}
      >
        <div className={'h-[19px] w-[19px]'}>
          {loading ? (
            <Skeleton
              containerClassName={'w-[19px] h-[19px] flex'}
              height={'100%'}
              circle={true}
            />
          ) : (
            <Icon
              name={IconName.PLAYER_PLAY}
              stroke={'grey'}
              intent={'base'}
              width={22}
              height={22}
            />
          )}
        </div>
        {loading ? (
          <div className={'flex w-[100px] flex-col justify-center'}>
            <Skeleton containerClassName={'w-full'} />
          </div>
        ) : (
          <Typography as={'span'} styleName={'body2Regular'} color={'white'}>
            {getDurationString(duration, true)} on-demand video
          </Typography>
        )}
      </div>
      <div
        className={concatClasses([
          'flex',
          'xl:items-start',
          'items-center',
          'gap-4',
        ])}
      >
        <div className={'h-[19px] w-[19px]'}>
          {loading ? (
            <Skeleton
              containerClassName={'w-[19px] h-[19px] flex'}
              height={'100%'}
              circle={true}
            />
          ) : (
            <Icon
              name={IconName.FILE_TEXT}
              stroke={'grey'}
              intent={'base'}
              width={22}
              height={22}
            />
          )}
        </div>
        {loading ? (
          <div className={'flex w-[100px] flex-col justify-center'}>
            <Skeleton containerClassName={'w-full'} />
          </div>
        ) : (
          <Typography as={'span'} styleName={'body2Regular'} color={'white'}>
            {articleNum} article
          </Typography>
        )}
      </div>
      <div
        className={concatClasses([
          'flex',
          'xl:items-start',
          'items-center',
          'gap-4',
        ])}
      >
        <div className={'h-[19px] w-[19px]'}>
          {loading ? (
            <Skeleton
              containerClassName={'w-[19px] h-[19px] flex'}
              height={'100%'}
              circle={true}
            />
          ) : (
            <Icon
              name={IconName.DOWNLOAD}
              stroke={'grey'}
              intent={'base'}
              width={22}
              height={22}
            />
          )}
        </div>
        {loading ? (
          <div className={'flex w-[100px] flex-col justify-center'}>
            <Skeleton containerClassName={'w-full'} className={'w-full'} />
          </div>
        ) : (
          <Typography as={'span'} styleName={'body2Regular'} color={'white'}>
            {downloadableResourceNum} downloadable resources
          </Typography>
        )}
      </div>
      <div
        className={concatClasses([
          'flex',
          'xl:items-start',
          'items-center',
          'gap-4',
        ])}
      >
        <div className={'h-[19px] w-[19px]'}>
          {loading ? (
            <Skeleton
              containerClassName={'w-[19px] h-[19px] flex'}
              height={'100%'}
              circle={true}
            />
          ) : (
            <Icon
              name={IconName.FILE_CERTIFICATE}
              stroke={'grey'}
              intent={'base'}
              width={22}
              height={22}
            />
          )}
        </div>
        {loading ? (
          <div className={'flex w-[100px] flex-col justify-center'}>
            <Skeleton containerClassName={'w-full'} />
          </div>
        ) : (
          <Typography as={'span'} styleName={'body2Regular'} color={'white'}>
            Certificate of completion
          </Typography>
        )}
      </div>
    </div>
  );
};

export { CourseShortInfoList, type CourseShortInfoPropsType };
