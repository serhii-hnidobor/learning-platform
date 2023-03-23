import { SessionStorageKeys } from 'common/enum/session-storage/session-storage-keys';

class SessionStorageService {
  save<T>(key: SessionStorageKeys, data: T) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  retrieve<T>(key: SessionStorageKeys): T | null {
    const data = sessionStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  remove(key: SessionStorageKeys): void {
    sessionStorage.removeItem(key);
  }
}

export { SessionStorageService };
