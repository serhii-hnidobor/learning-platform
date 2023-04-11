import { CourseCardProps } from 'components/common/course-card/course-card';
import { CoursesList } from 'components/common/courses-list/courses-list';
import { Typography } from 'components/common/typography/typography';
import { DataStatus } from 'common/enum/api/api';
import Button from 'components/common/button/button';
import { Section } from 'components/common/section/section';
import { TopicDataType } from 'types/api/data';
import { TopicSection } from 'components/browse-page-components/browse-page-section/components/topic-section/topic-section';
import { concatClasses } from 'helpers/string/concat-classes/concat-classes';

interface BrowseTopicsSectionProps {
  name: string;
  isTopicsSection: true;
  selectedTopic: TopicDataType | null;
  isCourseSection?: false;
  content: TopicDataType[] | null;
  onTopicSelect?: (selectedTopic: TopicDataType | null) => void;
  dataStatus: DataStatus;
  headerButtonText?: undefined;
  onHeaderButtonClick?: undefined;
}

interface BrowseCoursesSectionProps {
  name: string;
  isTopicsSection?: false;
  selectedTopic?: undefined;
  isCourseSection: true;
  content: CourseCardProps[] | null;
  dataStatus: DataStatus;
  headerButtonText?: string;
  onHeaderButtonClick: VoidFunction;
  onTopicSelect?: undefined;
}

type BrowsePageSectionsProps =
  | BrowseCoursesSectionProps
  | BrowseTopicsSectionProps;

const BrowsePageSection = ({
  name,
  content,
  dataStatus,
  isCourseSection,
  isTopicsSection,
  onTopicSelect,
  headerButtonText = 'Explore all',
  onHeaderButtonClick,
  selectedTopic,
}: BrowsePageSectionsProps) => {
  let sectionContent;

  const isError = dataStatus === DataStatus.FAILED;
  const isLoading =
    dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

  if (isTopicsSection && isLoading) {
    sectionContent = <TopicSection loading={true} />;
  } else if (isTopicsSection && isError) {
    sectionContent = <TopicSection error={true} />;
  } else if (isTopicsSection) {
    sectionContent = (
      <TopicSection
        selectedTopic={selectedTopic}
        onTopicSelect={onTopicSelect}
        topicArray={content}
      />
    );
  } else {
    sectionContent = (
      <CoursesList videoInfoArray={content} dataStatus={dataStatus} />
    );
  }

  return (
    <Section>
      <header
        className={concatClasses([
          'flex',
          'flex-col',
          'items-center',
          'justify-between',
          'gap-4',
          'pb-8',
          'sm:flex-row',
          'sm:gap-0',
        ])}
      >
        <Typography
          styleName={'h4'}
          as={'h2'}
          color={'black'}
          className={'truncate'}
        >
          {name}
        </Typography>
        {isCourseSection && (
          <Button
            intent={'regularSolid'}
            size={'medium'}
            onClick={onHeaderButtonClick}
            ariaLabel={'explore all button'}
          >
            {headerButtonText}
          </Button>
        )}
      </header>
      {sectionContent}
    </Section>
  );
};

export { BrowsePageSection as default, type BrowsePageSectionsProps };
