import { Typography } from 'components/common/typography/typography';
import { concatClasses } from 'helpers/string/string';
import { useContext, useRouter } from 'hooks/hooks';
import { DataStatus, IconName } from 'common/enum/enum';
import { BrowsePageContext } from 'pages/browse/index';
import { TagScrollComponentWrapper } from 'components/common/tag-scroll';
import { TagDataType } from 'types/api/data';
import { ErrorProps, LoadingProps } from 'types/html-elemet-props';
import dynamic from 'next/dynamic';

const SearchBox = dynamic(import('components/common/search-box/search-box'));

interface BrowsePageHeaderBaseProps {
  tagData: TagDataType[];
  loading?: false;
  error?: false;
}

interface BrowsePageHeaderLoadingProps
  extends LoadingProps<BrowsePageHeaderBaseProps> {
  loading: true;
}

interface BrowsePageHeaderErrorProps
  extends ErrorProps<BrowsePageHeaderBaseProps> {
  error: true;
}

type BrowsePageProps =
  | BrowsePageHeaderBaseProps
  | BrowsePageHeaderLoadingProps
  | BrowsePageHeaderErrorProps;

export const BrowsePageHeader = ({
  tagData,
  error,
  loading,
}: BrowsePageProps) => {
  const context = useContext(BrowsePageContext);
  const Router = useRouter();

  if (!context) {
    throw new Error(
      'BrowsePageHeader has to be used within <BrowsePageContext.Provider>',
    );
  }

  const { handleCourseSearch, courseData, handleTagsSearch } = context;

  const courseSearchValues = courseData.map((course) => {
    return { name: course.name, id: course.id };
  });

  const handleAutocompleteSelect = (id: string) => {
    Router.push(`/course/${id}`);
  };

  return (
    <header
      className={concatClasses([
        'pb-28',
        'pt-[72px]',
        'lg:px-28',
        'sm:px-8',
        'px-4',
        'bg-gradient-135',
        'from-[#302F32_5.14%]',
        'to-[#242424_78.54%]',
      ])}
    >
      <div className={'mx-auto mb-14 max-w-[632px]'}>
        <Typography as={'h1'} styleName={'h3'} color={'white'} align={'center'}>
          Find a course to help you reach where you want to go
        </Typography>
      </div>
      <div className={'mx-auto mb-[48px] max-w-[800px]'}>
        <SearchBox
          items={courseSearchValues}
          inputProps={{
            placeholder: 'Search for anything',
            iconName: IconName.SEARCH,
          }}
          handleSearch={handleCourseSearch}
          handleAutocompleteSelect={handleAutocompleteSelect}
        />
      </div>
      <div className={'mx-auto max-w-[1044px]'}>
        <TagScrollComponentWrapper
          status={
            loading
              ? DataStatus.PENDING
              : error
              ? DataStatus.FAILED
              : DataStatus.SUCCESS
          }
          data={tagData || null}
          handleCourseSearch={handleTagsSearch}
        />
      </div>
    </header>
  );
};
