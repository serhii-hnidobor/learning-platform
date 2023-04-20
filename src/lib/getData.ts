import { DataObjectType, WhereOptionsType } from 'types/api/data';
import { CollectionName } from 'common/enum/api/api';
import { getDocs, query, where } from 'firebase/firestore/lite';
import getCollection from 'firebase-api';
import getCollectionFromCache from './cache/get-collection-from-cache';

export interface GetDataArg {
  name: CollectionName;
  whereOptions?: WhereOptionsType;
  isOnlyFromFetch?: boolean;
}

interface GetDataReturnType<T> {
  isFromCache: boolean;
  data: DataObjectType<T>[];
}

export const getData = async <T extends CollectionName>({
  name,
  whereOptions,
  isOnlyFromFetch = false,
}: GetDataArg): Promise<GetDataReturnType<T>> => {
  const dataFromCache = await getCollectionFromCache<T>(name, whereOptions);

  if (dataFromCache && !isOnlyFromFetch) {
    return {
      data: dataFromCache,
      isFromCache: true,
    };
  }
  const collection = await getCollection(name);

  let queryObj;
  if (whereOptions) {
    const { value, fieldName, comparator } = whereOptions;
    queryObj = query(collection, where(String(fieldName), comparator, value));
  }

  const querySnapshot = await getDocs(queryObj ? queryObj : collection);
  const data: DataObjectType<T>[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data() as unknown as DataObjectType<T>);
  });

  return { data, isFromCache: false };
};
