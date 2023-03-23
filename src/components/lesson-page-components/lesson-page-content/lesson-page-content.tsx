import {
  ComponentBaseProps,
  ErrorProps,
  LoadingProps,
} from 'types/html-elemet-props';
import { FetchFailedBanner, Markdown, Section } from 'components/common/common';
import { concatClasses } from 'helpers/helpers';
import { LessonAttachment } from 'components/lesson-page-components/lesson-attachment/lesson-attachment';
import { FileAttachmentType } from 'types/api/data';

interface LessonPageContentProps extends ComponentBaseProps<'div'> {
  loading?: false;
  error?: false;
  textContent: string;
  fileAttachment: FileAttachmentType | null;
}

interface LessonPageContentLoadingProps
  extends LoadingProps<LessonPageContentProps> {
  loading: true;
}

interface LessonPageErrorProps extends ErrorProps<LessonPageContentProps> {
  error: true;
}

type LessonPagePropsType =
  | LessonPageErrorProps
  | LessonPageContentLoadingProps
  | LessonPageContentProps;

const LessonPageContent = ({
  error,
  loading,
  textContent,
  fileAttachment,
}: LessonPagePropsType) => {
  let markdownSection: JSX.Element;
  let lessonAttachmentSection: JSX.Element | null;

  if (loading) {
    markdownSection = <Markdown loading={true} />;
    lessonAttachmentSection = (
      <LessonAttachment
        loading={true}
        className={'justify-self-center xl:justify-self-end'}
      />
    );
  } else if (error) {
    markdownSection = <FetchFailedBanner status={'error'} />;
    lessonAttachmentSection = null;
  } else {
    markdownSection = <Markdown source={textContent} />;
    lessonAttachmentSection = fileAttachment ? (
      <LessonAttachment
        fileUrl={fileAttachment.fileUrl}
        fileName={fileAttachment.fileName}
        className={'justify-self-center xl:justify-self-end'}
        fileSize={fileAttachment.fileSize}
      />
    ) : null;
  }

  return (
    <Section
      contentWrapperClassName={concatClasses([
        'grid',
        'grid-cols-1',
        'xl:grid-cols-[1fr_min-content]',
        '2xl:gap-[160px]',
        'xl:gap-[50px]',
        'gap-[30px]',
      ])}
    >
      {markdownSection}
      {lessonAttachmentSection}
    </Section>
  );
};

export { LessonPageContent, type LessonPagePropsType };
