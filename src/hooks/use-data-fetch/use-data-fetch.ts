import { useState } from 'hooks/hooks';
import { CollectionName, DataStatus } from 'common/enum/api/api';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { DataObjectType, getData, GetDataArg } from './helper/helper';

/**
 * Hook to fetch data from a Firestore collection.
 * @param arg An object of type `GetDataArg` that specifies the collection to fetch data from and any filters or limits to apply to the query.
 * @returns An object containing the fetched data and the current status of the fetch operation.
 */
export const useDataFetch = <T extends CollectionName>(arg: GetDataArg) => {
  /**
   * The current status of the fetch operation. Possible values are IDLE, PENDING, SUCCESS, and FAILED.
   */
  const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.IDLE);
  /**
   * The data fetched from the Firestore collection. This will be null until the fetch operation completes successfully.
   */
  const [data, setData] = useState<DataObjectType<T>[] | null>(null);

  useDeepCompareEffect(() => {
    setDataStatus(DataStatus.PENDING);
    getData<T>(arg)
      .then((data) => {
        setDataStatus(DataStatus.SUCCESS);
        setData(data);
      })
      .catch((e) => {
        console.error(e);
        setDataStatus(DataStatus.FAILED);
      });
  }, [arg]);

  return { data, dataStatus };
};
