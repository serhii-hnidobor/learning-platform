export enum CollectionName {
  COURSE_SECTIONS = 'courseSections',
  COURSES = 'courses',
  LESSONS = 'lessons',
  TAGS = 'tags',
  TOPICS = 'topics',
  USERS = 'users',
  REVIEWS = 'reviews',
}

export enum DataStatus {
  'FAILED' = 'FAILED',
  'IDLE' = 'IDLE',
  'PENDING' = 'PENDING',
  'SUCCESS' = 'SUCCESS',
}

export enum FireBaseErrorCode {
  EMAIL_ALREADY_USE = 'auth/email-already-in-use',
  CREDENTIAL_ALREADY_USE = 'auth/credential-already-in-use',
  ACCOUNT_EXIST_WITH_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
  WRONG_PASSWORD = 'auth/wrong-password',
  USER_NOT_FOUND = 'auth/user-not-found',
}
