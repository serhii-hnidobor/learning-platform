import { CollectionName } from 'common/enum/api/api';
import { getData } from 'lib/getData';
import * as fs from 'fs';

export const CACHE_DIR_PATH = '/tmp';

/**
 * Creates cache files for Firebase collections.
 *
 * @param name Optional collection name. If provided, only cache file for this collection will be created.
 * @returns Promise<void>
 */
export default async function createFirebaseCache(name?: CollectionName) {
  if (!fs.existsSync(CACHE_DIR_PATH)) {
    fs.mkdirSync(CACHE_DIR_PATH);
  }
  const allCollectionName = name ? [name] : Object.values(CollectionName);

  for (const collectionName of allCollectionName) {
    const { data } = await getData({
      name: collectionName,
      isOnlyFromFetch: true,
    });
    await fs.writeFile(
      `${CACHE_DIR_PATH}/${collectionName}.json`,
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
  }
}
