import { Icon, IconProps } from 'components/common/icon/icon';
import { IconName } from 'common/enum/icons/icons';
import { concatClasses } from 'helpers/helpers';
import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';
import { FailedFetchMessage } from 'common/enum/enum';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface NotFoundBannerProps extends ComponentBaseProps<'div'> {
  headerProps?: TypographyProps<HTMLHeadingElement>;
  iconProps?: IconProps;
  status?: 'empty' | 'error';
  message?: string;
}

const FetchFailedBanner = ({
  status = 'error',
  message,
  headerProps,
  className,
  iconProps,
  ...restWrapperProp
}: NotFoundBannerProps) => {
  const isError = status === 'error';

  let wrapperClassName = concatClasses([
    'w-full',
    'h-full',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
  ]);

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  return (
    <div {...restWrapperProp} className={wrapperClassName}>
      <div className={'flex max-w-[500px] flex-col items-center'}>
        <Icon
          {...iconProps}
          name={status === 'error' ? IconName.ERROR : IconName.NOT_FOUND}
          intent={'base'}
          width={'100%'}
          boxProps={{ className: 'w-full h-full max-w-[700px]' }}
          height={'100%'}
        />
        <Typography
          styleName={'h3'}
          {...headerProps}
          color={'blue'}
          className={'text-center'}
        >
          {isError
            ? message || FailedFetchMessage.error
            : message || FailedFetchMessage.empty}
        </Typography>
      </div>
    </div>
  );
};

export { FetchFailedBanner, type NotFoundBannerProps };
