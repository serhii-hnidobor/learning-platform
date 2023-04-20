import {
  ComponentBaseProps,
  ErrorProps,
  LoadingProps,
} from 'types/html-elemet-props';
import { concatClasses } from 'helpers/string/string';
import { LessonAttachment } from 'components/lesson-page-components/lesson-attachment/lesson-attachment';
import { FileAttachmentType } from 'types/api/data';
import { Section } from 'components/common/section/section';

interface LessonPageContentProps extends ComponentBaseProps<'div'> {
  loading?: false;
  error?: false;
  fileAttachment: FileAttachmentType | null;
  markdownJsx: JSX.Element;
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
  markdownJsx,
  fileAttachment,
}: LessonPagePropsType) => {
  let lessonAttachmentSection: JSX.Element | null;

  if (loading) {
    lessonAttachmentSection = (
      <LessonAttachment
        loading={true}
        className={'justify-self-center xl:justify-self-end'}
      />
    );
  } else if (error) {
    lessonAttachmentSection = null;
  } else {
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
      {markdownJsx}
      {lessonAttachmentSection}
    </Section>
  );
};

export { LessonPageContent as default, type LessonPagePropsType };
