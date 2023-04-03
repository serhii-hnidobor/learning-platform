import { IconName } from 'common/enum/enum';
import Skeleton from 'react-loading-skeleton';
import { concatClasses } from 'helpers/string/string';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../typography/typography';
import { Icon } from '../icon/icon';
import { Rating } from '../rating/rating';

interface CourseCardProps extends ComponentBaseProps<'div'> {
  previewImgSrc: string;
  name: string;
  id: string;
  isPopular?: boolean;
  titleColor?: 'black' | 'white';
  authorName: string;
  lessonNum: number;
  rate: number;
  loading?: false;
}

interface CourseCardLoadingProps extends LoadingProps<CourseCardProps> {
  loading: true;
}

type CourseCardPropsType = CourseCardLoadingProps | CourseCardProps;

const CourseCard = ({
  previewImgSrc,
  lessonNum,
  authorName,
  title,
  titleColor = 'white',
  name,
  isPopular = false,
  loading,
  rate,
  id,
  ...restWrapperProps
}: CourseCardPropsType) => {
  return (
    <div {...restWrapperProps}>
      <Link href={`/course/${id}`}>
        <div
          className={concatClasses([
            'aspect-video-preview',
            'group',
            'relative',
            'mb-4',
            'cursor-pointer',
            'select-none',
          ])}
        >
          {loading ? (
            <Skeleton className={'h-full w-full'} />
          ) : (
            <Image
              className={'z-0 w-full'}
              src={previewImgSrc}
              fill={true}
              sizes={'(min-width: 1280px) 280px, (min-width: 1024px) 240px, (min-width: 768px) 275px, 280px'}
              alt={`${title} video preview image`}
            />
          )}

          {isPopular && (
            <div
              className={concatClasses([
                'bg-blue',
                'absolute',
                'left-4',
                'top-4',
                'rounded-full',
                'py-[6px]',
                'px-4',
                'z-20',
              ])}
            >
              <Typography
                as={'span'}
                styleName={'body3Regular'}
                color={'white'}
              >
                Popular
              </Typography>
            </div>
          )}
          <div
            className={concatClasses([
              'absolute',
              'left-0',
              'top-0',
              'justify-center',
              'items-center',
              'hidden',
              'h-full',
              'w-full',
              'z-10',
              loading ? '' : 'group-hover:flex',
              'backdrop-blur-md',
            ])}
          >
            <Icon
              name={IconName.PLAYER_PLAY}
              stroke={'yellow-light'}
              strokeWidth={'2'}
              width={36}
              height={36}
              intent={'base'}
            />
          </div>
        </div>
      </Link>
      <div>
        {loading ? (
          <Skeleton />
        ) : (
          <Link href={`/course/${id}`}>
            <Typography
              as={'span'}
              styleName={'body2Bold'}
              color={titleColor}
              truncate={'lineClamp2'}
              title={name}
            >
              {name}
            </Typography>
          </Link>
        )}
      </div>
      <div className={'my-[10px]'}>
        <Rating rating={rate as number} loading={loading} />
      </div>
      <div className={'flex items-center justify-between'}>
        <div
          className={concatClasses([
            'author-info-wrapper',
            'gap-2.5',
            'min-w-[35%]',
            `${loading ? 'block' : 'flex'}`,
            'align-center',
            'gap-2.5',
            'w-full',
            'max-w-[50%]',
          ])}
        >
          {loading ? (
            <Skeleton />
          ) : (
            <div
              className={'flex w-full items-center justify-start gap-[10px]'}
            >
              <Icon
                name={IconName.USER}
                width={20}
                height={20}
                intent={'base'}
                stroke={'grey'}
                strokeWidth={'2'}
              />
              <Typography
                as={'span'}
                styleName={'body3Regular'}
                className={'truncate'}
                title={authorName}
                color={'grey'}
              >
                {authorName}
              </Typography>
            </div>
          )}
        </div>
        <div
          className={concatClasses([
            'course-info-wrapper',
            `${loading ? 'block' : 'flex'}`,
            'align-center',
            'gap-2',
            'min-w-[35%]',
            'w-fit',
          ])}
        >
          {loading ? (
            <Skeleton />
          ) : (
            <div className={'flex w-full items-center justify-end gap-[10px]'}>
              <Icon
                name={IconName.PLAYER_PLAY}
                width={20}
                height={20}
                intent={'base'}
                stroke={'grey'}
                strokeWidth={'2'}
              />
              <Typography as={'span'} styleName={'body3Regular'} color={'grey'}>
                {lessonNum} lessons
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { type CourseCardProps, CourseCard, type CourseCardPropsType };
