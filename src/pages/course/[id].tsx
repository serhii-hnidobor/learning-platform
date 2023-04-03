import { CollectionName } from 'common/enum/api/api';
import {
  CoursePageHeaderBaseProps,
  CoursePageHeading,
} from 'components/course-page-components/course-page-heading/course-page-heading';
import { CoursePageAccordion } from 'components/course-page-components/course-page-accordion/course-page-accordion';
import { ListIcon } from 'components/common/list-icon/list-icon';
import { Typography } from 'components/common/typography/typography';
import { IconName } from 'common/enum/enum';
import { getData } from 'hooks/use-data-fetch/helper/getData/getData';

import getAllCourseId from 'lib/get-all-course-id';
import getMarkdownHtmlString from 'lib/get-markdown-html-string';

import { CourseSectionType } from 'types/api/data';
import {
  convertLessonDataToAccordionLessonItemProps,
  courseDataToCoursePageHeadingProps,
  LessonDataArgType,
  getSectionLessons,
} from 'helpers/data/data';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';

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
            '2xl:grid-cols-[652px_440px]',
            'grid-cols-1',
            'gap-y-4',
            'justify-center',
            'gap-x-[124px]',
          ])}
        >
          <div className={'row-start-1 row-end-3 flex flex-col gap-3 pt-8'}>
            {courseSectionsData.map((section, index) => {
              const { name, lessonsNum, duration, id: sectionId } = section;

              const sectionLesson = getSectionLessons(lessonData, sectionId);

              return (
                <div
                  className={'flex flex-col justify-center gap-3'}
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
            className={'col-start-1 col-end-2'}
            dangerouslySetInnerHTML={{ __html: markdownJsxString }}
          />
        </div>
      </section>
    </>
  );
};

export default CoursePage;

interface GetStaticPropsArg {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: GetStaticPropsArg) {
  const { id: courseId } = params;
  const courseData = await getData<CollectionName.COURSES>({
    name: CollectionName.COURSES,
    whereOptions: {
      fieldName: 'id',
      comparator: '==',
      value: courseId,
    },
  });

  const trimmedCourseData = courseData.map((course) => {
    const { whatLearn } = course;

    return {
      ...courseDataToCoursePageHeadingProps(course),
      whatLearn,
    };
  });

  const courseSectionsData = await getData<CollectionName.COURSE_SECTIONS>({
    name: CollectionName.COURSE_SECTIONS,
    whereOptions: {
      fieldName: 'courseId',
      comparator: '==',
      value: courseId,
    },
  });

  const lessonData = await getData<CollectionName.LESSONS>({
    name: CollectionName.LESSONS,
    whereOptions: {
      fieldName: 'courseId',
      comparator: '==',
      value: courseId,
    },
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

  return {
    props: {
      courseData: trimmedCourseData,
      courseSectionsData,
      lessonData: trimmedLessonData,
      markdownJsxString: markdownJsxString,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await getAllCourseId();

  return {
    paths,
    fallback: false,
  };
}
