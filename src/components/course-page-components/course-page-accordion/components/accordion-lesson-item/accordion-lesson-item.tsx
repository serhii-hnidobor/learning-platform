import Skeleton from 'react-loading-skeleton';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import { getDurationString } from 'helpers/time/time';
import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';
import { Icon, IconProps } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { useRef } from 'react';
import useKeyPress from 'hooks/use-key-press';

interface Props extends Omit<ComponentBaseProps<'div'>, 'onClick'> {
  id: string;
  number: number;
  duration: number;
  name: string;
  headerProps?: Omit<TypographyProps<HTMLHeadElement>, 'children'>;
  iconProps?: IconProps;
  is_text_lesson?: boolean;
  loading?: false;
  onClick: (id: string) => void;
}

interface LessonItemLoadingProps extends LoadingProps<Props> {
  loading: true;
}

type AccordionLessonItemPropsType = Props | LessonItemLoadingProps;
const AccordionLessonItem = ({
  is_text_lesson,
  duration,
  id,
  number,
  name,
  loading,
  onClick,
  iconProps,
  headerProps,
  ...restProps
}: AccordionLessonItemPropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  iconProps = iconProps || {
    name: is_text_lesson ? IconName.FILE_TEXT : IconName.PLAYER_PLAY,
    intent: 'roundedGrey',
    width: '24',
    height: '24',
    strokeWidth: '2',
  };

  headerProps = headerProps || {
    as: 'h4',
    styleName: 'body2Medium',
    className: 'line-clamp-1 mb-1 inline-block',
    title: name,
  };

  const handleClick = () => {
    if (!loading) {
      onClick(id);
    }
  };

  //enable click on enter
  useKeyPress({
    keyArray: ['Enter'],
    callback: () => {
      if (document.activeElement === ref.current) {
        handleClick();
      }
    },
  });

  return (
    <div
      tabIndex={0}
      className={
        'group flex w-max max-w-full cursor-pointer items-start justify-start gap-x-4'
      }
      ref={ref}
      onClick={handleClick}
      {...restProps}
    >
      {loading ? (
        <Skeleton
          containerClassName={'w-[20px] h-[20px] flex'}
          height={'100%'}
          circle={true}
        />
      ) : (
        <Icon {...iconProps} />
      )}
      <div className={'mb-[6px]'}>
        {loading ? (
          <div className={'flex w-[150px] flex-col justify-center'}>
            <Skeleton containerClassName={'w-full'} />
          </div>
        ) : (
          <Typography
            {...headerProps}
            className={'group-hover:text-blue cursor-pointer transition-colors'}
          >
            {number}. {name}
          </Typography>
        )}
        <div className={'flex items-center gap-[6px]'}>
          {loading ? (
            <Skeleton
              containerClassName={'w-[16px] h-[16px] flex'}
              height={'100%'}
              circle={true}
            />
          ) : (
            <Icon
              name={IconName.CLOCK}
              width={18}
              height={18}
              intent={'base'}
              stroke={'grey'}
            />
          )}
          {loading ? (
            <div className={'flex w-[65px] flex-col justify-center'}>
              <Skeleton containerClassName={'w-full'} />
            </div>
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

export { AccordionLessonItem };
