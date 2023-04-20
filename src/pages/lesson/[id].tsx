import { CollectionName } from 'common/enum/api/api';
import { LessonPageHeading } from 'components/lesson-page-components/lesson-page-heading/lesson-page-heading';
import { convertLessonDataToProps } from 'helpers/data/convert-lesson-data-to-leson-data-props/convert-lesson-data-to-leson-data-props';

import getMarkdownHtmlString from 'lib/get-markdown-html-string';
import { convertLessonDataToAccordionLessonItemProps } from 'helpers/data/data';

import { LessonDataArgType } from 'helpers/data/get-section-lessons/get-section-lessons';
import {
  CourseSectionType,
  NextLessonType,
  FileAttachmentType,
} from 'types/api/data';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getData } from 'lib/getData';
import createFirebaseCache from 'lib/cache/create-firebase-cache';
import dynamic from 'next/dynamic';

const LessonPageContent = dynamic(
  import(
    'components/lesson-page-components/lesson-page-content/lesson-page-content'
  ),
);

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (
    !context.params ||
    !context.params.id ||
    typeof context.params.id !== 'string'
  ) {
    throw {
      code: 500,
      message: 'params id not found',
    };
  }

  const session = await getSession(context);

  const { id: lessonId } = context.params;

  const { data: lessonData, isFromCache: isLessonsFromCache } =
    await getData<CollectionName.LESSONS>({
      name: CollectionName.LESSONS,
      whereOptions: {
        fieldName: 'id',
        comparator: '==',
        value: lessonId,
      },
    });

  const { data: courseSectionData, isFromCache: isCourseSectionsFromCache } =
    await getData<CollectionName.COURSE_SECTIONS>({
      name: CollectionName.COURSE_SECTIONS,
      whereOptions: {
        fieldName: 'courseId',
        comparator: '==',
        value: lessonData[0].courseId,
      },
    });

  const { data: courseLessonData, isFromCache: isCourseLessonDataFromCache } =
    await getData<CollectionName.LESSONS>({
      name: CollectionName.LESSONS,
      whereOptions: {
        fieldName: 'courseId',
        comparator: '==',
        value: courseSectionData[0].courseId,
      },
    });

  const isAllDataFound =
    courseLessonData &&
    courseLessonData.length &&
    lessonData &&
    lessonData.length &&
    courseSectionData &&
    courseSectionData.length;

  const markdownJsxString = getMarkdownHtmlString(lessonData[0].textContent);

  if (!isAllDataFound) {
    return {
      notFound: true,
    };
  }

  const headingProps = convertLessonDataToProps(lessonData[0]);

  const trimmedCourseLessonData = courseLessonData.map((lesson) => {
    const { sectionId } = lesson;
    return {
      ...convertLessonDataToAccordionLessonItemProps(lesson),
      sectionId,
    };
  });

  context.res.on('finish', () => {
    if (!isCourseLessonDataFromCache || !isLessonsFromCache) {
      createFirebaseCache(CollectionName.LESSONS);
    }
    if (!isCourseSectionsFromCache) {
      createFirebaseCache(CollectionName.COURSE_SECTIONS);
    }
  });

  return {
    props: {
      lessonData: trimmedCourseLessonData,
      pageLessonAttachment: lessonData[0].attachment,
      courseSectionData,
      markdownJsxString,
      headingProps,
      session,
    },
  };
}
