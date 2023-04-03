interface ApiConfigType {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

function getFirebaseConfig(): ApiConfigType {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_APP_ID;

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
