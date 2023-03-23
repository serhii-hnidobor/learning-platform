import { BrowsePageHeader } from 'components/browse-page-components/browse-page-header/browse-page-header';
import { BrowsePageSection } from 'components/browse-page-components/browse-page-section/browse-page-section';
import { useDataFetch, useEffect, useState } from 'hooks/hooks';
import { CollectionName, DataStatus } from 'common/enum/api/api';
import { CourseDataType, TopicDataType } from 'types/api/data';
import { createContext } from 'react';
import { convertCourseDataToCourseProps } from 'helpers/data/data';
import { CourseCardProps } from 'components/common/course-card/course-card';
import {
  courseNameSearch,
  courseTopicsSearch,
  tagSearch,
} from 'helpers/helpers';
import { SessionStorageKeys } from 'common/enum/enum';
import { sessionStorageService } from 'services/services';

interface BrowsePageContextType {
  handleCourseSearch: (searchString: string) => void;
  handleTagsSearch: (topics: string[]) => void;
  courseData: CourseDataType[];
}

export const BrowsePageContext = createContext<BrowsePageContextType | null>(
  null,
);

export const BrowsePage = () => {
  const { data: courseData, dataStatus: courseDataStatus } =
    useDataFetch<CollectionName.COURSES>({
      name: CollectionName.COURSES,
    });

  const { data: topicsData, dataStatus: topicsDataStatus } =
    useDataFetch<CollectionName.TOPICS>({
      name: CollectionName.TOPICS,
    });

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

  const handleCourseSearch = (searchString: string) => {
    const searchResult = courseNameSearch({ searchString, courseData });

    setSearchCourseResult(searchResult);
  };

  const handleTagsSearch = (tagArray: string[]) => {
    const searchResult = tagSearch(courseData, tagArray);

    setCourseTagSearchResult(searchResult);
  };

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
          <BrowsePageHeader />
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
