import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { FirestoreAdapter, initFirestore } from '@next-auth/firebase-adapter';
import { credential } from 'firebase-admin';

const firestore = initFirestore({
  credential: credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
      ? process.env.PRIVATE_KEY.replace(/\\n/gm, '\n')
      : undefined,
  }),
});

const getAuthOptions = () => {
  const { GOOGLE_SECRET, GOOGLE_ID, EMAIL_SERVER, EMAIL_FROM } = process.env;

  const isAllEnvSpecify =
    GOOGLE_ID && GOOGLE_SECRET && EMAIL_SERVER && EMAIL_FROM;

  if (!isAllEnvSpecify) {
    throw new Error('auth credential not specify');
  }

  return {
    adapter: FirestoreAdapter({
      firestore,
      namingStrategy: 'snake_case',
    }),
    providers: [
      GoogleProvider({
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    pages: {
      signIn: '/sign-in',
      error: '/sign-in',
    },
  };
};
export default NextAuth(getAuthOptions());

export const authOptions = getAuthOptions();
