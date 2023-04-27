import { CoursePageHeading } from 'components/course-page-components/course-page-heading/course-page-heading';
import { CoursePageAccordion } from 'components/course-page-components/course-page-accordion/course-page-accordion';
import { ListIcon } from 'components/common/list-icon/list-icon';
import { Typography } from 'components/common/typography/typography';
import { IconName } from 'common/enum/enum';
import getMarkdownHtmlString from 'lib/get-markdown-html-string';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';
import { GetServerSidePropsContext } from 'next';
import {
  CoursePageCourseDataI,
  CoursePageLessons,
  CourseSectionI,
} from 'types/pages/course-page';
import { getSectionLessons } from 'helpers/data/get-section-lessons/get-section-lessons';
import { getCourse, getCourseLessons, getCourseSection } from 'lib/course-page';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

interface CoursePageProps {
  courseData: CoursePageCourseDataI;
  courseSectionsData: CourseSectionI[];
  lessonData: CoursePageLessons;
  markdownJsxString: string;
}

const CoursePage = ({
  courseData,
  courseSectionsData,
  lessonData,
  markdownJsxString,
}: CoursePageProps) => {
  const { description, name, rating, author_name, youtube_embed_id } =
    courseData;

  const coursePageHeadingProps = {
    description,
    name,
    rating,
    author_name,
    youtube_embed_id,
  };

  return (
    <>
      <CoursePageHeading {...coursePageHeadingProps} loading={false} />
      <section
        className={concatClasses([
          'py-10',
          'lg:px-28',
          'sm:px-8',
          'px-4',
          'flex',
          'justify-center',
        ])}
      >
        <div
          className={concatClasses([
            '2xl:w-[1497px]',
            'w-full',
            'grid',
            'xl:grid-cols-[1fr_auto]',
            'grid-cols-1',
            'grid-rows-[min-content_min-content]',
            'gap-y-4',
            'justify-center',
          ])}
        >
          <div
            className={concatClasses([
              'row-start-1',
              'row-end-2',
              'flex',
              'flex-col',
              'gap-3',
              'pt-8',
              'xl:w-[80%]',
              'w-full',
              'justify-self-start',
            ])}
          >
            {courseSectionsData &&
              courseSectionsData.map((section, index) => {
                const { name, lessons_num, duration, id: sectionId } = section;

                const lessons = getSectionLessons(lessonData, section.id);

                return (
                  <div
                    className={concatClasses([
                      'flex',
                      'flex-col',
                      'justify-center',
                      'gap-3',
                    ])}
                    key={`course-page-accordion-${sectionId}`}
                  >
                    <CoursePageAccordion
                      name={name}
                      lessonData={lessons}
                      lesson_num={lessons_num}
                      duration={duration}
                    />
                    {index === courseSectionsData.length - 1 ? null : (
                      <hr className={'bg-grey/10 h-[2px] w-full border-0'} />
                    )}
                  </div>
                );
              })}
          </div>
          <div
            className={concatClasses([
              'p-8',
              'bg-grey-light',
              'rounded-xl',
              'flex',
              'flex-col',
              'justify-center',
              'gap-8',
              'my-6',
              'xl:col-start-2',
              'xl:col-end-3',
              'max-h-fit',
              'xl:max-w-[444px]',
              'w-full',
              'xl:row-start-1',
              'xl:row-end-3',
              'h-fit',
              'justify-self-end',
            ])}
          >
            <div>
              <Typography as={'h3'} styleName={'h4'} color={'black'}>
                What you’ll learn
              </Typography>
            </div>
            {courseData.what_learn && (
              <ListIcon
                loading={false}
                iconName={IconName.CHECK}
                className={'flex flex-col gap-6'}
                children={courseData.what_learn}
              />
            )}
          </div>
          <div
            className={concatClasses([
              'col-start-1',
              'col-end-2',
              'xl:col-start-1',
              'xl:col-end-3',
              'xl:text-center',
              'xl:w-[80%]',
              'xl:justify-self-center',
              'w-full',
              'justify-self-start',
            ])}
            dangerouslySetInnerHTML={{ __html: markdownJsxString }}
          />
        </div>
      </section>
    </>
  );
};

export default CoursePage;

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

  const session = await getServerSession(context.req, context.res, authOptions);

  const supabaseAccessToken = session?.supabaseAccessToken || '';

  const { id: courseId } = context.params;

  const sectionData = getCourseSection(courseId, supabaseAccessToken);
  const courseData = getCourse(courseId, supabaseAccessToken);
  const lessonData = getCourseLessons(courseId, supabaseAccessToken);

  const [course, lessons, section] = await Promise.all([
    courseData,
    lessonData,
    sectionData,
  ]);

  const isAllDataFound =
    course &&
    course.length &&
    lessons &&
    lessons.length &&
    section &&
    section.length;

  if (!isAllDataFound) {
    return {
      notFound: true,
    };
  }

  const markdownJsxString = getMarkdownHtmlString(
    course[0].detailed_description,
  );

  return {
    props: {
      courseData: course[0],
      courseSectionsData: section,
      lessonData: lessons,
      markdownJsxString: markdownJsxString,
      session,
    },
  };
}
