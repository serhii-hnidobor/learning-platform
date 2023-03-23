import { IconName } from 'common/enum/enum';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import useDownloader from 'react-use-downloader';
import Skeleton from 'react-loading-skeleton';
import prettyBytes from 'pretty-bytes';
import { useEffect } from 'hooks/hooks';
import { concatClasses } from 'helpers/helpers';
import {
  createToastNotification,
  Icon,
  Typography,
} from 'components/common/common';

interface LessonAttachmentItemProps extends ComponentBaseProps<'div'> {
  fileName: string;
  fileSize: number;
  fileUrl: string;
  loading?: false;
}

interface LessonAttachmentItemLoadingProps
  extends LoadingProps<LessonAttachmentItemProps> {
  loading: true;
}

type LessonAttachmentType =
  | LessonAttachmentItemLoadingProps
  | LessonAttachmentItemProps;

const LessonAttachmentItem = ({
  loading,
  fileName,
  fileSize,
  fileUrl,
  className,
  ...restWrapperProps
}: LessonAttachmentType) => {
  const { download, error } = useDownloader();

  let wrapperClassName = 'group flex cursor-pointer gap-4 items-start';

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  useEffect(() => {
    if (error?.errorMessage) {
      createToastNotification({
        message: 'you file is not downloaded check you internet connection',
        title: 'download error',
        type: 'error',
      });
    }
  }, [error?.errorMessage]);

  const handleDownload = async () => {
    if (loading) {
      return;
    }
    createToastNotification({
      message: 'you file is begin downloaded!',
      title: 'download',
      durationMs: 3500,
      type: 'success',
    });
    await download(fileUrl, fileName);
  };

  return (
    <div
      {...restWrapperProps}
      className={wrapperClassName}
      onClick={handleDownload}
    >
      {loading ? (
        <Skeleton
          containerClassName={'w-[23px] h-[23px] flex'}
          height={'100%'}
          circle={true}
        />
      ) : (
        <Icon
          intent={'roundedPrimary'}
          color={'dark'}
          width={20}
          height={20}
          name={IconName.FILE_TEXT}
        />
      )}
      <div>
        {loading ? (
          <Skeleton
            containerClassName={'block w-[118px]'}
            className={'h-full w-full'}
          />
        ) : (
          <Typography
            as={'span'}
            styleName={'body2Medium'}
            color={'black'}
            className={'line-clamp-1 block'}
          >
            {fileName}
          </Typography>
        )}
        {loading ? (
          <Skeleton
            containerClassName={'block w-[58px]'}
            className={'h-full w-full'}
          />
        ) : (
          <Typography
            as={'span'}
            styleName={'body2Regular'}
            color={'grey'}
            className={'line-clamp-1 block'}
          >
            {prettyBytes(fileSize)}
          </Typography>
        )}
      </div>
    </div>
  );
};

export { LessonAttachmentItem, type LessonAttachmentType };
