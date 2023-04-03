import { concatClasses } from 'helpers/string/string';
import { DataStatus } from 'common/enum/api/api';
import { ComponentBaseProps } from 'types/html-elemet-props';
import { CourseCard, CourseCardProps } from '../course-card/course-card';
import dynamic from 'next/dynamic';

const FetchFailedBanner = dynamic(
  import('components/common/fetch-failed-banner/fetch-failed-banner'),
);

interface CoursesListProps extends ComponentBaseProps<'div'> {
  videoInfoArray: CourseCardProps[] | null;
  dataStatus: DataStatus;
  courseTitleColor?: 'black' | 'white';
}

const CoursesList = ({
  videoInfoArray,
  className,
  dataStatus,
  courseTitleColor = 'black',
  ...restWrapperProps
}: CoursesListProps) => {
  const error = dataStatus === DataStatus.FAILED;
  const empty =
    videoInfoArray &&
    dataStatus === DataStatus.SUCCESS &&
    !videoInfoArray.length;

  let wrapperClassName = concatClasses([
    'video-container',
    `${error || empty ? 'block' : 'grid'}`,
    'justify-center',
    '2xl:grid-cols-[repeat(5,minmax(210px,280px))]',
    'xl:grid-cols-[repeat(4,minmax(210px,280px))]',
    'lg:grid-cols-[repeat(3,minmax(210px,280px))]',
    'md:grid-cols-[repeat(3,minmax(210px,280px))]',
    'sm:grid-cols-[repeat(2,minmax(210px,280px))]',
    'grid-cols-[repeat(1,minmax(210px,280px))]',
    'gap-8',
  ]);

  if (className && className.length) {
    wrapperClassName = concatClasses([className, wrapperClassName]);
  }

  let content: JSX.Element | JSX.Element[];

  if (!empty && videoInfoArray && dataStatus === DataStatus.SUCCESS) {
    content = videoInfoArray.map((videoProps) => {
      return (
        <CourseCard
          {...videoProps}
          key={`video-${videoProps.id}`}
          titleColor={courseTitleColor}
        />
      );
    });
  } else if (empty) {
    content = <FetchFailedBanner status={'empty'} />;
  } else if (error) {
    content = <FetchFailedBanner status={'error'} />;
  } else {
    content = new Array(10).fill(null).map((_, index) => {
      return <CourseCard key={`video-${index}`} loading={true} />;
    });
  }

  return (
    <div className={wrapperClassName} {...restWrapperProps}>
      {content}
    </div>
  );
};

export { CoursesList, type CoursesListProps };
