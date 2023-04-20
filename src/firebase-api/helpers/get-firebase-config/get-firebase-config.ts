interface ApiConfigType {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

function getFirebaseConfig(): ApiConfigType {
  const apiKey = process.env.API_KEY;
  const authDomain = process.env.AUTH_DOMAIN;
  const projectId = process.env.PROJECT_ID;
  const storageBucket = process.env.STORAGE_BUCKET;
  const messagingSenderId = process.env.MESSAGING_SENDER_ID;
  const appId = process.env.APP_ID;

  const isAllEnvSpecify =
    apiKey &&
    authDomain &&
    projectId &&
    storageBucket &&
    messagingSenderId &&
    appId;

  if (!isAllEnvSpecify) {
    throw new Error('not all env param specify');
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
}

export { getFirebaseConfig, type ApiConfigType };
