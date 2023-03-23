import { Typography } from 'components/common/typography/typography';
import {
  concatClasses,
  convertCourseDataToCourseProps,
  tagSearch,
} from 'helpers/helpers';
import { CoursesList } from 'components/common/courses-list/courses-list';
import { useDataFetch, useState } from 'hooks/hooks';
import { CollectionName } from 'common/enum/enum';
import { TagScrollComponentWrapper } from 'components/common/tag-scroll';
import { CourseCardProps, Section } from 'components/common/common';

const ProductPreviewSection = () => {
  const { data: tagData, dataStatus: tagDataStatus } =
    useDataFetch<CollectionName.TAGS>({
      name: CollectionName.TAGS,
    });

  const { data: courseCardData, dataStatus: courseCardDataStatus } =
    useDataFetch<CollectionName.COURSES>({
      name: CollectionName.COURSES,
    });

  const [foundedCourseList, setFoundedCourseList] = useState<
    CourseCardProps[] | null
  >([]);

  const handleSearch = (tagArray: string[]) => {
    if (!courseCardData) {
      return;
    }
    const searchResult = tagSearch(courseCardData, tagArray);

    setFoundedCourseList(searchResult);
  };

  let courseDataToRender = null;

  if (foundedCourseList && foundedCourseList.length) {
    courseDataToRender = foundedCourseList;
  } else if (courseCardData) {
    courseDataToRender = convertCourseDataToCourseProps(courseCardData);
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
          as={'h3'}
          color="white"
          className={'max-w-[448px]'}
        >
          Train your team with real world skills and knowledge
        </Typography>
      </header>
      <div className={'mb-16'}>
        <TagScrollComponentWrapper
          data={tagData}
          isProductPreviewSection={true}
          handleCourseSearch={handleSearch}
          status={tagDataStatus}
        />
      </div>
      <CoursesList
        videoInfoArray={courseDataToRender}
        dataStatus={courseCardDataStatus}
        courseTitleColor={'white'}
      />
    </Section>
  );
};

export { ProductPreviewSection };
