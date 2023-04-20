import { BrowsePageHeader } from 'components/browse-page-components/browse-page-header/browse-page-header';
import { useState, createContext } from 'react';
import { CollectionName, DataStatus } from 'common/enum/api/api';
import { CourseDataType, TagDataType, TopicDataType } from 'types/api/data';
import { convertCourseDataToCourseProps } from 'helpers/data/data';
import { CourseCardProps } from 'components/common/course-card/course-card';
import { courseTopicsSearch, tagSearch } from 'helpers/search/search';
import { getData } from 'lib/getData';
import dynamic from 'next/dynamic';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import createFirebaseCache from '../../lib/cache/create-firebase-cache';

const BrowsePageSection = dynamic(
  import(
    'components/browse-page-components/browse-page-section/browse-page-section'
  ),
);

interface BrowsePageContextType {
  handleCourseSearch: (searchString: string) => void;
  handleTagsSearch: (topics: string[]) => void;
  courseData: CourseDataType[];
}

const BrowsePageContext = createContext<BrowsePageContextType | null>(null);

interface BrowsePageProps {
  courseData: CourseDataType[];
  tagData: TagDataType[];
  topicsData: TopicDataType[];
}

const BrowsePage = ({ courseData, tagData, topicsData }: BrowsePageProps) => {
  const [topicCourseSearchResult, setTopicCourseSearchResult] = useState<
    CourseCardProps[] | null
  >();

  const [selectedTopic, setSelectedTopic] = useState<TopicDataType | null>(
    null,
  );

  const [isNeedFullCourseSection, setIsNeedFullCourseSection] = useState(false);

  const [searchCourseResult, setSearchCourseResult] = useState<
    CourseCardProps[] | null
  >(null);

  const [courseTagSearchResult, setCourseTagSearchResult] = useState<
    CourseCardProps[] | null
  >(null);

  const handleSearchCourseByTopic = (
    selectedTopicData: TopicDataType | null,
  ) => {
    if (!selectedTopicData || !courseData || !courseData.length) {
      setTopicCourseSearchResult(undefined);
      setSelectedTopic(null);
      return;
    }

    const searchResult = courseTopicsSearch({
      selectedTopicData: selectedTopicData,
      courseData: courseData,
    });

    setTopicCourseSearchResult(searchResult);
    setSelectedTopic(selectedTopicData);
  };

  const handleCourseSearch = async (searchString: string) => {
    const { default: courseNameSearch } = await import(
      'helpers/search/name-search/name-search'
    );

    const searchResult = await courseNameSearch({ searchString, courseData });

    setSearchCourseResult(searchResult);
  };

  const handleTagsSearch = (tagArray: string[]) => {
    const searchResult = tagSearch(courseData, tagArray);

    setCourseTagSearchResult(searchResult);
  };

  const courseDataStatus = DataStatus.SUCCESS;
  const topicsDataStatus = DataStatus.SUCCESS;

  let content: CourseCardProps[];

  if (!courseData) {
    content = [];
  } else {
    content = convertCourseDataToCourseProps(courseData);
  }

  return (
    <BrowsePageContext.Provider
      value={{
        handleCourseSearch,
        courseData: courseData || [],
        handleTagsSearch,
      }}
    >
      {isNeedFullCourseSection && (
        <BrowsePageSection
          name={'All courses'}
          isCourseSection={true}
          content={content}
          dataStatus={courseDataStatus}
          headerButtonText={'Expand recommendation'}
          onHeaderButtonClick={() => setIsNeedFullCourseSection(false)}
        />
      )}

      {!isNeedFullCourseSection && (
        <>
          <BrowsePageHeader tagData={tagData} />
          {courseTagSearchResult && (
            <BrowsePageSection
              onHeaderButtonClick={() => setIsNeedFullCourseSection(true)}
              isCourseSection={true}
              name={'tags search'}
              content={courseTagSearchResult}
              dataStatus={courseDataStatus}
            />
          )}
          {searchCourseResult && (
            <BrowsePageSection
              onHeaderButtonClick={() => setIsNeedFullCourseSection(true)}
              isCourseSection={true}
              name={'search result'}
              content={searchCourseResult}
              dataStatus={courseDataStatus}
            />
          )}
          <BrowsePageSection
            isCourseSection={true}
            onHeaderButtonClick={() => setIsNeedFullCourseSection(true)}
            name={'Recommended for you'}
            content={content}
            dataStatus={courseDataStatus}
          />
          <BrowsePageSection
            isCourseSection={true}
            onHeaderButtonClick={() => setIsNeedFullCourseSection(true)}
            name={'Students are viewing'}
            content={content}
            dataStatus={courseDataStatus}
          />
          <BrowsePageSection
            selectedTopic={selectedTopic}
            name={'Topics recommended for you'}
            content={topicsData}
            isTopicsSection={true}
            onTopicSelect={(topicData) => handleSearchCourseByTopic(topicData)}
            dataStatus={topicsDataStatus}
          />
          {topicCourseSearchResult && (
            <BrowsePageSection
              onHeaderButtonClick={() => setIsNeedFullCourseSection(true)}
              name={`${selectedTopic?.name || 'search tags result'}`}
              isCourseSection={true}
              content={topicCourseSearchResult}
              dataStatus={DataStatus.SUCCESS}
            />
          )}
        </>
      )}
    </BrowsePageContext.Provider>
  );
};

export { BrowsePage as default, BrowsePageContext, type BrowsePageContextType };

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: courseData, isFromCache: isCoursesFromCache } = await getData({
    name: CollectionName.COURSES,
  });
  const { data: tagData, isFromCache: isTagsFromCache } = await getData({
    name: CollectionName.TAGS,
  });
  const { data: topicsData, isFromCache: isTopicsFromCache } = await getData({
    name: CollectionName.TOPICS,
  });
  const session = await getSession(context);

  context.res.on('finish', () => {
    if (!isCoursesFromCache) {
      createFirebaseCache(CollectionName.COURSES);
    }
    if (!isTagsFromCache) {
      createFirebaseCache(CollectionName.TAGS);
    }
    if (!isTopicsFromCache) {
      createFirebaseCache(CollectionName.TOPICS);
    }
  });

  return {
    props: {
      session,
      courseData,
      tagData,
      topicsData,
    },
  };
}
