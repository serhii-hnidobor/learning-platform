import { LessonPageHeading } from 'components/lesson-page-components/lesson-page-heading/lesson-page-heading';
import getMarkdownHtmlString from 'lib/get-markdown-html-string';
import { GetServerSidePropsContext } from 'next';
import { getCourseLessons, getCourseSection } from 'lib/course-page';
import { getLessonById } from 'lib/lesson';
import { LessonOfLessonPageI } from 'types/pages/lesson-page';
import { CoursePageLessonI, CourseSectionI } from 'types/pages/course-page';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import LessonPageContent from 'components/lesson-page-components/lesson-page-content/lesson-page-content';

interface LessonPageProps {
  courseLessons: CoursePageLessonI[];
  courseSectionData: CourseSectionI[];
  markdownJsxString: string;
  pageLesson: LessonOfLessonPageI;
}

const LessonPage = ({
  courseLessons,
  courseSectionData,
  markdownJsxString,
  pageLesson,
}: LessonPageProps) => {
  return (
    <>
      <LessonPageHeading
        {...pageLesson}
        lessonData={courseLessons}
        courseSectionData={courseSectionData}
        loading={false}
      />
      <LessonPageContent
        markdownJsx={
          <div dangerouslySetInnerHTML={{ __html: markdownJsxString }} />
        }
        fileAttachment={pageLesson.FileAttachment}
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
    return {
      notFound: true,
    };
  }

  const session = await getServerSession(context.req, context.res, authOptions);

  const supabaseAccessToken = session?.supabaseAccessToken || '';

  const { id: lessonId } = context.params;

  const pageLessonData = await getLessonById(lessonId, supabaseAccessToken);

  if (!pageLessonData || !pageLessonData.length) {
    return {
      notFound: true,
    };
  }

  const pageLesson = pageLessonData[0];

  const { course_id } = pageLesson;

  const sectionData = getCourseSection(course_id, supabaseAccessToken);
  const courseLessonData = getCourseLessons(course_id, supabaseAccessToken);

  const [courseLessons, section] = await Promise.all([
    courseLessonData,
    sectionData,
  ]);

  const isAllDataFound = courseLessons?.length && section?.length;

  const markdownJsxString = getMarkdownHtmlString(pageLesson.text_content);

  if (!isAllDataFound) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      courseLessons,
      courseSectionData: section,
      markdownJsxString,
      pageLesson,
      session,
    },
  };
}
