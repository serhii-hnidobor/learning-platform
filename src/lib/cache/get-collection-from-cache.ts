import { CollectionName } from 'common/enum/api/api';
import * as fs from 'fs';
import { CACHE_DIR_PATH } from './create-firebase-cache';
import { WhereOptionsType, DataObjectType } from 'types/api/data';
import isCollectionCached from './is-collection-cached';

/**
 * Selects and returns filtered data from an array of objects based on provided filter options.
 *
 * @typeparam T Type of objects in the data array.
 * @param data Array of objects to filter.
 * @param whereOption Filter options to apply.
 * @returns Array of objects that match the filter options.
 */
function selectData<T>(
  data: DataObjectType<T>[],
  whereOption?: WhereOptionsType,
) {
  if (!whereOption) {
    return data;
  }

  const { fieldName, value } = whereOption;

  return data.filter((item) => item[fieldName] === value);
}

/**
 * Retrieves data from cache for a given collection name.
 *
 * @typeparam T Type of objects in the data array.
 * @param name Collection name to retrieve data from.
 * @param whereOption Optional filter options to apply to the retrieved data.
 * @returns Promise that resolves to the retrieved data, or undefined if not found or an error occurred.
 */
export default async function getCollectionFromCache<T>(
  name: CollectionName,
  whereOption?: WhereOptionsType,
): Promise<DataObjectType<T>[] | undefined> {
  const isCached = isCollectionCached(name);

  if (!isCached) {
    return;
  }

  try {
    const dataJsonString = await fs.promises.readFile(
      `${CACHE_DIR_PATH}/${name}.json`,
      'utf8',
    );

    const data = JSON.parse(dataJsonString);

    if (whereOption) {
      return selectData<T>(data, whereOption);
    }
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
}
