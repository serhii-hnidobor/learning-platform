import { Typography } from 'components/common/typography/typography';
import { LessonAttachmentItem } from 'components/lesson-page-components/lesson-attachment/components/lesson-attachment-item';
import { ComponentBaseProps, LoadingProps } from 'types/html-elemet-props';
import { useUnderlineAnimation } from 'hooks/hooks';
import { concatClasses } from 'helpers/string/string';
import { typographyVariants } from 'components/common/typography/cva-variants/cva-variants';
import { animated } from '@react-spring/web';
import Skeleton from 'react-loading-skeleton';

interface LessonAttachmentProps extends ComponentBaseProps<'div'> {
  loading?: false;
  fileName: string;
  fileUrl: string;
  fileSize: number;
}

interface LessonAttachmentLoadingProps
  extends LoadingProps<LessonAttachmentProps> {
  loading: true;
}

type LessonAttachmentPropsType =
  | LessonAttachmentLoadingProps
  | LessonAttachmentProps;

const LessonAttachment = ({
  loading,
  fileUrl,
  fileSize,
  fileName,
  className,
  ...restWrapperProps
}: LessonAttachmentPropsType) => {
  const { style, ref } = useUnderlineAnimation<HTMLDivElement>();

  let wrapperClassName = 'max-w-[300px]';

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  let lessonAttachmentItemRender: JSX.Element;

  if (loading) {
    lessonAttachmentItemRender = <LessonAttachmentItem loading={true} />;
  } else {
    lessonAttachmentItemRender = (
      <LessonAttachmentItem
        loading={loading}
        fileName={fileName}
        fileSize={fileSize}
        fileUrl={fileUrl}
        className={'mb-8'}
      />
    );
  }

  return (
    <div {...restWrapperProps} className={wrapperClassName}>
      {loading ? (
        <Skeleton
          containerClassName={'w-[201px] block mb-8'}
          className={'h-full w-full'}
        />
      ) : (
        <Typography
          as={'h4'}
          styleName={'h4'}
          color={'black'}
          className={'line-clamp-1 mb-8 block'}
        >
          {fileName}
        </Typography>
      )}
      {lessonAttachmentItemRender}
      {loading ? (
        <Skeleton
          containerClassName={'w-[82px] block'}
          className={'h-full w-full'}
        />
      ) : (
        <div
          ref={ref}
          className={concatClasses([
            'cursor-pointer',
            'w-fit',
            typographyVariants({ styleName: 'body3Bold', color: 'blue' }),
          ])}
        >
          Download all
          <animated.span className={'block h-[2px]'} style={style} />
        </div>
      )}
    </div>
  );
};

export { LessonAttachment, type LessonAttachmentPropsType };
