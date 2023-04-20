import { CollectionName } from 'common/enum/api/api';
import {
  CoursePageHeaderBaseProps,
  CoursePageHeading,
} from 'components/course-page-components/course-page-heading/course-page-heading';
import { CoursePageAccordion } from 'components/course-page-components/course-page-accordion/course-page-accordion';
import { ListIcon } from 'components/common/list-icon/list-icon';
import { Typography } from 'components/common/typography/typography';
import { IconName } from 'common/enum/enum';

import getMarkdownHtmlString from 'lib/get-markdown-html-string';

import { CourseSectionType } from 'types/api/data';
import {
  convertLessonDataToAccordionLessonItemProps,
  courseDataToCoursePageHeadingProps,
  LessonDataArgType,
  getSectionLessons,
} from 'helpers/data/data';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getData } from 'lib/getData';
import createFirebaseCache from '../../lib/cache/create-firebase-cache';

type CourseDataPropType = CoursePageHeaderBaseProps & { whatLearn: string[] };

interface CoursePageProps {
  courseData: CourseDataPropType[];
  courseSectionsData: CourseSectionType[];
  lessonData: LessonDataArgType[];
  markdownJsxString: string;
}

const CoursePage = ({
  courseData,
  courseSectionsData,
  lessonData,
  markdownJsxString,
}: CoursePageProps) => {
  const { description, name, rate, authorName, youtubeEmbedId } = courseData[0];

  const coursePageHeadingProps = {
    description,
    name,
    rate,
    authorName,
    youtubeEmbedId,
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
            {courseSectionsData.map((section, index) => {
              const { name, lessonsNum, duration, id: sectionId } = section;

              const sectionLesson = getSectionLessons(lessonData, sectionId);

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
                    lessonData={sectionLesson}
                    lessonNum={lessonsNum}
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
            <ListIcon
              loading={false}
              iconName={IconName.CHECK}
              className={'flex flex-col gap-6'}
              children={courseData[0].whatLearn}
            />
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

  const session = await getSession(context);
  const { id: courseId } = context.params;

  const { data: courseData, isFromCache: isCoursesFromCache } =
    await getData<CollectionName.COURSES>({
      name: CollectionName.COURSES,
      whereOptions: {
        fieldName: 'id',
        comparator: '==',
        value: courseId,
      },
    });

  const { data: courseSectionsData, isFromCache: isCourseSectionsFromCache } =
    await getData<CollectionName.COURSE_SECTIONS>({
      name: CollectionName.COURSE_SECTIONS,
      whereOptions: {
        fieldName: 'courseId',
        comparator: '==',
        value: courseId,
      },
    });

  const { data: lessonData, isFromCache: isLessonsFromCache } =
    await getData<CollectionName.LESSONS>({
      name: CollectionName.LESSONS,
      whereOptions: {
        fieldName: 'courseId',
        comparator: '==',
        value: courseId,
      },
    });

  const isAllDataFound =
    courseData &&
    courseData.length &&
    lessonData &&
    lessonData.length &&
    courseSectionsData &&
    courseSectionsData.length;

  if (!isAllDataFound) {
    return {
      notFound: true,
    };
  }

  const trimmedCourseData = courseData.map((course) => {
    const { whatLearn } = course;

    return {
      ...courseDataToCoursePageHeadingProps(course),
      whatLearn,
    };
  });

  const trimmedLessonData = lessonData.map((lesson) => {
    const { sectionId } = lesson;
    return {
      ...convertLessonDataToAccordionLessonItemProps(lesson),
      sectionId,
    };
  });

  const markdownJsxString = getMarkdownHtmlString(
    courseData[0].detailedDescription,
  );

  context.res.on('finish', () => {
    if (!isCoursesFromCache) {
      createFirebaseCache(CollectionName.COURSES);
    }
    if (!isLessonsFromCache) {
      createFirebaseCache(CollectionName.LESSONS);
    }
    if (!isCourseSectionsFromCache) {
      createFirebaseCache(CollectionName.COURSE_SECTIONS);
    }
  });

  return {
    props: {
      courseData: trimmedCourseData,
      courseSectionsData,
      lessonData: trimmedLessonData,
      markdownJsxString: markdownJsxString,
      session,
    },
  };
}
