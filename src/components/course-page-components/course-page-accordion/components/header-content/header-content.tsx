import { Icon } from 'components/common/icon/icon';
import { IconName } from 'common/enum/enum';
import Skeleton from 'react-loading-skeleton';
import { getDurationString } from 'helpers/time/time';
import { Typography } from 'components/common/typography/typography';

interface Props {
  name: string;
  lessonNum: number;
  duration: number;
  loading?: boolean;
}

interface LoadingProps extends Partial<Omit<Props, 'loading'>> {
  loading: true;
}

type PropsType = LoadingProps | Props;

const CourseAccordionHeaderContent = ({
  name,
  lessonNum,
  duration,
  loading,
}: PropsType) => {
  return (
    <div className={'min-w-[250px] pr-8'}>
      {loading ? (
        <Skeleton />
      ) : (
        <Typography
          as="h2"
          styleName={'h5'}
          color={'black'}
          className={'mb-3 line-clamp-1 inline-block'}
          title={name}
        >
          {name}
        </Typography>
      )}
      <div className={'flex items-center gap-4'}>
        <div className={'flex items-center gap-[6px]'}>
          {loading ? (
            <Skeleton
              containerClassName={'w-[14px] h-[14px] flex'}
              height={'100%'}
              circle={true}
            />
          ) : (
            <Icon
              name={IconName.PLAYER_PLAY}
              width={16}
              height={16}
              intent={'base'}
              stroke={'grey'}
            />
          )}
          {loading ? (
            <Skeleton containerClassName={'w-[57px] block'} />
          ) : (
            <Typography
              as={'span'}
              styleName={'body3Regular'}
              color={'grey'}
              className={'line-clamp-1'}
            >
              {lessonNum} lessons
            </Typography>
          )}
        </div>
        <div className={'flex items-center gap-[6px]'}>
          {loading ? (
            <Skeleton
              containerClassName={'w-[14px] h-[14px] flex'}
              height={'100%'}
              circle={true}
            />
          ) : (
            <Icon
              name={IconName.CLOCK}
              width={16}
              height={16}
              intent={'base'}
              stroke={'grey'}
            />
          )}
          {loading ? (
            <Skeleton containerClassName={'w-[60px] block'} />
          ) : (
            <Typography
              as={'span'}
              styleName={'body3Regular'}
              color={'grey'}
              className={'line-clamp-1'}
            >
              {getDurationString(duration, false)}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export { CourseAccordionHeaderContent, type PropsType };
