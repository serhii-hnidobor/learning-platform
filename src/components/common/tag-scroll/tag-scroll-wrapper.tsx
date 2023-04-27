import { DataStatus } from 'common/enum/api/api';
import { Tag, TagScroll } from './components/tag-scroll/tag-scroll';
import { TagsI } from 'types/pages/landing-page';

interface TagScrollComponentWrapperProps {
  status: DataStatus;
  data: TagsI[] | null;
  handleCourseSearch: (tagArray: string[]) => void;
  isProductPreviewSection?: boolean;
}

const TagScrollComponentWrapper = ({
  status,
  data,
  handleCourseSearch,
  isProductPreviewSection = false,
}: TagScrollComponentWrapperProps) => {
  const handleTagSelect = (tagArray: string[]) => {
    let searchTagArrayParam: string[] | undefined;

    if (tagArray.length) {
      searchTagArrayParam = tagArray;
    }

    handleCourseSearch(searchTagArrayParam || []);
  };

  switch (status) {
    case DataStatus.FAILED || !data: {
      return <TagScroll error={true} />;
    }
    case DataStatus.PENDING: {
      return <TagScroll loading={true} />;
    }

    case DataStatus.IDLE: {
      return <TagScroll loading={true} />;
    }

    case DataStatus.SUCCESS: {
      let tagArray: Tag[] = [];

      if (data) {
        tagArray = data.map((el) => {
          const { id, name } = el;
          return { id, name };
        });
      }

      return (
        <TagScroll
          tagsArray={tagArray}
          handleTagSelect={handleTagSelect}
          isProductPreviewSection={isProductPreviewSection}
        />
      );
    }

    default: {
      const check: never = status;
      throw new Error(check);
    }
  }
};
export { TagScrollComponentWrapper, type TagScrollComponentWrapperProps };
