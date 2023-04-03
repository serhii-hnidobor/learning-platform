import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { Tag } from 'components/common/tag-scroll/components/tag/tag';
import {
  LeftArrowButton,
  RightArrowButton,
} from 'components/common/tag-scroll/components/arrow-button/arrow-button';
import { useState } from 'hooks/hooks';
import { concatClasses } from 'helpers/string/string';
import { ErrorProps, LoadingProps } from 'types/html-elemet-props';

interface Tag {
  name: string;
  id: string;
}

interface TagScrollProps {
  tagsArray: Tag[];
  loading?: false;
  isProductPreviewSection?: boolean;
  error?: false;
  handleTagSelect: (tagArray: string[]) => void;
}

interface TagScrollLoadingProps extends LoadingProps<TagScrollProps> {
  loading: true;
}

interface TagScrollErrorProps extends ErrorProps<TagScrollProps> {
  error: true;
}

type TagScrollPropsType =
  | TagScrollErrorProps
  | TagScrollLoadingProps
  | TagScrollProps;

const TagScroll = ({
  tagsArray,
  loading,
  handleTagSelect,
  error,
  isProductPreviewSection = false,
}: TagScrollPropsType) => {
  const [activeTagIds, setActiveTagIds] = useState<string[]>([]);

  let content: JSX.Element[];

  if (loading) {
    content = new Array(10).fill(null).map((_, index) => {
      return <Tag loading={true} key={`${index}-tag-skeleton`} />;
    });
  } else if (error) {
    return null;
  } else {
    content = tagsArray.map((tag, index) => {
      const { name: tagName, id: tagId } = tag;

      return (
        <Tag
          state={activeTagIds.includes(tagId) ? 'active' : 'nonActive'}
          title={tagName}
          key={`${index}-${tag.id}`}
          onClick={() => {
            if (activeTagIds.includes(tagId)) {
              setActiveTagIds([]);
              handleTagSelect([]);
              return;
            }
            handleTagSelect([...activeTagIds, tagId]);
            setActiveTagIds((prev) => [...prev, tagId]);
          }}
        />
      );
    });
  }

  return (
    <ScrollMenu
      LeftArrow={
        <LeftArrowButton
          bloorEdge={true}
          isProductReviewSection={isProductPreviewSection}
        />
      }
      RightArrow={
        <RightArrowButton
          bloorEdge={true}
          isProductReviewSection={isProductPreviewSection}
        />
      }
      scrollContainerClassName={concatClasses([
        'flex',
        'gap-2',
        '!h-[80px]',
        'items-center',
        'px-2',
        'scrollbar-none',
      ])}
    >
      {content}
    </ScrollMenu>
  );
};

export { TagScroll, type TagScrollPropsType, type Tag };
