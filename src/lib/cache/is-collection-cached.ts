import { CollectionName } from 'common/enum/api/api';
import * as fs from 'fs';
import { CACHE_DIR_PATH } from './create-firebase-cache';

/**
 * Checks if a collection is cached based on its name.
 *
 * @param name Collection name to check for cache.
 * @returns True if the collection is cached and the cache file is not empty, false otherwise.
 */
export default function isCollectionCached(name: CollectionName) {
  const cacheFilePath = `${CACHE_DIR_PATH}/${name}.json`;
  try {
    if (!fs.existsSync(cacheFilePath)) {
      return false;
    }

    const stats = fs.statSync(cacheFilePath);

    return stats.size > 0;
  } catch (err) {
    console.error(err);
    return false;
  }
}
