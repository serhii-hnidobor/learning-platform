import { Typography } from 'components/common/typography/typography';
import { IconName } from 'common/enum/icons/icons';
import { concatClasses } from 'helpers/helpers';
import { useContext, useDataFetch, useNavigate } from 'hooks/hooks';
import { CollectionName } from 'common/enum/enum';
import { BrowsePageContext } from 'pages/browse-page/browse-page';
import { SearchBox } from 'components/common/search-box/search-box';
import { TagScrollComponentWrapper } from 'components/common/tag-scroll';

export const BrowsePageHeader = () => {
  const context = useContext(BrowsePageContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error(
      'BrowsePageHeader has to be used within <BrowsePageContext.Provider>',
    );
  }

  const { handleCourseSearch, courseData, handleTagsSearch } = context;

  const { data, dataStatus } = useDataFetch<CollectionName.TAGS>({
    name: CollectionName.TAGS,
  });

  const courseSearchValues = courseData.map((course) => {
    return { name: course.name, id: course.id };
  });

  const handleAutocompleteSelect = (id: string) => {
    navigate(`/course/${id}`);
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
          status={dataStatus}
          data={data}
          handleCourseSearch={handleTagsSearch}
        />
      </div>
    </header>
  );
};
