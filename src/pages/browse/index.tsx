import { BrowsePageHeader } from 'components/browse-page-components/browse-page-header/browse-page-header';
import { useState, createContext } from 'react';
import { DataStatus } from 'common/enum/api/api';
import { CourseCardProps } from 'components/common/course-card/course-card';
import { courseTopicsSearch, tagSearch } from 'helpers/search/search';
import { GetServerSidePropsContext } from 'next';
import { BrowsePageCourseI, TopicI } from 'types/pages/browse-page';
import { getTags } from 'lib/landing';
import { getCourses } from 'lib/browse-page/index';
import { getTopics } from 'lib/browse-page';
import { TagsI } from 'types/pages/landing-page';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import removeTopicAndTagFromBrowsePageCourse from 'helpers/data/remove-topic-and-tag-from-browse-page-course';
import BrowsePageSection from 'components/browse-page-components/browse-page-section/browse-page-section';

interface BrowsePageContextType {
  handleCourseSearch: (searchString: string) => void;
  handleTagsSearch: (topics: string[]) => void;
  courseData: BrowsePageCourseI[];
}

const BrowsePageContext = createContext<BrowsePageContextType | null>(null);

interface BrowsePageProps {
  courseData: BrowsePageCourseI[];
  tagData: TagsI[];
  topicsData: TopicI[];
}

const BrowsePage = ({ courseData, tagData, topicsData }: BrowsePageProps) => {
  const [topicCourseSearchResult, setTopicCourseSearchResult] = useState<
    CourseCardProps[] | null
  >();

  const [selectedTopic, setSelectedTopic] = useState<TopicI | null>(null);

  const [isNeedFullCourseSection, setIsNeedFullCourseSection] = useState(false);

  const [searchCourseResult, setSearchCourseResult] = useState<
    CourseCardProps[] | null
  >(null);

  const [courseTagSearchResult, setCourseTagSearchResult] = useState<
    CourseCardProps[] | null
  >(null);

  const handleSearchCourseByTopic = (selectedTopicData: TopicI | null) => {
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
    content = courseData.map((course) =>
      removeTopicAndTagFromBrowsePageCourse(course),
    );
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
  const session = await getServerSession(context.req, context.res, authOptions);
  const supabaseAccessToken = session?.supabaseAccessToken || '';

  const coursesData = getCourses(supabaseAccessToken);
  const tagsData = getTags(supabaseAccessToken);
  const topicsData = getTopics(supabaseAccessToken);

  const [courses, tags, topics] = await Promise.all([
    coursesData,
    tagsData,
    topicsData,
  ]);
  return {
    props: {
      session,
      courseData: courses,
      tagData: tags,
      topicsData: topics,
    },
  };
}
