import { concatClasses } from 'helpers/string/concat-classes/concat-classes';
import { Topic } from 'components/common/topic/topic';
import {
  ComponentBaseProps,
  ErrorProps,
  LoadingProps,
} from 'types/html-elemet-props';
import dynamic from 'next/dynamic';
import { TopicI } from 'types/pages/browse-page';

const FetchFailedBanner = dynamic(
  import('components/common/fetch-failed-banner/fetch-failed-banner'),
);

interface TopicSectionProps extends ComponentBaseProps<'div'> {
  topicArray: TopicI[] | null;
  onTopicSelect?: (selectedTopic: TopicI | null) => void;
  selectedTopic: TopicI | null;
  loading?: false;
  error?: false;
}

interface TopicSectionLoadingProps extends LoadingProps<TopicSectionProps> {
  loading: true;
}

interface TopicSectionErrorProps extends ErrorProps<TopicSectionProps> {
  error: true;
}

type TopicSectionPropsType =
  | TopicSectionLoadingProps
  | TopicSectionErrorProps
  | TopicSectionProps;

const TopicSection = ({
  topicArray,
  className,
  loading,
  error,
  onTopicSelect,
  selectedTopic,
  ...restWrapperProps
}: TopicSectionPropsType) => {
  let wrapperClassName = concatClasses([
    error ? 'block' : 'grid',
    '2xl:grid-cols-[repeat(5,minmax(210px,280px))]',
    'xl:grid-cols-[repeat(4,minmax(210px,280px))]',
    'lg:grid-cols-[repeat(3,minmax(210px,280px))]',
    'md:grid-cols-[repeat(3,minmax(210px,280px))]',
    'sm:grid-cols-[repeat(2,minmax(210px,280px))]',
    'grid-cols-[repeat(1,minmax(210px,280px))]',
    'gap-8',
    'justify-center',
  ]);

  if (className && className.length) {
    wrapperClassName = concatClasses([wrapperClassName, className]);
  }

  let sectionContent: JSX.Element | JSX.Element[];

  if (loading) {
    sectionContent = new Array(8).fill(null).map((_, index) => {
      return <Topic loading={true} key={`${index}-loading-topic`} />;
    });
  } else if (error || !topicArray) {
    return <FetchFailedBanner status={'error'} />;
  } else if (!topicArray.length) {
    return <FetchFailedBanner status={'empty'} />;
  } else {
    sectionContent = topicArray.map((topicData, index) => {
      const { id: currentTopicId } = topicData;

      const selectedTopicId = selectedTopic?.id;

      const isActive = selectedTopicId === currentTopicId;

      return (
        <Topic
          topicData={topicData}
          state={isActive ? 'active' : 'base'}
          onClick={() => {
            if (!onTopicSelect) {
              return;
            }

            const selectedTopicId = selectedTopic?.id;

            if (currentTopicId === selectedTopicId) {
              onTopicSelect(null);
              return;
            }
            onTopicSelect(topicData);
          }}
          key={`topic-${index}`}
        />
      );
    });
  }

  return (
    <div {...restWrapperProps} className={wrapperClassName}>
      {sectionContent}
    </div>
  );
};

export { TopicSection, type TopicSectionPropsType };
