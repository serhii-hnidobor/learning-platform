import { useDataFetch, useEffect, useParams, useState } from 'hooks/hooks';
import { CollectionName, DataStatus } from 'common/enum/api/api';
import { CoursePageHeading } from 'components/course-page-components/course-page-heading/course-page-heading';
import {
  CoursePageAccordion,
  CoursePageAccordionLoading,
} from 'components/course-page-components/course-page-accordion/course-page-accordion';
import { IconName } from 'common/enum/icons/icons';
import {
  concatClasses,
  courseDataToCoursePageHeadingProps,
} from 'helpers/helpers';
import {
  FetchFailedBanner,
  ListIcon,
  Markdown,
  Typography,
} from 'components/common/common';
import { sessionStorageService } from 'services/services';
import { SessionStorageKeys } from 'common/enum/session-storage/session-storage-keys';

const CoursePage = () => {
  const { courseId } = useParams();

  const [isError, setIsError] = useState(false);

  /*
   * it use for prevent redirect loop from protected route (see sign in page)
   * when no authorized try return by change url in sign in page and go to this page
   * prev route on session storage don't delete so if user try again to go on
   * protected route he redirects to root but not to sign in
   * because protected route get prev route from session storage and think that user
   * redirect back from sign in page this effect fix it
   */

  useEffect(() => {
    sessionStorageService.remove(SessionStorageKeys.PREV_ROUTE);
  }, []);

  const { data: courseSectionsData, dataStatus: courseSectionsDataStatus } =
    useDataFetch<CollectionName.COURSE_SECTIONS>({
      name: CollectionName.COURSE_SECTIONS,
      whereOptions: {
        fieldName: 'courseId',
        comparator: '==',
        value: courseId,
      },
    });
  const { data: courseData, dataStatus: courseDataStatus } =
    useDataFetch<CollectionName.COURSES>({
      name: CollectionName.COURSES,
      whereOptions: {
        fieldName: 'id',
        comparator: '==',
        value: courseId,
      },
    });

  if (isError) {
    return <FetchFailedBanner status={'error'} />;
  }

  const isCourseSectionsLoading =
    courseSectionsDataStatus === DataStatus.PENDING;

  let heading: JSX.Element;
  let whatLearnList: JSX.Element;
  let markdown: JSX.Element;

  if (
    courseDataStatus === DataStatus.PENDING ||
    courseDataStatus === DataStatus.IDLE
  ) {
    whatLearnList = <ListIcon loading={true} />;
    markdown = <Markdown loading={true} />;
    heading = <CoursePageHeading loading={true} />;
  } else if (
    courseData &&
    courseData[0] &&
    courseDataStatus === DataStatus.SUCCESS
  ) {
    whatLearnList = (
      <ListIcon
        loading={false}
        iconName={IconName.CHECK}
        className={'flex flex-col gap-6'}
        children={courseData[0].whatLearn}
      />
    );
    markdown = (
      <Markdown source={courseData[0].detailedDescription} loading={false} />
    );
    heading = (
      <CoursePageHeading
        {...courseDataToCoursePageHeadingProps(courseData[0])}
      />
    );
  } else if (courseData && !courseData.length) {
    return (
      <FetchFailedBanner
        status={'empty'}
        message={'oooops we cannot find this course'}
      />
    );
  } else {
    return <FetchFailedBanner status={'error'} />;
  }

  return (
    <>
      {heading}
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
            {isCourseSectionsLoading || !courseSectionsData
              ? new Array(8).fill(null).map((_, index) => {
                  return (
                    <div
                      className={'flex h-[40px] flex-col justify-center gap-3'}
                      key={`course-page-accordion-${index}`}
                    >
                      <CoursePageAccordionLoading />
                    </div>
                  );
                })
              : courseSectionsData.map((section, index) => {
                  const { name, lessonsNum, id, duration } = section;
                  return (
                    <div
                      className={'flex flex-col justify-center gap-3'}
                      key={`course-page-accordion-${index}`}
                    >
                      <CoursePageAccordion
                        name={name}
                        lessonNum={lessonsNum}
                        courseSectionId={id}
                        duration={duration}
                        handleError={() => setIsError(true)}
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
            {whatLearnList}
          </div>
          <div className={'col-start-1 col-end-2'}>{markdown}</div>
        </div>
      </section>
    </>
  );
};

export { CoursePage };
