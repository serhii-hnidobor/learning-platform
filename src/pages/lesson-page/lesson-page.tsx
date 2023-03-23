import { useDataFetch, useEffect, useParams, useState } from 'hooks/hooks';
import { CollectionName, DataStatus } from 'common/enum/api/api';
import { LessonPageHeading } from 'components/lesson-page-components/lesson-page-heading/lesson-page-heading';
import { LessonPageContent } from 'components/lesson-page-components/lesson-page-content/lesson-page-content';
import { convertLessonDataToProps } from 'helpers/helpers';
import { createContext } from 'react';
import { FetchFailedBanner } from 'components/common/fetch-failed-banner/fetch-failed-banner';
import { sessionStorageService } from 'services/services';
import { SessionStorageKeys } from 'common/enum/session-storage/session-storage-keys';

interface LessonPageContextType {
  isError: boolean;
  setIsError: (newValue: boolean) => void;
}

const LessonPageContext = createContext<LessonPageContextType | null>(null);

const LessonPage = () => {
  const { lessonId } = useParams();
  const [isError, setIsError] = useState(false);

  const { data, dataStatus } = useDataFetch<CollectionName.LESSONS>({
    name: CollectionName.LESSONS,
    whereOptions: {
      fieldName: 'id',
      comparator: '==',
      value: lessonId,
    },
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

  let pageHeader: JSX.Element;
  let pageMainContent: JSX.Element;

  if (dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE) {
    pageHeader = <LessonPageHeading loading={true} />;
    pageMainContent = <LessonPageContent loading={true} />;
  } else if (data && data[0] && dataStatus === DataStatus.SUCCESS) {
    const headingProps = convertLessonDataToProps(data[0]);
    const { textContent, attachment: fileAttachment } = data[0];

    pageMainContent = (
      <LessonPageContent
        textContent={textContent}
        fileAttachment={fileAttachment}
      />
    );
    pageHeader = <LessonPageHeading {...headingProps} />;
  } else if (data && !data.length) {
    return (
      <FetchFailedBanner
        status={'empty'}
        className={'py-4'}
        message={'oooops we cannot find this course'}
      />
    );
  } else {
    return <FetchFailedBanner className={'py-4'} status={'error'} />;
  }

  return (
    <LessonPageContext.Provider value={{ isError, setIsError }}>
      {pageHeader}
      {pageMainContent}
    </LessonPageContext.Provider>
  );
};

export { LessonPage, LessonPageContext, type LessonPageContextType };
