import { concatClasses } from 'helpers/string/string';
import {
  Typography,
  TypographyProps,
} from 'components/common/typography/typography';
import { FailedFetchMessage } from 'common/enum/enum';
import { ComponentBaseProps } from 'types/html-elemet-props';

interface NotFoundBannerProps extends ComponentBaseProps<'div'> {
  headerProps?: TypographyProps<HTMLHeadingElement>;
  status?: 'empty' | 'error';
  message?: string;
}

const FetchFailedBanner = ({
  status = 'error',
  message,
  headerProps,
  className,
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

export { FetchFailedBanner as default, type NotFoundBannerProps };
