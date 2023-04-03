import { Typography } from 'components/common/typography/typography';
import { tagSearch } from 'helpers/search/search';
import { concatClasses } from 'helpers/string/string';
import { CoursesList } from 'components/common/courses-list/courses-list';
import { useState } from 'hooks/hooks';
import { DataStatus } from 'common/enum/enum';
import { TagScrollComponentWrapper } from 'components/common/tag-scroll';
import { CourseCardProps } from 'components/common/course-card/course-card';
import { Section } from 'components/common/section/section';
import { TagDataType } from 'types/api/data';
import { ErrorProps, LoadingProps } from 'types/html-elemet-props';
import { CoursePropsDataType } from 'types/props/landing-page';

interface ProductPreviewSectionBaseProps {
  tagData: TagDataType[];
  courseCardProposes: CoursePropsDataType[];
  loading?: false;
  error?: false;
}

interface ProductPreviewSectionLoadingProps
  extends LoadingProps<ProductPreviewSectionBaseProps> {
  loading: true;
}

interface ProductPreviewSectionErrorProps
  extends ErrorProps<ProductPreviewSectionBaseProps> {
  error: true;
}

type ProductReviewSectionProps =
  | ProductPreviewSectionBaseProps
  | ProductPreviewSectionLoadingProps
  | ProductPreviewSectionErrorProps;

const ProductPreviewSection = ({
  tagData,
  courseCardProposes,
  loading,
  error,
}: ProductReviewSectionProps) => {
  const [foundedCourseList, setFoundedCourseList] = useState<
    CourseCardProps[] | null
  >([]);

  const handleSearch = (tagArray: string[]) => {
    if (!courseCardProposes) {
      return;
    }
    const searchResult = tagSearch(courseCardProposes, tagArray);

    setFoundedCourseList(searchResult);
  };

  const dataStatus = error
    ? DataStatus.FAILED
    : loading
    ? DataStatus.PENDING
    : DataStatus.SUCCESS;

  let courseDataToRender = null;

  if (foundedCourseList && foundedCourseList.length) {
    courseDataToRender = foundedCourseList;
  } else if (courseCardProposes) {
    courseDataToRender = courseCardProposes;
  }

  return (
    <Section
      sectionClassName={concatClasses([
        'bg-gradient-135',
        'from-[#302F32_5.14%]',
        'to-[#242424_78.54%]',
      ])}
    >
      <header className={'mb-16'}>
        <Typography
          styleName={'h3'}
          as={'h2'}
          color="white"
          className={'max-w-[448px]'}
        >
          Train your team with real world skills and knowledge
        </Typography>
      </header>
      <div className={'mb-16'}>
        <TagScrollComponentWrapper
          data={tagData || null}
          isProductPreviewSection={true}
          handleCourseSearch={handleSearch}
          status={dataStatus}
        />
      </div>
      <CoursesList
        videoInfoArray={courseDataToRender}
        dataStatus={dataStatus}
        courseTitleColor={'white'}
      />
    </Section>
  );
};

export { ProductPreviewSection };
