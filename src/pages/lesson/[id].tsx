import { CollectionName } from 'common/enum/api/api';
import { LessonPageHeading } from 'components/lesson-page-components/lesson-page-heading/lesson-page-heading';
import { convertLessonDataToProps } from 'helpers/data/convert-lesson-data-to-leson-data-props/convert-lesson-data-to-leson-data-props';
import { getData } from 'hooks/use-data-fetch/helper/getData/getData';
import { LessonPageContent } from 'components/lesson-page-components/lesson-page-content/lesson-page-content';

import getAllLessonId from 'lib/get-all-lesson-id';
import getMarkdownHtmlString from 'lib/get-markdown-html-string';
import { convertLessonDataToAccordionLessonItemProps } from 'helpers/data/data';

import { LessonDataArgType } from 'helpers/data/get-section-lessons/get-section-lessons';
import {
  CourseSectionType,
  NextLessonType,
  FileAttachmentType,
} from 'types/api/data';

interface HeadingPropsIType {
  index: number;
  sectionIndex: number;
  textContent: string;
  name: string;
  youtubeEmbedId: string | null;
  nextLesson: NextLessonType;
  description: string;
  courseId: string;
}

interface LessonPageProps {
  lessonData: LessonDataArgType[];
  courseSectionData: CourseSectionType[];
  markdownJsxString: string;
  pageLessonAttachment: FileAttachmentType;
  headingProps: HeadingPropsIType;
}

const LessonPage = ({
  lessonData,
  courseSectionData,
  markdownJsxString,
  headingProps,
  pageLessonAttachment,
}: LessonPageProps) => {
  return (
    <>
      <LessonPageHeading
        {...headingProps}
        lessonData={lessonData}
        courseSectionData={courseSectionData}
      />
      <LessonPageContent
        markdownJsx={
          <div dangerouslySetInnerHTML={{ __html: markdownJsxString }} />
        }
        fileAttachment={pageLessonAttachment}
      />
    </>
  );
};

export { LessonPage as default };

interface GetStaticPropsArg {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: GetStaticPropsArg) {
  const { id: lessonId } = params;

  const lessonData = await getData<CollectionName.LESSONS>({
    name: CollectionName.LESSONS,
    whereOptions: {
      fieldName: 'id',
      comparator: '==',
      value: lessonId,
    },
  });

  const trimmedLessonData = lessonData.map((lesson) => {
    const { sectionId } = lesson;
    return {
      ...convertLessonDataToAccordionLessonItemProps(lesson),
      sectionId,
    };
  });

  const headingProps = convertLessonDataToProps(lessonData[0]);

  const courseSectionData = await getData<CollectionName.COURSE_SECTIONS>({
    name: CollectionName.COURSE_SECTIONS,
    whereOptions: {
      fieldName: 'courseId',
      comparator: '==',
      value: lessonData[0].courseId,
    },
  });

  const markdownJsxString = getMarkdownHtmlString(lessonData[0].textContent);

  return {
    props: {
      lessonData: trimmedLessonData,
      pageLessonAttachment: lessonData[0].attachment,
      courseSectionData,
      markdownJsxString,
      headingProps,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await getAllLessonId();

  return {
    paths,
    fallback: false,
  };
}
