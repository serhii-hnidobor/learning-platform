import { IconName } from 'common/enum/enum';
import Skeleton from 'react-loading-skeleton';
import { concatClasses } from 'helpers/string/string';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../typography/typography';
import { Icon } from '../icon/icon';
import { Rating } from '../rating/rating';
import { useRouter } from 'next/router';

interface CourseCardProps extends ComponentBaseProps<'div'> {
  preview_img_src: string;
  name: string;
  id: string;
  popular?: boolean;
  titleColor?: 'black' | 'white';
  author_name: string;
  lesson_num: number;
  rating: number;
  loading?: false;
}

interface CourseCardLoadingProps extends LoadingProps<CourseCardProps> {
  loading: true;
}

type CourseCardPropsType = CourseCardLoadingProps | CourseCardProps;

const CourseCard = ({
  preview_img_src,
  lesson_num,
  author_name,
  title,
  titleColor = 'white',
  name,
  popular = false,
  loading,
  rating,
  id,
  ...restWrapperProps
}: CourseCardPropsType) => {
  const Router = useRouter();

  const handleRedirectToCourse = () => {
    if (loading) {
      return;
    }

    Router.push(`/course/${id}`);
  };

  return (
    <div {...restWrapperProps}>
      <div onClick={handleRedirectToCourse}>
        <div
          className={concatClasses([
            'aspect-video-preview',
            'group',
            'relative',
            'mb-4',
            loading ? '' : 'cursor-pointer',
            'select-none',
          ])}
        >
          {loading ? (
            <Skeleton className={'h-full w-full'} />
          ) : (
            <Image
              className={'z-0 w-full'}
              src={preview_img_src}
              fill={true}
              sizes={
                '(min-width: 1280px) 280px, (min-width: 1024px) 240px, (min-width: 768px) 275px, 280px'
              }
              alt={`${title} video preview image`}
            />
          )}

          {popular && (
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
              width={46}
              height={46}
              intent={'base'}
            />
          </div>
        </div>
      </div>
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
        <Rating rating={rating as number} loading={loading} />
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
                title={author_name}
                color={'grey'}
              >
                {author_name}
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
                {lesson_num} lessons
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { type CourseCardProps, CourseCard, type CourseCardPropsType };
