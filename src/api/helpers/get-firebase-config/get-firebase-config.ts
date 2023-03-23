interface ApiConfigType {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

function getFirebaseConfig(): ApiConfigType {
  const apiKey = import.meta.env.VITE_API_KEY;
  const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_PROJECT_ID;
  const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
  const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
  const appId = import.meta.env.VITE_APP_ID;

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